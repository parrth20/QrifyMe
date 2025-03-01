# QrifyMe

A full-stack web application that integrates two backends:
- **Django** for QR code generation logic  
- **Express + MongoDB** for user management (login/logout, JWTs), product info, and the dashboard

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

**QrifyMe** is a hybrid web application with two distinct backend systems:

1. **Django Backend**: Handles QR code creation and related logic.
2. **Express/Mongo Backend**: Manages user authentication (including JWT-based login/logout), product info, and user details, as well as the administrative dashboard.

The frontend, built with **React + Vite**, communicates with both backends to provide a seamless user experience.

## Features

- **QR Code Generation**: Generate QR codes for URLs or text using Django.
- **User Management**: Login, logout, and JWT authentication managed by Express and MongoDB.
- **Product & User Information**: CRUD operations for product data and user profiles.
- **Administrative Dashboard**: A comprehensive dashboard for managing data.
- **Responsive UI**: Optimized for mobile, tablet, and desktop.

## Tech Stack

- **Frontend**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **QR Code Backend**: [Django](https://www.djangoproject.com/)
- **User/Auth & Data Backend**: [Express](https://expressjs.com/) + [MongoDB](https://www.mongodb.com/)
- **Languages**: JavaScript (frontend & Express) & Python (Django)
- **Build Tools**: npm, Vite

## Architecture

- **Django Server**  
  - Manages QR code creation logic.  
  - Runs on a dedicated port (default: 8000) and exposes APIs for QR code generation.

- **Express/Mongo Server**  
  - Handles authentication, including login/logout and JWT-based security.  
  - Provides CRUD operations for products and user information.  
  - Connects to a MongoDB database for persistent data storage.  
  - Runs on a separate port (commonly 3000 or whichever you configure).

- **Frontend (React + Vite)**  
  - Interacts with both backends.  
  - Provides a unified interface for QR code generation, user management, and dashboard operations.

## Folder Structure

> **Note**: Adjust folder names and structure to match your actual project setup.


## Getting Started

### Prerequisites

- **Node.js** (v14+ recommended)
- **npm** or **yarn**
- **Python** (3.8+ recommended)
- **pip** (Python package manager)
- **MongoDB** (local or hosted)

### Installation

```bash
# 1. Clone the Repository
git clone https://github.com/your-username/QrifyMe.git
cd QrifyMe

# 2. Setup the Frontend
cd frontend
npm install

# 3. Setup the Django Backend
cd ../backend_django
python -m venv venv
source venv/bin/activate  # On macOS/Linux (or use venv\Scripts\activate on Windows)
pip install -r requirements.txt

# 4. Setup the Express/Mongo Backend
cd ../backend_express
npm install
Running the Django Backend
Apply Migrations
bash
Copy
Edit
python manage.py migrate
Start the Django Server
bash
Copy
Edit
python manage.py runserver
The Django server should now be running at http://127.0.0.1:8000/.

Running the Express/Mongo Backend
Ensure MongoDB is running
Make sure you have a local MongoDB instance running or update your connection string to point to a remote MongoDB.

Start the Express Server
bash
Copy
Edit
npm start
The Express server should now be running at http://127.0.0.1:3000/ (or whichever port you’ve configured).

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

Create .env files in both the Django and Express directories as needed.
For Django, configure settings like the secret key, allowed hosts, etc.
For Express, configure your MongoDB connection string, JWT secret, and other environment-specific variables.
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
Author: Your Name
Email: your.email@example.com
Project Link: QrifyMe on GitHub
vbnet
Copy
Edit
