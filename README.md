# Email Verification Demo

A lightweight React app that simulates an email verification and subscription flow.

## 🔧 Features

- Email connection & code verification
- Plan selection
- Success confirmation
- Fully responsive (no CSS frameworks)
- Mock backend with Node.js

---

## 🖥️ Running the Project Locally

### 1. Frontend

```bash
npm install
npm run dev

2. Mock Backend (API)
npm install express cors
node server.js

🔌 Available API Endpoints
Method	Endpoint	Description
GET	/api/send-email-validation-code?email=	Sends a fake validation code
POST	/api/validate-email	Validates email and code
GET	/api/get-products	Returns subscription options
POST	/api/start-trial	Simulates trial activation

All responses are mocked. CORS is enabled.



🗂️ Project Structure

src/
  └── components/     # React steps
  └── styles.css      # Pure CSS
  └── App.jsx         # App logic
server.js             # Mock backend
