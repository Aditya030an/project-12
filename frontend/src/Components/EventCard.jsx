import axios from "axios";
import React, { useState } from "react";

const EventCard = ({ event }) => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [optIn, setOptIn] = useState(false);

  const handleGetTickets = async () => {
    if (email) {
      if (optIn) {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/api/events/saveEmail`, // Your backend API URL
            { email }
          );

          // console.log("Response of email:", response.data);

          if (response.status >= 200 && response.status < 300) {
            window.open(event.url, "_blank");
          } else {
            const errorMessage = response.data.message || "Failed to save email";
            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error("Error saving email:", error);
          alert(error.message);
        }
      } else {
        alert("Please check the box to receive email updates.");
      }
    } else {
      setShowPopup(true);
    }
    setEmail("");
    setOptIn(false);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <img src={event?.img} alt={event?.title || "Event Image"} />
      <h3 className="text-xl font-bold">{event?.title}</h3>
      <p className="text-gray-600">{event?.dateTime}</p>
      <p className="text-gray-600">{event?.price}</p>
      <p className="text-gray-600">{event.location}</p>
      <input
        type="email"
        placeholder="Enter Email"
        className="mt-2 p-2 border rounded w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="mt-2 flex items-center">
        <input
          type="checkbox"
          id="optIn"
          className="mr-2"
          checked={optIn}
          onChange={(e) => setOptIn(e.target.checked)}
        />
        <label htmlFor="optIn" className="text-gray-600">
          I want to receive email updates about future events.
        </label>
      </div>

      <button
        onClick={handleGetTickets}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        GET TICKETS
      </button>
      {showPopup && <p className="text-red-500">Please enter email</p>}
    </div>
  );
};

export default EventCard;