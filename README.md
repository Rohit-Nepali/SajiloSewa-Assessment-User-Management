# Sajilo Sewa User Management Dashboard

A responsive React + TypeScript user directory built for the Sajilo Life assessment. It supports searchable, filterable and paginated users, profile details, add/edit forms, deletion confirmation, loading/error/empty states, routing, and persistent light/dark themes.

## Run locally

```bash
npm install
npm run dev
```

Production verification uses `npm run build`. The app consumes DummyJSON at `https://dummyjson.com/users`; its write endpoints are simulated by the API.

## Architecture

- `services/apiClient.ts` owns the single Axios instance and normalized errors.
- `services/userService.ts` owns user endpoints.
- `hooks/useUsers.ts` owns list query state and refetching.
- `context/ThemeContext.tsx` owns persisted application theme state.
- `App.tsx` contains route-level pages; shared loading/error/empty states and the layout are separate components.

## Routes

`/users`, `/users/:id`, `/users/new`, `/users/:id/edit`, and a catch-all Not Found route.
