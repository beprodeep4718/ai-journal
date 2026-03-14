# System Architecture

## Overview

The system follows a layered architecture:

Client → API Server → Database / Cache → LLM Service

The frontend communicates with the backend through REST APIs.
The backend handles data storage, AI analysis, and insights aggregation.

---

# High Level Architecture

```
React Frontend
      │
      │ REST API
      ▼
Express Backend
      │
 ┌────┴────┐
 ▼         ▼
MongoDB   Redis
Storage   Cache
      │
      ▼
   LLM API
```

---

# Backend Architecture

The backend follows a modular design with clear separation of concerns.

### Controllers

Handle API requests and responses.

### Models

Define database schemas for journal entries.

### Routes

Define REST API endpoints.

### Services

Handle external integrations such as LLM APIs.

### Cache Layer

Handles Redis caching logic.

---

# Data Model

Each journal entry contains:

```
Journal
│
├ userId
├ ambience
├ text
├ emotion
├ summary
├ keywords
└ createdAt
```

Emotion analysis is stored directly with the journal entry.

---

# Data Flow

1. User writes a journal entry
2. Frontend sends POST request to backend
3. Backend stores entry in MongoDB
4. User clicks analyze
5. Backend sends journal text to LLM
6. LLM returns emotion, summary, keywords
7. Backend updates the journal entry
8. Insights API aggregates historical data
9. Redis caches insight responses

---

# Scaling to 100k Users

To support 100k users, prioritize non-blocking processing and aggressive caching.

### Worker Queue for LLM Analysis

Move journal analysis to background workers using a queue (for example, BullMQ/RabbitMQ/SQS).  
The API should enqueue analysis jobs and return immediately, while workers process jobs asynchronously.

### Queue Benefits

- Prevents API timeouts during LLM calls  
- Smooths traffic spikes with buffered job processing  
- Allows independent scaling of API servers and workers  
- Supports retries and dead-letter handling for failed jobs

### Multi-Layer Caching Strategy

Use Redis for both hot data and computed insights:

- **Read cache:** cache frequently requested journal summaries and recent entries  
- **Computation cache:** cache insights/analytics responses to avoid repeated aggregation  
- **Analysis cache check:** skip re-analysis when emotion/summary/keywords already exist

### Cache Invalidation

Apply TTL-based expiration and event-driven invalidation (for example, on journal update/delete) to keep cached data accurate.

---

# Reducing LLM Cost

Several strategies reduce LLM usage costs:

1. Analyze entries only when the user clicks "Analyze"
2. Store analysis results permanently in the database
3. Avoid reprocessing previously analyzed entries
4. Use smaller LLM models for simple emotion classification
5. Batch multiple analysis tasks when possible

---

# Caching Repeated Analysis

Repeated analysis is avoided by:

1. Checking if the journal entry already contains emotion data
2. Returning stored analysis instead of calling the LLM again
3. Using Redis to cache insights API responses

This significantly reduces LLM requests.

---

# Protecting Sensitive Journal Data

Journal entries may contain personal emotional information. The system protects this data by:

### Encryption

Sensitive fields can be encrypted before storing in the database.

### Secure API Communication

All APIs should run over HTTPS in production.

### Access Control

Users should only access their own journal entries.

### Database Security

MongoDB authentication and network restrictions prevent unauthorized access.

---


# Conclusion

The system architecture separates responsibilities between the frontend, backend services, database storage, caching layer, and LLM integration. This design ensures maintainability, scalability, and efficient processing of journal analysis tasks.
