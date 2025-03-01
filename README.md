# QrifyMe

A full-stack web application that integrates two backends:

- **Django** for QR code generation logic.
- **Express + MongoDB** for user management (login/logout, JWTs), product info, and the dashboard.

The frontend is built with **React + Vite** for a fast and modern user experience.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Django Backend](#running-the-django-backend)
  - [Running the Express/Mongo Backend](#running-the-expressmongo-backend)
  - [Running the Frontend (React + Vite)](#running-the-frontend-react--vite)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

**QrifyMe** is a hybrid web application featuring two distinct backend systems:

1. **Django Backend**:  
   Handles QR code creation logic and exposes APIs for QR code generation on a dedicated port (default: 8000).

2. **Express/Mongo Backend**:  
   Manages user authentication (including JWT-based login/logout), product information, user details, and the administrative dashboard. It connects to a MongoDB database for persistent data storage and typically runs on port 3000 (or as configured).

The **React + Vite** frontend communicates with both backends to deliver a unified and seamless user experience.

---

## Features

- **QR Code Generation**: Generate QR codes for URLs or text using Django.
- **User Management**: Login, logout, and JWT authentication managed by Express and MongoDB.
- **Product & User Information**: CRUD operations for product data and user profiles.
- **Administrative Dashboard**: Comprehensive dashboard for data management.
- **Responsive UI**: Optimized for mobile, tablet, and desktop.

---

## Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **QR Code Backend**: [Django](https://www.djangoproject.com/)
- **User/Auth & Data Backend**: [Express](https://expressjs.com/) + [MongoDB](https://www.mongodb.com/)
- **Languages**: JavaScript (frontend & Express) & Python (Django)
- **Build Tools**: npm, Vite

---

## Architecture

- **Django Server**  
  - Manages QR code creation logic.
  - Exposes APIs for generating QR codes.

- **Express/Mongo Server**  
  - Handles user authentication (login/logout, JWT security).
  - Provides CRUD operations for products and user information.
  - Connects to a MongoDB database for persistent data storage.

- **Frontend (React + Vite)**  
  - Interacts with both backends.
  - Offers a unified interface for QR code generation, user management, and dashboard operations.

---

## Folder Structure

> **Note**: Adjust folder names and structure to match your actual project setup.

QrifyMe/ ├── backend_django/ # Django project for QR code generation │ ├── manage.py │ ├── qrify/ # Main Django app │ └── requirements.txt ├── backend_express/ # Express server for user management and data │ ├── app.js │ ├── package.json │ └── routes/ ├── frontend/ # React + Vite frontend │ ├── index.html │ ├── src/ │ └── package.json └── README.md

markdown
Copy
Edit

---

## Getting Started

### Prerequisites

- **Node.js** (v14+ recommended)
- **npm** or **yarn**
- **Python** (3.8+ recommended)
- **pip** (Python package manager)
- **MongoDB** (local or hosted)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/QrifyMe.git
   cd QrifyMe
Setup the Frontend

bash
Copy
Edit
cd frontend
npm install
Setup the Django Backend

bash
Copy
Edit
cd ../backend_django
python -m venv venv
source venv/bin/activate  # On macOS/Linux (use venv\Scripts\activate on Windows)
pip install -r requirements.txt
Setup the Express/Mongo Backend

bash
Copy
Edit
cd ../backend_express
npm install
Running the Django Backend
Apply Migrations

bash
Copy
Edit
python manage.py migrate
Start the Server

bash
Copy
Edit
python manage.py runserver
The Django server should now be running at http://127.0.0.1:8000/.

Running the Express/Mongo Backend
Ensure MongoDB is Running
Make sure you have a local MongoDB instance running or update your connection string in the configuration.

Start the Express Server

bash
Copy
Edit
npm start
The Express server should now be running at http://127.0.0.1:3000/ (or the configured port).

Running the Frontend (React + Vite)
Start the Development Server
bash
Copy
Edit
cd ../frontend
npm run dev
The frontend should now be accessible at http://127.0.0.1:5173/ (or the port specified by Vite).
Configuration
Environment Variables
Django: Create a .env file in the Django directory to configure settings such as the secret key, allowed hosts, etc.
Express: Create a .env file in the Express directory to set your MongoDB connection string, JWT secret, and other environment-specific variables.
CORS and API Endpoints
Ensure that CORS is properly configured on both backends so the frontend can communicate with them.
Update API endpoints in your frontend code to point to the correct URLs for the Django and Express servers.
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch:
bash
Copy
Edit
git checkout -b feature/your-feature-name
Commit your changes:
bash
Copy
Edit
git commit -m "Add feature description"
Push to your branch:
bash
Copy
Edit
git push origin feature/your-feature-name
Open a pull request on GitHub.
License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
Author: Parth Bandwal
Email: parthbandwal18@gmail.com
Project Link: QrifyMe on GitHub
rust
Copy
Edit

This single file can serve as the complete documentation for your project. Adjust paths, configurations, and other details as necessary for your specific setup.






