# Reminder App — Enterprise React Scaffold

A production-ready, **feature-based folder architecture** for a Todoist /
TickTick / Habitica-style reminder app, built with **React 18 + Vite + React
Router + Redux Toolkit**. Every screen described in the original brief is
scaffolded, routed, and reachable — no business logic yet, by design.

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> /dist
npm run preview   # preview the production build
```

## What's inside

- **23 modules, 172 screens** — Authentication, Dashboard, Reminder, Calendar,
  Templates, AI Assistant, Voice Assistant, Location Reminder, Habit Tracker,
  Goal Tracker, Pomodoro, Notes, Notifications, Badges, XP & Levels,
  Streak, Analytics, Premium, Profile, Settings, Help Center, Legal.
- Every screen is **lazy-loaded** and **code-split** automatically (each
  builds to its own ~0.2 kB chunk — see `npm run build` output).
- A landing page (`/`) groups all modules into a launcher grid.
- Visiting any bare module path (e.g. `/habit-tracker`) shows an overview
  card grid of every screen inside that module.
- The sidebar mirrors the same structure and expands per module.
- Light/dark theme toggle, wired through CSS variables + React Context.

## Single source of truth

`src/constants/navigationStructure.js` is the **only place** the
module/screen list lives. Everything else derives from it:

- `scripts/generate-screens.mjs` reads it and writes one placeholder
  component per screen into `src/screens/<Module>/<Screen>/`, plus the
  lazy-loaded route table at `src/navigation/routes.generated.js`.
- The `Sidebar`, `Home`, and `ModuleOverview` components read it at runtime
  to render navigation — no hardcoded menu to keep in sync.

**To add, rename, or remove a screen:** edit `navigationStructure.js`, then
re-run:

```bash
node scripts/generate-screens.mjs
```

It's idempotent — safe to re-run any time the structure changes. Routes and
folders regenerate deterministically; anything you've since customized
inside an existing screen file is untouched unless you delete it first.

## Folder structure

```
src/
├── api/              # fetch client + endpoint path registry
├── assets/           # images, icons, fonts
├── components/
│   ├── common/       # Button, Card, Input, Modal, Loader, EmptyState, PageHeader, Chip
│   └── layout/        # Sidebar, Topbar, AppLayout
├── config/           # env-driven app config
├── constants/        # navigationStructure.js (source of truth)
├── context/          # ThemeContext, AuthContext
├── hooks/             # useAuth, useTheme, useLocalStorage
├── localization/      # en.json + t() loader
├── navigation/        # AppRouter.jsx, routes.generated.js
├── redux/
│   ├── slices/        # uiSlice, authSlice, reminderSlice
│   └── store.js
├── screens/
│   ├── _shared/        # Home, ModuleOverview, NotFound, ScreenTemplate
│   └── <Module>/<Screen>/<Screen>.jsx   ← 172 generated placeholders
├── services/           # storage.service.js, notification.service.js
├── styles/             # globals.css, variables.css, animations.css
├── theme/              # colors.js, typography.js (design tokens)
├── types/              # JSDoc typedefs (Reminder, Habit, Goal, Note, User)
├── utils/              # classNames, formatDate, slugify
├── App.jsx
└── main.jsx
```

## Design tokens

Palette and type system live in `src/theme/` (JS) and
`src/styles/variables.css` (CSS variables) — keep both in sync if you change
either. Display face is **Sora**, body/UI is **Inter**, data/mono is
**JetBrains Mono**, loaded via Google Fonts in `index.html`.

## Implementing a real screen

Open any generated file, e.g. `src/screens/Reminder/ReminderList/ReminderList.jsx`.
It currently renders the shared `<ScreenTemplate>` placeholder — replace the
body with real UI, keep the file name and default export as-is, and the
route/sidebar entry keeps working without any other change.

## Not included yet (intentionally)

- Backend / API integration (an `apiClient` and `ENDPOINTS` registry are
  stubbed in `src/api/` — point them at your real backend)
- Auth logic (`AuthContext` and `authSlice` are state shells only)
- The companion **Admin Panel** (React + Vite + MUI) described in the same
  brief — ask if you'd like that scaffolded as a separate project too.
