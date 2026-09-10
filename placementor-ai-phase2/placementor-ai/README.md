# PlaceMentor AI — Frontend (Phase 1)

A React + Vite frontend for PlaceMentor AI. This phase covers the public
landing page, the login page, routing between them, and a placeholder
dashboard route that the rest of the team's backend will eventually power.

## 1. Install and run

You need [Node.js](https://nodejs.org) 18+ installed.

```bash
cd placementor-ai
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

Other commands:

```bash
npm run build     # production build, output to dist/
npm run preview   # preview the production build locally
```

## 2. What you'll see in the browser

- **`/`** — the landing page: hero with a mock dashboard preview, a stats
  bar, a features grid, a "how it works" section, a benefits section, a
  dark AI-capabilities section, student testimonials, an FAQ accordion,
  and a closing call-to-action.
- **`/login`** — a split-screen login page (brand panel + form). Submitting
  the form with any values (it's pre-filled with demo values) takes you to
  `/dashboard`. There is no real authentication yet.
- **`/dashboard`** — a placeholder page confirming the Login → Dashboard
  flow works, and that dummy data is already flowing through
  `src/services/api.js`. The full sidebar-and-widgets dashboard is built
  in Phase 2.

Resize the browser (or open dev tools' device toolbar) to see the
responsive behavior: the navbar collapses into a mobile menu, and every
grid section stacks down to one or two columns.

## 3. Project structure

```
placementor-ai/
├── index.html                  Loads fonts (Space Grotesk + Inter), mounts React
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                 React entry point, wraps App in BrowserRouter
    ├── App.jsx                  Route definitions (/, /login, /dashboard)
    ├── index.css                Design tokens (colors, type, spacing) + shared utility classes
    │
    ├── components/               Reusable, cross-page pieces
    │   ├── Logo.jsx               PlaceMentor AI mark + wordmark
    │   ├── Navbar.jsx / .css      Sticky nav with responsive mobile menu
    │   ├── Footer.jsx / .css      Site footer
    │   ├── Button.jsx             Shared button (renders <button> or a <Link>)
    │   └── DashboardPreview.jsx   Static "mockup" card used on hero + login
    │
    ├── pages/
    │   ├── Landing.jsx / .css     The full landing page (see section 2)
    │   ├── Login.jsx / .css       Login page, mocked auth
    │   └── StudentDashboard.jsx / .css   Phase 1 placeholder dashboard
    │
    ├── data/                      Dummy data, kept separate from components
    │   ├── landingData.js          Stats, features, FAQs, testimonials, etc.
    │   └── studentData.js          One dummy student profile object
    │
    └── services/
        └── api.js                 Mock "API" functions (see section 4)
```

## 4. How dummy data flows through the app

Nothing is hardcoded inside JSX. The flow is:

```
data/*.js  →  services/api.js  →  page component (via useState/useEffect)  →  JSX
```

- **`data/landingData.js`** is imported directly by `Landing.jsx`, since the
  marketing content isn't "student data" — it's just page copy.
- **`data/studentData.js`** is wrapped by **`services/api.js`**, which
  exposes functions like `getStudentDashboard()`. These functions return a
  `Promise` (using `setTimeout` to fake network latency), so components
  already call them the same way they'll call a real API later:

  ```js
  useEffect(() => {
    getStudentDashboard().then(setStudent);
  }, []);
  ```

This is deliberate — see section 5.

## 5. Replacing dummy data with the real backend later

When Pallavi's backend is ready, only **`src/services/api.js`** needs to
change. Each function currently does this:

```js
export function getStudentDashboard() {
  return mockResponse(studentData); // dummy, from data/studentData.js
}
```

It becomes this:

```js
const BASE_URL = "https://api.placementor.ai"; // or wherever the backend lives

export async function getStudentDashboard() {
  const res = await fetch(`${BASE_URL}/student/dashboard`);
  if (!res.ok) throw new Error("Failed to load dashboard");
  return res.json();
}
```

No page or component needs to change, because they already call
`getStudentDashboard()` and just use whatever it resolves to. This is why
the mock functions exist instead of importing `studentData.js` directly
inside pages.

The frontend never talks to the database, ML models, or NLP models
directly — everything goes through this `services/` layer, which is the
only place backend URLs will ever be added.

## 6. Adding a new page

1. Create the file in `src/pages/`, e.g. `src/pages/SkillGap.jsx` (+ a
   matching `.css` file if it needs its own styles).
2. If it needs data, add a dummy dataset to `src/data/` and a matching
   function in `src/services/api.js`.
3. Register the route in `src/App.jsx`:

   ```jsx
   import SkillGap from "./pages/SkillGap.jsx";
   // ...
   <Route path="/dashboard/skill-gap" element={<SkillGap />} />
   ```
4. Link to it from wherever makes sense (in Phase 2, this will usually be
   the dashboard sidebar).

## 7. Design system quick reference

All colors, fonts, spacing, and shadows are defined once as CSS variables
in `src/index.css` (`:root { ... }`). Key ones:

| Token | Value | Used for |
|---|---|---|
| `--primary` | `#4F46E5` | Buttons, links, active states |
| `--ink` | `#101534` | Headings, primary text |
| `--ink-soft` | `#4B5171` | Secondary/body text |
| `--surface` | `#F5F6FB` | Section backgrounds |
| `--navy` | `#0D1230` | Dark sections (stats bar, AI capabilities, footer) |
| `--font-display` | Space Grotesk | Headings |
| `--font-body` | Inter | Body text, UI |

Reuse these variables instead of hardcoding new colors when building later
phases, so everything stays visually consistent.

## 8. What's next

This is **Phase 1 only** (project setup, landing page, login page,
routing). Say **"NEXT"** to move on to Phase 2: the real student dashboard
— sidebar, navbar, readiness score, and placement probability card.

---

# Phase 2 — Student Dashboard & Placement Intelligence

Phase 2 replaces the Phase 1 placeholder dashboard with the full Student
Dashboard, plus the sidebar/navbar shell that every future page will reuse.

## New structure added in Phase 2

```
src/
├── components/
│   ├── DashboardLayout.jsx / .css   Shared shell: top navbar + sidebar + scrollable main
│   ├── DashboardNavbar.jsx / .css   Sticky top bar (search, notifications, account menu)
│   ├── Sidebar.jsx / .css           Grouped nav + active highlighting + user profile
│   ├── StatCard.jsx / .css          Quick-stat tile (Skills / Applications / Interviews / Profile)
│   ├── PageHeader.jsx / .css        Dashboard greeting + season/status badges
│   ├── ReadinessScore.jsx / .css    Radial score gauge + category breakdown + AI insight
│   ├── ProbabilityCard.jsx / .css   Placement probability + Recharts trend line
│   ├── ProgressBar.jsx / .css       Reusable labeled progress bar (several tones/sizes)
│   ├── InsightCard.jsx / .css       "AI Career Insight" card
│   ├── ActivityList.jsx / .css      "Recent Activity" feed
│   ├── ProfileCompletion.jsx / .css "Complete your profile" card
│   └── TaskList.jsx / .css          "Your Next Steps" list
│
├── data/
│   ├── studentData.js      Expanded with season, status, stats, readiness breakdown
│   ├── readinessData.js    Category labels + AI insight text
│   ├── probabilityData.js  Monthly trend + current/previous probability
│   ├── activityData.js     Recent activity feed
│   ├── taskData.js         Upcoming tasks with priority
│   └── navigationData.js   Sidebar nav groups + placeholder page descriptions
│
├── pages/
│   ├── StudentDashboard.jsx / .css   Full Phase 2 dashboard (rebuilt from the Phase 1 placeholder)
│   └── PlaceholderPage.jsx / .css    Generic "coming in a future phase" page
│
└── services/api.js   Extended with getReadinessScore, getPlacementProbability,
                       getRecentActivity, getUpcomingTasks, getCareerInsight
```

Note: the dashboard's top bar lives in **`DashboardNavbar.jsx`**, a new file —
the original `Navbar.jsx` from Phase 1 is untouched and still powers the
public landing page, so nothing there breaks.

## Routing

`App.jsx` now registers `/dashboard` (full dashboard) plus 15 placeholder
routes (`/profile`, `/readiness`, `/skills`, `/roadmap`, `/mentor`,
`/mock-interview`, `/resume-analyzer`, `/coding`, `/companies`,
`/company-preparation`, `/applications`, `/trends`, `/settings`, `/help`,
`/recruiter`) — each rendered by the shared `PlaceholderPage` component so
every sidebar link goes somewhere instead of 404ing.

## Testing checklist

1. `npm install && npm run dev`, then open the printed localhost URL.
2. **Landing page** (`/`) still loads and looks unchanged.
3. **Login** (`/login`) — submit the form → lands on `/dashboard`.
4. **Dashboard** — briefly shows a shimmering skeleton, then:
   - Greeting header with your name, branch, year, CGPA, season and status badge
   - 4 stat cards (Skills Matched, Applications, Interviews, Profile Completion)
   - Readiness score gauge (82/100, "Excellent Progress") with 6 category bars and an AI insight box
   - Placement Probability card with the trend chart (hover a point for a tooltip)
   - Readiness Breakdown section (6 mini cards)
   - AI Career Insight card + Complete Your Profile card
   - Recent Activity feed + Your Next Steps task list
5. **Sidebar** — click any item in Main / AI Tools / Career; the active item
   highlights and unbuilt pages show a "Coming in a future phase" placeholder
   instead of an error.
6. **Responsive check** — resize down to tablet/mobile width: the sidebar
   becomes a slide-out drawer opened via the hamburger icon in the top bar,
   an overlay closes it on tap, and all card grids stack to one column.
7. **Logout** — click your avatar in the top bar (or Logout in the sidebar) →
   returns to `/`.
8. Refresh the browser on `/dashboard` directly — it still loads correctly.
9. Check the browser console — no errors.

## Future backend integration (unchanged approach)

Every widget on the dashboard gets its data by calling a function from
`src/services/api.js` (`getStudentDashboard`, `getReadinessScore`,
`getPlacementProbability`, `getRecentActivity`, `getUpcomingTasks`,
`getCareerInsight`). Each currently resolves a dummy object after a short
delay. When Pallavi's backend is ready, only this file changes — swap the
body of each function for a real `fetch()` call to her API, matching the
same return shape, and every component keeps working unmodified.

## What's next

Phase 2 is complete. Say **"NEXT"** to move on to Phase 3: Skill Gap
Analysis + Personalized Learning Roadmap.
