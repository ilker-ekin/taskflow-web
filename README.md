# TaskFlow Web

**Live demo:** https://ilker-ekin.github.io/taskflow-web/

A simple task management app built with **Vue 3**, **Vite** and **Tailwind CSS**. You can add, list, update and delete tasks, and they are saved in the browser's **LocalStorage**, so no backend is needed.

This is the capstone project for the TNC Group _Web Development: JavaScript_ training.

## Screenshot

![Task list](docs/screenshots/01-liste.png)

## Features

| Feature | Where | Description |
|---|---|---|
| **Add** | `/tasks/new` (`TaskCreatePage`) | Create a task using a validated form |
| **List** | `/` (`TaskListPage`) | Task cards with status and priority badges, plus a message when the list is empty |
| **Update** | `/tasks/:id/edit` (`TaskEditPage`) | Change a task in the same form, filled in with its current values |
| **Delete** | "Sil" button on each card | Remove a task after a confirmation prompt |

Extras:
- Status filter: All / Pending / In progress / Completed
- Responsive layout that works on phones (~390px)
- The UI text is in Turkish

## Tech Stack

- [Vue 3](https://vuejs.org/) (`<script setup>`, Composition API)
- [Vite](https://vite.dev/)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Plain JavaScript and LocalStorage

## Getting Started

Requires Node.js 24 (see `.nvmrc`).

```bash
npm install      # install dependencies
npm run dev      # start the dev server at http://localhost:5173
npm run build    # build for production into dist/
npm run preview  # preview the production build at http://localhost:4173/taskflow-web/
```

## Project Structure

```
src/
├── components/      # Reusable UI: AppHeader, TaskCard, TaskForm, StatusBadge, EmptyState
├── pages/           # Route pages: TaskListPage, TaskCreatePage, TaskEditPage
├── interfaces/      # task.js: the Task shape (JSDoc) and status/priority constants
├── composables/     # useTasks.js: shared task state synced to LocalStorage
├── router/          # Route definitions
├── App.vue
└── main.js
```

The assignment asks for `Components`, `Pages` and `Interfaces` folders. They are `src/components`, `src/pages` and `src/interfaces`, written in lowercase because that is the Vue convention.

## Data Model

| Field | Type | Notes |
|---|---|---|
| `id` | string (UUID) | Generated automatically |
| `title` | string | Required, 3–120 characters |
| `description` | string | Optional |
| `status` | `pending` \| `in-progress` \| `completed` | |
| `priority` | `low` \| `medium` \| `high` | |
| `assignee` | string | Required |
| `createdAt` / `updatedAt` | ISO date string | Set automatically |

## Data Storage

Tasks are saved in LocalStorage under the key `taskflow-tasks`. If that data is missing or corrupted, the app starts with an empty list instead of crashing. To reset the app, clear the site data in your browser.

## Deployment

The site is deployed to **GitHub Pages** by a GitHub Actions workflow (`.github/workflows/deploy.yml`) on every push to `main`.

- `vite.config.js` sets `base: '/taskflow-web/'` for production builds, because GitHub Pages serves the site from that sub-path.
- `npm run build` also copies `index.html` to `404.html`, so that URLs like `/tasks/new` still work when opened directly or refreshed.

One-time setup: **Settings → Pages → Source: GitHub Actions**.

## Backend Project

This app uses the same data model as the separate REST API project [taskflow-api](https://github.com/ilker-ekin/taskflow-api). The web app does not call that API. It runs on its own.
