# AI-Assisted Journal System

## Overview

![UI Screenshot](docs/ui.png)

This project is an AI-assisted journaling platform built for ArvyaX immersive nature sessions.
After completing a nature ambience session (forest, ocean, or mountain), users can write journal entries that are analyzed using a Large Language Model (LLM) to extract emotions, summaries, and keywords.

The system stores entries, analyzes emotional patterns, and provides insights into the user's mental state over time.

---

# Features

### 1. Journal Entry Creation

Users can write a journal entry and select the ambience associated with their session.

Example request:

POST /api/journal

```
{
"userId": "123",
"ambience": "forest",
"text": "I felt calm today after listening to the rain."
}
```

The entry is stored in the database.

---

### 2. Retrieve Journal Entries

GET /api/journal/:userId

Returns all entries belonging to a specific user.

Example response:

```
[
{
"_id": "...",
"userId": "123",
"ambience": "forest",
"text": "I felt calm today after listening to the rain",
"emotion": "calm",
"summary": "...",
"keywords": ["rain","nature"],
"createdAt": "..."
}
]
```

---

### 3. LLM Emotion Analysis

POST /api/journal/analyze

Input:

```
{
"text": "I felt calm today after listening to the rain"
}
```

Output:

```
{
"emotion": "calm",
"keywords": ["rain","nature","peace"],
"summary": "User experienced relaxation during the forest session"
}
```

The analysis result is stored in the database and attached to the journal entry.

---

### 4. Insights API

GET /api/journal/insights/:userId

Returns aggregated insights:

```
{
"totalEntries": 8,
"topEmotion": "calm",
"mostUsedAmbience": "forest",
"recentKeywords": ["focus","nature","rain"]
}
```

These insights help users understand emotional patterns across their journaling history.

---

# Tech Stack

Backend

* Node.js
* Express.js

Frontend

* React (Vite)

Database

* MongoDB

Caching

* Redis

AI Integration

* LLM API (used for emotion detection, summary, and keyword extraction)

---

# Project Structure

Backend

```
backend
│
├ controllers
│   journalController.js
│
├ models
│   Journal.js
│
├ routes
│   journalRoutes.js
│
├ services
│   llmService.js
│
├ cache
│   redisClient.js
│
└ server.js
```

Frontend

```
frontend
│
├ src
│   ├ api
│   │   journalApi.js
│   │
│   ├ components
│   │   JournalForm.jsx
│   │   JournalList.jsx
│   │   Insights.jsx
│   │
│   ├ hooks
│   │   useUserId.js
│   │
│   └ App.jsx
```

---

# Running the Project

## 1. Backend

```
cd backend
npm install
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

## 2. Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

# API Summary

| Method | Endpoint                      | Description          |
| ------ | ----------------------------- | -------------------- |
| POST   | /api/journal                  | Create journal entry |
| GET    | /api/journal/:userId          | Get entries          |
| POST   | /api/journal/analyze          | Analyze journal      |
| GET    | /api/journal/insights/:userId | Get insights         |

---

# API Testing 

### 1. Create a journal entry
```
curl -X POST http://localhost:5000/api/journal \
-H "Content-Type: application/json" \
-d '{
"userId": "123",
"ambience": "forest",
"text": "I felt calm today after listening to the rain."
}'
```
### 2. Get journal entries
```
curl http://localhost:5000/api/journal/123
```
### 3. Analyze a journal entry
```
curl -X POST http://localhost:5000/api/journal/analyze \
-H "Content-Type: application/json" \
-d '{
"text": "I felt calm today after listening to the rain"
}'
```
### 4. Get insights
```
curl http://localhost:5000/api/journal/insights/123
```

# Bonus Features Implemented

* Redis caching for insights API
* Modular backend structure
* LLM-powered analysis
* Frontend integration
* Local user ID generation
* Redis caching for insights API
* Redis caching for repeated LLM analysis
* Rate limiting for analysis endpoint

---

# Future Improvements

* Authentication and user accounts
* Emotion trend charts
* Streaming LLM responses
* Real-time analytics dashboard
* Deployment with Docker

---

# Conclusion

This system demonstrates a complete full-stack architecture combining journaling, AI analysis, and analytics. The platform enables users to reflect on their emotional patterns through AI-assisted insights.
