# Online Travel Agency Platform

An **Online Travel Agency Platform** built using the **MERN stack** that allows users to explore travel destinations, view prices, read and write reviews, and upload new destinations. The booking feature is intentionally excluded for now and will be added in future versions.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [User Roles](#user-roles)
- [Application Workflow](#application-workflow)
- [Future Enhancements](#future-enhancements)
- [Installation and Setup](#installation-and-setup)
- [Folder Structure (High Level)](#folder-structure-high-level)
- [Conclusion](#conclusion)

---

## Project Overview

The Online Travel Agency Platform is a web-based application that allows users to:

- Browse available travel destinations and hotels
- View prices and location details
- Add reviews for destinations
- Upload their own destinations for others to explore

This platform focuses on **exploration and information sharing** rather than booking, making it suitable for future expansion into a full-fledged travel booking system.

---

## Tech Stack

### Frontend
- Embedded JavaScript (EJS)
- HTML5
- CSS3
- Mapbox (for interactive maps)

### Backend
- Node.js
- Express.js (backend framework)

### Database
- MongoDB (NoSQL database)
---

## Features

### 1. User Authentication
- User Sign Up
- User Login
- Secure authentication using sessions or JWT

### 2. View Available Destinations
- Users can view all listed travel destinations
- Each destination displays:
  - Name
  - Price
  - Description
  - Location

### 3. Booking Restriction
- Users **cannot book destinations**
- This feature is planned for future versions

### 4. Reviews System
- Logged-in users can write reviews for destinations
- Reviews help other users understand the quality and experience of a place

### 5. Upload New Destinations
- Users can upload their own hotel or travel destination
- Uploaded destinations become visible to all users on the platform

### 6. Location Visualization
- Mapbox is used to display the exact location of destinations
- Users can visually see where the destination is situated on a map

---

## User Roles

### Normal User
- Sign up and log in
- View destinations and prices
- Write reviews
- Upload destinations
- View destination locations on the map

---

## Application Workflow

1. User registers or logs into the platform
2. User explores available destinations
3. User views destination details including price and location
4. User writes reviews for destinations
5. User uploads new destinations
6. Mapbox displays the destination location on an interactive map

---

## Future Enhancements

- Destination booking functionality
- Payment gateway integration
- Admin dashboard for managing listings
- Image upload support for destinations
- Advanced search and filtering
- Rating system
- User profile management

---

## Installation and Setup

### Prerequisites
- Node.js
- MongoDB
- Mapbox API Key

### Steps
1. Clone the repository
   ```bash
   git clone https://github.com/Aditya7777777/OnlineTravelAgencyPlatform.git


project-root/
│
├── models/        # MongoDB schemas - Listing, review , user 
├── routes/        # Express routes - Listing, review ,user 
├── controllers/   # Business logic - Listing ,review,user
├── views/         # EJS templates - includes,layouts,listing,users,error.ejs
├── public/        # CSS, JS, images
├── app.js         # Main application file
└── README.md
