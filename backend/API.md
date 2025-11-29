# NaijaScout Backend API

This document provides a concise reference for the NaijaScout REST API. Use as a copy-and-paste reference for frontend or integration work.

Base path: `/api`

---

## Auth

- POST `/api/auth/register`
  - Payload:
    ```json
    { "name": "Precious", "email": "pm@naijascout.com", "password": "123456", "role": "player" }
    ```

- POST `/api/auth/login`
- POST `/api/auth/forgot-password`
- POST `/api/auth/reset-password`
- POST `/api/auth/verify-email`
- POST `/api/auth/send-otp`
- POST `/api/auth/social-login`

## Players

- GET `/api/players` - list players (query: `position`, `status`, `page`, `limit`, `sort`, `order`)
- GET `/api/players/:id` - get player
- POST `/api/players` - create player
- PUT `/api/players/:id` - update player
- DELETE `/api/players/:id` - delete player
- GET `/api/players/stats/overview` - aggregated stats
- POST `/api/players/stats` - update match stats (implement in code)
- POST `/api/players/highlights` - upload/link highlight
- GET `/api/players/:id/highlights` - get highlights
- POST `/api/players/watch/:userId` - add to watchlist
- GET `/api/players/watchlist` - view watchlist

## Scouts

- GET `/api/scouts/players` - discovery search
- POST `/api/scouts/report` - create scouting report
- GET `/api/scouts/reports/:playerId` - reports for player
- POST `/api/scouts/shortlist/:playerId` - add to shortlist
- GET `/api/scouts/shortlist` - shortlist
- GET `/api/scouts/trials/applications` - view trial applications

## Trials / Academy

- POST `/api/trials` - create trial
- GET `/api/trials` - list trials
- GET `/api/trials/:id` - trial details
- POST `/api/trials/:id/apply` - apply to trial
- GET `/api/trials/:id/applications` - view applicants
- PUT `/api/trials/:id/application/:applicantId` - approve/reject

## Messaging

- GET `/api/messages/conversations` - list user chats
- POST `/api/messages/:userId` - send message
- GET `/api/messages/:userId` - get chat with user

## Notifications

- GET `/api/notifications` - list notifications
- POST `/api/notifications/read/:id` - mark one read
- POST `/api/notifications/read-all` - mark all read

## Posts / Highlights

- GET `/api/posts` - global feed
- POST `/api/posts` - create post (image/video)
- POST `/api/posts/:id/like` - like post
- POST `/api/posts/:id/comment` - add comment
- GET `/api/posts/user/:userId` - posts by user

## Analytics

- GET `/api/analytics/player/:id` - player dashboard
- GET `/api/analytics/trials` - trials engagement
- GET `/api/analytics/posts` - post insights

## Fans

- GET `/api/fans/feed`
- POST `/api/fans/follow/:userId`

## Admin

- GET `/api/admin/users`
- DELETE `/api/admin/user/:id`
- GET `/api/admin/analytics/overview`

## Uploads

- POST `/api/uploads/image` - form file `file`
- POST `/api/uploads/video` - form file `file`

---

Notes:
- Many endpoints in this scaffold are stubbed and need implementation to connect to MongoDB models and business logic.
- Protect routes that require authentication with your auth middleware and role checks.
