# Smart DSA Practice Platform

A modern, full-stack DSA (Data Structures & Algorithms) practice platform built with Next.js, Express.js, and Firebase. Features AI-powered hints, progress tracking, mock interviews, and a beautiful dark-themed UI.

![Stack](https://img.shields.io/badge/Next.js-14-black) ![Stack](https://img.shields.io/badge/Express.js-4-green) ![Stack](https://img.shields.io/badge/Firebase-Auth%20%2B%20Firestore-orange) ![Stack](https://img.shields.io/badge/Tailwind%20CSS-3-blue)

---

## Features

- **Authentication** — Firebase email/password login, signup, protected routes
- **Problem Library** — Browse problems by difficulty & topic, with search & filters
- **Code Editor** — Monaco editor with syntax highlighting, multi-language support (JS, Python, Java, C++)
- **AI Hints** — OpenAI-powered hints (falls back to stored hints if API unavailable)
- **Topic Roadmap** — Visual learning path with progress tracking per topic
- **Progress Dashboard** — Stats, charts, daily streak, heatmap, topic mastery
- **Mock Interview Mode** — 3 random problems, 45-min timer, hints disabled
- **Leaderboard** — Ranked users by problems solved or streak
- **Daily Challenge** — New problem highlighted each day
- **Bookmarks** — Save problems for later

---

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Shadcn UI components
- Monaco Editor
- Recharts
- Axios

### Backend
- Node.js + Express.js
- Firebase Admin SDK (Auth + Firestore)
- REST API architecture

### Optional Integrations
- **Judge0 API** — Code execution
- **OpenAI API** — AI hint generation

---

## Project Structure

```
DSA Platform/
├── backend/
│   ├── server.js              # Express server entry point
│   ├── controllers/           # Route handlers
│   │   ├── authController.js
│   │   ├── problemController.js
│   │   ├── submissionController.js
│   │   ├── hintController.js
│   │   ├── interviewController.js
│   │   ├── dailyController.js
│   │   ├── leaderboardController.js
│   │   └── bookmarkController.js
│   ├── routes/                # API routes
│   ├── middleware/             # Auth middleware
│   ├── services/              # Judge0 & OpenAI integrations
│   ├── models/                # Seed data script
│   └── utils/                 # Firebase config
│
├── frontend/
│   ├── app/                   # Next.js App Router pages
│   │   ├── layout.tsx
│   │   ├── page.tsx           # Landing page
│   │   ├── login/
│   │   ├── signup/
│   │   ├── dashboard/
│   │   ├── problems/
│   │   │   ├── page.tsx       # Problem list
│   │   │   └── [id]/page.tsx  # Problem detail + editor
│   │   ├── roadmap/
│   │   ├── leaderboard/
│   │   └── interview/
│   ├── components/            # Reusable components
│   │   ├── ui/                # Shadcn UI primitives
│   │   ├── Navbar.tsx
│   │   ├── ProblemCard.tsx
│   │   ├── CodeEditor.tsx
│   │   ├── ProgressChart.tsx
│   │   ├── DifficultyBadge.tsx
│   │   └── InterviewTimer.tsx
│   ├── context/               # Auth context
│   ├── hooks/                 # Custom hooks
│   ├── services/              # API service layer
│   └── lib/                   # Firebase, Axios, utilities
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Firebase project (free tier)
- (Optional) OpenAI API key
- (Optional) Judge0 API key (via RapidAPI)

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → Email/Password sign-in method
4. Enable **Cloud Firestore** database
5. Go to **Project Settings → Service accounts → Generate new private key** (for backend)
6. Go to **Project Settings → General → Your apps → Add web app** (for frontend config)

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env` with your Firebase credentials:

```env
PORT=5000
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FRONTEND_URL=http://localhost:3000

# Optional
OPENAI_API_KEY=sk-...
JUDGE0_API_URL=https://judge0-ce.p.rapidapi.com
JUDGE0_API_KEY=your-rapidapi-key
```

```bash
# Seed sample problems into Firestore
node models/seedProblems.js

# Start development server
npm run dev
```

Backend runs on **http://localhost:5000**

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

Edit `.env.local` with your Firebase web app config:

```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=000000000000
VITE_FIREBASE_APP_ID=1:000000:web:abc123
```

```bash
# Start development server
npm run dev
```

Frontend runs on **http://localhost:3000**

---

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register user profile | Yes |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update profile | Yes |
| GET | `/api/problems` | List all problems | No |
| GET | `/api/problems/:id` | Get problem by ID | No |
| POST | `/api/submissions/run` | Run code | Yes |
| POST | `/api/submissions/submit` | Submit solution | Yes |
| GET | `/api/submissions/user` | User's submissions | Yes |
| POST | `/api/hint` | Get AI hint | Yes |
| GET | `/api/interview/start` | Start mock interview | Yes |
| GET | `/api/daily` | Daily challenge | No |
| GET | `/api/leaderboard` | Leaderboard | No |
| POST | `/api/bookmarks/toggle` | Toggle bookmark | Yes |
| GET | `/api/bookmarks` | Get bookmarks | Yes |

---

## Firestore Collections

### `users`
```json
{
  "id": "uid",
  "email": "user@email.com",
  "name": "User Name",
  "solvedProblems": ["problemId1", "problemId2"],
  "bookmarks": ["problemId3"],
  "streak": 5,
  "lastSolvedDate": "2026-03-10",
  "createdAt": "2026-01-01T00:00:00.000Z"
}
```

### `problems`
```json
{
  "title": "Two Sum",
  "difficulty": "Easy",
  "topic": "Arrays",
  "description": "...",
  "examples": [{ "input": "...", "output": "...", "explanation": "..." }],
  "constraints": ["..."],
  "hints": ["..."],
  "solution": "...",
  "starterCode": { "javascript": "...", "python": "...", "java": "...", "cpp": "..." }
}
```

### `submissions`
```json
{
  "userId": "uid",
  "problemId": "problemId",
  "code": "...",
  "language": "javascript",
  "result": "Accepted",
  "output": "...",
  "createdAt": "2026-03-10T00:00:00.000Z"
}
```

---

## Sample Problems Included

| # | Title | Difficulty | Topic |
|---|-------|-----------|-------|
| 1 | Two Sum | Easy | Arrays |
| 2 | Valid Parentheses | Easy | Stacks |
| 3 | Reverse Linked List | Easy | Linked Lists |
| 4 | Best Time to Buy and Sell Stock | Easy | Arrays |
| 5 | Maximum Subarray | Medium | Arrays |
| 6 | Merge Two Sorted Lists | Easy | Linked Lists |
| 7 | Binary Tree Level Order Traversal | Medium | Trees |
| 8 | Implement Queue using Stacks | Easy | Queues |
| 9 | Longest Common Subsequence | Medium | Dynamic Programming |
| 10 | Number of Islands | Medium | Graphs |
| 11 | Valid Anagram | Easy | Strings |
| 12 | Climbing Stairs | Easy | Dynamic Programming |

---

## Color Theme

| Role | Color | Hex |
|------|-------|-----|
| Primary | Indigo | `#6366f1` |
| Success | Green | `#22c55e` |
| Warning | Amber | `#f59e0b` |
| Danger | Red | `#ef4444` |
| Background | Dark Neutral | `hsl(240, 10%, 3.9%)` |

---

## License

MIT
