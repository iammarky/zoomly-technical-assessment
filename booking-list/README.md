# Zoomly Technical Assessment

This repository contains my submission for the Zoomly Senior Full Stack
Developer Technical Assessment.

It includes:

-   Backend API (NestJS) → Task 1
-   Driver Matching Logic (TypeScript) → Task 2
-   Frontend Booking List (Next.js) → Task 3

------------------------------------------------------------------------

# 🚀 Tech Stack

## Backend

-   NestJS
-   TypeScript
-   class-validator

## Frontend

-   Next.js (App Router)
-   React
-   TypeScript

------------------------------------------------------------------------

# 📦 Project Structure

zoomly-technical-assessment/ booking-api/ \# Backend (NestJS)
booking-list/ \# Frontend (Next.js)

------------------------------------------------------------------------

# ⚙️ How to Run

## Backend

cd booking-api npm install npm run start:dev

Server: http://localhost:3000

## Frontend

cd booking-list npm install npm run dev

Open: http://localhost:3001/bookings

------------------------------------------------------------------------

# 🧩 Task 1 --- Booking API

-   POST /bookings endpoint
-   DTO validation (lat/lng, required fields)
-   Reject past scheduledTime
-   Generate bookingId
-   In-memory storage

------------------------------------------------------------------------

# 🚗 Task 2 --- Driver Matching

-   Filters unavailable drivers
-   Matches required tags
-   Calculates Euclidean distance
-   Returns closest driver or null
-   Deterministic tie-breaker

------------------------------------------------------------------------

# 🖥️ Task 3 --- Booking List UI

-   Fetch bookings
-   Loading state
-   Error state
-   Refresh button

------------------------------------------------------------------------

# ⚖️ Assumptions

-   No DB required
-   Simple distance calculation
-   No auth required

------------------------------------------------------------------------

# 🔁 Trade-offs

-   In-memory storage
-   Minimal UI
-   No caching

------------------------------------------------------------------------

# 📈 Production Improvements

-   Add database
-   Use geospatial queries
-   Add auth
-   Add tests

------------------------------------------------------------------------

# 👤 Author

Mark Francis Saldivar
