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

