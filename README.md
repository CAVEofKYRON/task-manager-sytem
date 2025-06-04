# Task Manager

This project is a React based task management app built with Vite and Tailwind CSS. It lets you create projects, add tasks and track their completion. The app works as a Progressive Web App (PWA) so it can be installed and used offline.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

You can preview the built site using:

```bash
npm run preview
```

## Features

- Manage projects and tasks with an easy to use interface
- Local storage is used to persist projects, tasks and dark mode preferences
- PWA support via `vite-plugin-pwa` for offline capability and installability
- Optional notifications and calendar import helpers

## Directory Structure

```
src/
  components/   # React components
  utils/        # Utility helpers (calendar and notification utilities)
```

- `src/components` contains UI components such as `ProjectsSidebar`, `NewProject` and `SelectedProject`.
- `src/utils` contains helper modules for calendar export and notifications.

Public assets and the web app manifest are located in the `public/` directory.

