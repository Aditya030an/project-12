const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const Event = require("./models/Event"); // Make sure this path is correct
const schedule = require("node-cron");

// MongoDB Connection (REPLACE WITH YOUR ACTUAL CONNECTION STRING)
mongoose
  .connect("mongodb+srv://adityaanu20023:Aditya123@cluster0.fu6v1.mongodb.net")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

async function scrapeEvents() {
  const browser = await puppeteer.launch({ headless: true }); // Set to false for debugging
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000); // Set a longer timeout for navigation

  try {
    const url = "https://www.eventbrite.com.au/d/australia--sydney/all-events/";
    await page.goto(url, { waitUntil: "networkidle2" });

    const events = await page.evaluate(() => {
      const eventCards = document.querySelectorAll(".event-card__vertical"); // Correct selector

      return Array.from(eventCards).map((card) => {
        const title = card.querySelector("h3")?.innerText.trim() || null;
        const img = card.querySelector("img")?.src || null;
        const url = card.querySelector("a")?.href || null;

        const details = {};

        const detailParagraphs = card.querySelectorAll(
          ".Typography_root__487rx"
        ); // Correct selector

        for (const p of detailParagraphs) {
          const text = p.innerText.trim();

          const dateTimeRegex =
            /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat)?,?\s*\d{1,2}\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(?:,\s*\d{4})?(?:,\s*\d{1,2}:\d{2}\s*(AM|PM)?)?$/i;
          if (dateTimeRegex.test(text)) {
            details.dateTime = text;
            break;
          }

          const locationKeywords = [
            "Hotel",
            "NSW",
            "Sydney",
            "St",
            "Rd",
            "Ave",
            "Park",
            "Street",
            "Road",
            "Avenue",
            "Hall",
            "Theatre",
            "Centre",
            "Studio",
            "Grounds",
            "Room",
            "Auditorium",
            "Venue",
          ];
          if (locationKeywords.some((keyword) => text.includes(keyword))) {
            details.location = text;
            break;
          }

          const organizerPrefixes = [
            "By",
            "Presented by",
            "Hosted by",
            "Organized by",
            "In partnership with",
            "With",
            "From",
            "At",
            "and",
          ];
          if (
            organizerPrefixes.some((prefix) => text.startsWith(prefix)) ||
            text.includes("followers") ||
            text.includes("interested")
          ) {
            details.organizer = text
              .replace(
                new RegExp(`^(${organizerPrefixes.join("|")})\\s*`, "i"),
                ""
              )
              .trim();
            break;
          }
        }

        let price = null;
        const priceWrapper = card.querySelector(
          ".DiscoverVerticalEventCard-module__priceWrapper___usWo6 p"
        ); // Correct selector

        if (priceWrapper) {
          price = priceWrapper.innerText.trim();
        } else {
          const priceElements = card.querySelectorAll(
            'span.Typography_root__487rx[aria-label*="Price"], span.visually-hidden, p.Typography_root__487rx[aria-label*="Price"], p.visually-hidden, .Typography_body-md-bold__487rx'
          );
          for (const el of priceElements) {
            if (
              el.innerText.includes("$") ||
              el.innerText.toLowerCase().includes("free")
            ) {
              price = el.innerText.trim();
              break;
            }
          }
        }

        return {
          title,
          img,
          url,
          ...details,
          price,
        };
      });
    });

    // console.log("Scraped Events:", JSON.stringify(events, null, 2));

    if (events && events.length > 0) {
      try {
        await Event.deleteMany({}); // Optional: Clear existing data before inserting
        const insertedEvents = await Event.insertMany(events);
        // console.log(
        //   "Inserted Events:",
        //   JSON.stringify(insertedEvents, null, 2)
        // );
        console.log("✅ Events updated in database!");
      } catch (dbError) {
        console.error("❌ Database insertion error:", dbError);
      }
    } else {
      console.error("❌ No events found or scraping failed.");
    }
  } catch (error) {
    console.error("❌ Scraping error:", error);
  } finally {
    await browser.close();
  }
}

// Schedule the scraping (e.g., every 24 hours)
schedule.schedule("0 0 * * *", () => {
  console.log("Starting event scraping...");
  scrapeEvents();
});

module.exports = scrapeEvents;
