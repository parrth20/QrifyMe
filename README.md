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

```plaintext
QrifyMe/
├── backend_django/         # Django project for QR code generation
│   ├── manage.py
│   ├── qrify/              # Main Django app
│   └── requirements.txt
├── backend_express/        # Express server for user management and data
│   ├── app.js
│   ├── package.json
│   └── routes/
├── frontend/               # React + Vite frontend
│   ├── index.html
│   ├── src/
│   └── package.json
└── README.md
 ```

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


Setup the Django Backend
   ```bash
cd ../backend_django
python -m venv venv
source venv/bin/activate  # On macOS/Linux (use venv\Scripts\activate on Windows)
pip install -r requirements.txt
```

## Setup the Express/Mongo Backend
   ```bash
cd ../backend_express
npm install
```

## Running the Services
   ```bash
      Django Backend
      Apply Migrations
```
## python manage.py migrate
Start the Server
   ```bash
python manage.py runserver
The Django server should now be running at http://127.0.0.1:8000/
```

## Express/Mongo Backend
Ensure MongoDB is Running
Make sure you have a local MongoDB instance running or update your connection string in the configuration.

## Start the Express Server
   ```bash
npm start
The Express server should now be running at http://127.0.0.1:3000/

```

## Frontend (React + Vite)
Start the Development Server

```bash
cd ../frontend
npm run dev
```

## Contact

**Author**: Parth Bandwal  
**Email**: [parthbandwal18@gmail.com](mailto:parthbandwal18@gmail.com)  
**Project Link**: [QrifyMe on GitHub](https://github.com/parrth20/QrifyMe)

