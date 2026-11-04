# Email code demo

A sign-up and subscription flow: enter your email, verify it with a code, pick a plan and start a trial. Built as a technical exercise.

Live: https://email-code-demo.vercel.app

## How it's built

- `frontend/`: React + Vite, one component per step
- `backend/`: a small Express mock of the API (send code, validate email, list plans, start trial). The verification code is always `123456` and expires after five minutes

## Running it locally

```bash
cd backend
npm install
npm start
```

```bash
cd frontend
npm install
echo "VITE_API=http://localhost:8080" > .env
npm run dev
```
