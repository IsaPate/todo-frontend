# Todo Frontend

A Kanban-style todo app. Users sign up, log in, create boards and organize cards into three columns: **TODO**, **IN_PROGRESS** and **DONE**.

This is the frontend; it talks to a separate Java backend through a REST API.

## Features

- Register and log in with JWT authentication
- Protected routes – only logged-in users can see their boards
- Create boards
- Add cards to any column and edit existing ones
- Automatic logout when the token expires or is rejected (401/403)

## Tech stack

- **React 19** + **TypeScript**
- **Vite** – dev server and build
- **React Router** – routing
- **Zustand** – auth state, persisted in `localStorage`
- **Axios** – HTTP client, with interceptors for the auth token
- **Tailwind CSS 4** + **shadcn/ui** (Radix UI) – styling and UI components
- **Lucide** – icons
- **Oxlint** – linting

## Getting started

Requires Node.js and the backend running.

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file with the backend URL:

   ```bash
   VITE_BACKEND_HOST=http://localhost:8080
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

## Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the dev server         |
| `npm run build`   | Type-check and build         |
| `npm run preview` | Preview the production build |
| `npm run lint`    | Run Oxlint                   |
