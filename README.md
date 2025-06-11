# ClaudiaOrostica-frontend-2025

## Project Overview

This project implements a subscription flow built with React, designed as part of a technical challenge.  
The flow consists of four steps:  
1. Connect email  
2. Verify code  
3. Select plan  
4. Success confirmation  

The goal was to create a user-friendly, responsive, and lightweight app without using any CSS frameworks, while ensuring clean and modular code.

## Installation

To run the project locally:

```bash
npm install
npm run dev
API Mock Server (Local Backend)
This project includes a server.js file that simulates the backend API as specified in the assignment instructions.
It enables full interactivity between frontend and mock API during development.

Setup & Run
Install dependencies for the mock server (if not already installed):

bash
npm install express cors
Run the server:

bash
node server.js
The server runs by default on http://localhost:3001

Available Endpoints
Method	Endpoint	Description
GET	/api/send-email-validation-code?email=	Sends a fake validation code
POST	/api/validate-email	Validates the email and code
GET	/api/get-products	Returns mock subscription options
POST	/api/start-trial	Simulates successful trial activation

All responses are mocked. CORS is enabled to allow cross-origin requests from the frontend.

Project Structure
src/components: React components for each step of the flow

src/styles.css: Plain CSS for layout and responsiveness

App.jsx: Main logic and navigation handling

server.js: Simple Express server mocking the required backend API


Features Implemented
✅ Fully responsive design (portrait & landscape)

✅ Clean code and modular architecture

✅ Graceful error handling

✅ Lightweight and performant

❌ No CSS frameworks used (pure CSS only)

