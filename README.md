# My DVDtheque - Frontend

A single-page application (SPA) for managing a personal DVD collection. Built with React, TypeScript, and Vite. Features full CRUD operations, search & filtering, user authentication, and collection statistics with charts.

[Link for the BACK repository](https://github.com/Harmajabb/my-dvdtheque-BACK)

## Tech Stack

| Technology | Role |
|---|---|
| React 19 | UI library |
| TypeScript 5.9 | Type safety |
| Vite 7 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| shadcn/ui | Component library (New York preset) |
| Axios | HTTP client |
| React Router DOM 7 | Client-side routing |
| Recharts | Data visualization (charts) |
| Biome | Linter & formatter |
| Vitest | Unit & integration testing |

## Prerequisites

- **Node.js** >= 18
- **npm**
- **Backend API** running and accessible (this frontend expects a REST API, see [API Endpoints](#api-endpoints-consumed) below)

## Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd my-dvdtheque-front

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your values (see Environment Variables section)

# Start development server
npm run dev
```

## Environment Variables

| Variable | Required | Description | Example |
|---|---|---|---|
| `VITE_API_URL` | Yes | Base URL of the backend API | `http://localhost:5000/api` |

> **Note for DevOps:** All environment variables must be prefixed with `VITE_` to be exposed to the client-side bundle. These values are **embedded at build time** — changing them requires a rebuild. There are no runtime server-side environment variables.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server (default: port 5173) |
| `npm run build` | TypeScript type-check + production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Run Biome linter & format check |
| `npm run check:fix` | Auto-fix linting & formatting issues |
| `npm run format` | Format code with Biome |
| `npm run test` | Run Vitest in watch mode |
| `npm run test:run` | Run tests once (CI-friendly) |

## Project Architecture

```
src/
├── assets/            # Static images (hero images, etc.)
├── components/        # Reusable UI components
│   ├── ui/            #   shadcn/ui primitives (Button, Card, Chart)
│   ├── Navbar/        #   Top navigation bar
│   ├── Footer/        #   Footer
│   ├── DvdCard/       #   Single DVD card display
│   ├── DvdList/       #   Grid layout for DVD cards
│   ├── Filters/       #   Genre, status, and sort filters
│   ├── Search/        #   Search bar component
│   ├── Hero/          #   Landing page hero section
│   ├── About/         #   About section
│   ├── HowItWorks/   #   Tutorial section
│   ├── Reveal/        #   Scroll-triggered animation wrapper
│   └── Root/          #   ProtectedRoute (auth guard)
├── context/           # React Context providers
│   └── AuthContext    #   Global auth state (JWT, user, login/logout)
├── hooks/             # Custom React hooks
│   └── useReveal      #   Scroll animation hook
├── lib/               # Utility functions
│   └── utils          #   cn() helper (clsx + tailwind-merge)
├── pages/             # One folder per route/page
│   ├── Landing/       #   Public landing page
│   ├── Login/         #   Login form
│   ├── Register/      #   Registration form
│   ├── ForgotPassword/#   Password recovery
│   ├── ResetPassword/ #   Password reset (with token)
│   ├── Home/          #   Main collection view (search, filter, paginate)
│   ├── AddDvd/        #   Add a new DVD form
│   ├── EditDvd/       #   Edit an existing DVD
│   ├── DvdDetail/     #   DVD detail view
│   └── Stats/         #   Collection analytics dashboard
├── services/          # API client layer
│   └── api            #   Axios instance, interceptors, all API calls
├── types/             # Shared TypeScript types (User, Dvd, etc.)
├── test/              # Test setup and utilities
├── App.tsx            # Root component (routes + providers)
└── main.tsx           # Entry point
```

## Application Routes

| Path | Page | Auth Required | Description |
|---|---|---|---|
| `/` | Landing | No | Public landing page |
| `/login` | Login | No | User login |
| `/register` | Register | No | User registration |
| `/forgot-password` | ForgotPassword | No | Request password reset email |
| `/reset-password/:token` | ResetPassword | No | Reset password with token |
| `/home` | Home | Yes | DVD collection (search, filter, paginate) |
| `/add` | AddDvd | Yes | Add a new DVD |
| `/dvd/:id` | DvdDetail | Yes | View DVD details |
| `/dvd/:id/edit` | EditDvd | Yes | Edit a DVD |
| `/stats` | Stats | Yes | Collection statistics & charts |
| `*` | — | — | Redirects to `/` |

Protected routes redirect unauthenticated users to `/login`.

## API Endpoints Consumed

The frontend expects a REST API at `VITE_API_URL`. Authentication uses JWT Bearer tokens sent via the `Authorization` header.

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login (returns `{ token, user }`) |
| POST | `/auth/forgot-password` | Request password reset |
| POST | `/auth/reset-password` | Reset password with token |

### DVDs

| Method | Endpoint | Params | Description |
|---|---|---|---|
| GET | `/dvds` | `page`, `limit` | List DVDs (paginated) |
| GET | `/dvds/:id` | — | Get a single DVD |
| POST | `/dvds` | body: DVD data | Create a new DVD |
| PUT | `/dvds/:id` | body: DVD data | Update a DVD |
| DELETE | `/dvds/:id` | — | Delete a DVD |
| GET | `/dvds/search` | `q`, `page`, `limit` | Search DVDs |

## Build & Deployment

```bash
npm run build
```

This outputs a static SPA to the `dist/` directory.

### Deployment notes

- **Static hosting:** The `dist/` folder contains static files (HTML, CSS, JS) and can be served by any static file server (Nginx, Caddy, Apache, S3 + CloudFront, Vercel, Netlify, etc.).
- **SPA fallback:** Since this is a client-side routed SPA, all paths must fall back to `index.html`. Configure your web server to serve `index.html` for any route that doesn't match a static file.
- **Environment at build time:** `VITE_API_URL` is baked into the JS bundle during `npm run build`. To change it, rebuild with the updated `.env` or set the variable inline: `VITE_API_URL=https://api.prod.example.com npm run build`.
