# Project 12: Eventbrite Data Scraping and Email Collection

This project demonstrates how to scrape event data from Eventbrite, store the data in a MongoDB database, and collect user emails with opt-in functionality.  It uses Puppeteer for web scraping, Mongoose for MongoDB interaction, and Express.js for the backend API. The frontend is built with React, allowing users to browse events and opt-in to email updates.

## Table of Contents

-   [Project Overview](#project-overview)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Installation](#installation)
-   [Usage](#usage)
-   [File Structure](#file-structure)
-   [Environment Variables](#environment-variables)
-   [Deployment](#deployment)
-   [Future Improvements](#future-improvements)
-   [Contributing](#contributing)
-   [License](#license)

## Project Overview

This project automates the process of collecting event details from Eventbrite.  It addresses the challenges of dynamic website content by using Puppeteer, a Node library that provides a high-level API to control headless Chrome or Chromium.  The scraped data, including event titles, images, URLs, dates, times, locations, and prices, is stored in a MongoDB database using Mongoose.

A React frontend allows users to browse the scraped events.  Critically, it includes an email opt-in feature.  Users can enter their email address and agree to receive updates before being redirected to the original Eventbrite event page.  These emails, along with their opt-in status, are also stored in the database.

## Features

-   **Web Scraping:** Scrapes event data from Eventbrite using Puppeteer.
-   **Data Storage:** Stores event data and user emails (with opt-in status) in MongoDB.
-   **Backend API:** Provides an Express.js API for saving emails.
-   **Frontend Interface:**  React-based interface for browsing events and email opt-in.
-   **Email Opt-in:**  Users must opt-in to email updates before being redirected.
-   **Scheduled Scraping:** (If implemented) Automates the scraping process at regular intervals.  *(Note:  The provided code snippets show the scheduling logic, but it might need to be fully integrated into the project)*.
-   **CORS Enabled:** Cross-Origin Resource Sharing is enabled to allow the frontend to communicate with the backend.

## Technologies Used

-   **Frontend:**
    -   React
    -   Axios
-   **Backend:**
    -   Node.js
    -   Express.js
    -   Mongoose
    -   Puppeteer
    -   `node-cron` (for scheduling, if implemented)
    -   `cors`
-   **Database:**
    -   MongoDB

## Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/Aditya030an/project-12.git](https://www.google.com/search?q=https://github.com/Aditya030an/project-12.git)
    cd project-12
    ```

2.  **Backend Installation:**

    ```bash
    cd backend
    npm install  # or yarn install
    ```

3.  **Frontend Installation:**

    ```bash
    cd frontend
    npm install # or yarn install
    ```

4.  **Create `.env` files:**

    *   **Backend (`backend/.env`):**

        ```
        MONGODB_URI=your_mongodb_connection_string
        PORT=5000
        ```

    *   **Frontend (`frontend/.env`):**

        ```
        REACT_APP_API_URL=http://localhost:5000/api/events  // Or your deployed API URL
        ```

## Usage

1.  **Start the backend:**

    ```bash
    cd backend
    node server.js
    ```

2.  **Start the frontend:**

    ```bash
    cd frontend
    npm start # or yarn start
    ```

3.  Open your browser and navigate to `http://localhost:5173` (or the port your React app is running on).

## File Structure
