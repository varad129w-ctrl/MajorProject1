# Product Requirements Document (PRD)
## Project Name: TripCraft — Smart Travel & Budget Planner

**Version:** 1.0
**Prepared for:** Solo Developer Build (Vanilla HTML/CSS/JS + Node.js/Express + MongoDB)
**Date:** September 2026

---

## 1. Overview

**TripCraft** is a service-based travel planning platform. A user searches for a tourist destination (e.g., "Manali", "Goa", "Jaipur") and the platform returns:

- All popular places/attractions in that destination
- A ready-made itinerary/plan (days, order of visiting places, timing)
- Budget breakdown across **Low / Medium / High** budget tiers (stay, food, travel, activities)
- Estimated total cost per person
- Option to save the plan, customize it, and (later) book associated services

The platform has three user roles: **Visitor/User**, **Admin** (who manages destinations/places/plans), and optionally **Contributor** (local guides who submit place data — can be added in Phase 2).

---

## 2. Goals & Objectives

| Goal | Description |
|---|---|
| Primary | Let users search a destination and instantly get a curated, budget-tiered travel plan |
| Secondary | Allow users to save/download their plans and manage a profile |
| Tertiary | Give admins a dashboard to add/edit destinations, places, and plans without touching code |
| Business | Build a reusable full-stack project demonstrating auth, CRUD, search/filter, role-based access, and budget logic |

---

## 3. Target Users

- **Travelers** planning a trip who want a quick, ready plan instead of researching for hours
- **Budget-conscious users** who want to see cost differences (backpacking vs comfort vs luxury)
- **Admin/content team** who curate and update destination data

---

## 4. Core Features (Phase 1 — MVP)

1. **Destination Search** — search bar with autocomplete/suggestions
2. **Destination Listing Page** — grid/list of all available destinations
3. **Destination Detail Page** — shows popular places, map area, best time to visit
4. **Auto-Generated Plan** — day-wise itinerary generated from stored place data
5. **Budget Tier Selector** — Low / Medium / High, dynamically recalculates estimated cost
6. **User Authentication** — signup/login (JWT-based), password hashing
7. **Save Plan** — logged-in users can save a generated plan to "My Trips"
8. **Admin Panel** — add/edit/delete destinations, places, and base plan templates
9. **Responsive Design** — mobile-first, since most travel searches happen on phone

## 5. Features (Phase 2 — Post-MVP, optional stretch goals)

- Reviews/ratings on destinations and places
- PDF export/download of the generated plan
- Currency conversion for international users
- Weather API integration for "best time to visit"
- Group trip planning (invite friends, split budget)
- Booking integration (hotels/transport partners) — monetization layer
- Local guide/contributor submissions with admin approval queue

---

## 6. Full Page List

### Public-Facing Pages
| # | Page | Purpose |
|---|---|---|
| 1 | **Home Page** | Hero search bar, featured destinations, how-it-works section | DDD
| 2 | **All Destinations Page** | Full list/grid of all destinations with filter (region, budget range, tags like "hill station", "beach", "heritage") | DDD
| 3 | **Destination Detail Page** | Overview, popular places list, best time to visit, budget tier tabs |DDD
| 4 | **Generated Plan Page** | Day-wise itinerary, cost breakdown table, "Save this Plan" button |
| 5 | **Place Detail Page** (optional, can be a modal) | Single attraction's details — description, entry fee, timings, images |
| 6 | **About Us Page** | What the platform does |
| 7 | **Contact Us Page** | Contact form (stored in DB, viewable by admin) |
| 8 | **404 / Not Found Page** | Fallback page |

### Auth Pages
| # | Page | Purpose |
|---|---|---|
| 9 | **Login Page** | Email/password login |
| 10 | **Signup Page** | New user registration |
| 11 | **Forgot/Reset Password Page** | Basic password reset flow |

### User (Logged-in) Pages
| # | Page | Purpose |
|---|---|---|
| 12 | **User Dashboard / My Trips** | List of all saved plans |
| 13 | **Saved Plan Detail Page** | View/edit a previously saved plan |
| 14 | **Profile/Settings Page** | Update name, password, preferences |

### Admin Pages
| # | Page | Purpose |
|---|---|---|
| 15 | **Admin Login Page** | Separate or role-gated login |
| 16 | **Admin Dashboard (Overview)** | Stats: total destinations, users, saved plans |
| 17 | **Manage Destinations Page** | Add/edit/delete destinations |
| 18 | **Manage Places Page** | Add/edit/delete places under a destination |
| 19 | **Manage Plan Templates Page** | Define base itinerary + budget data per destination |
| 20 | **Manage Users Page** | View/disable users (basic moderation) |
| 21 | **Contact Submissions Page** | View messages from the Contact Us form |

**Total: ~21 pages**, giving you enough scope to demonstrate full CRUD, auth, role-based routing, dynamic rendering, and a genuinely useful product.

---

## 7. Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript (Fetch API, DOM manipulation) |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Auth | JWT (jsonwebtoken) + bcrypt for password hashing |
| File/Image handling | Multer (local storage) or Cloudinary (if you want hosted images) |
| Templating (optional) | EJS — only if you want server-rendered pages instead of pure fetch-based SPA-like behavior |
| Deployment | Render/Railway (backend), Netlify/Vercel or same server (frontend), MongoDB Atlas (DB) |

> **Note:** Since you're avoiding React, plan for either (a) a multi-page app (MPA) where each HTML file is its own page and JS fetches data into it, or (b) using EJS as a lightweight templating layer on the Express server to reduce repeated HTML. MPA with vanilla JS is simpler to reason about for a first big build.

---

## 8. Data Models (MongoDB Collections)

### User
```
{
  _id, name, email, passwordHash, role: "user" | "admin",
  savedPlans: [PlanId], createdAt
}
```

### Destination
```
{
  _id, name, region, tags: [String], description,
  coverImage, bestTimeToVisit, avgTemperature,
  createdAt
}
```

### Place
```
{
  _id, destinationId, name, description, image,
  entryFee, avgTimeSpent, category (e.g. "temple","viewpoint","adventure"),
  order (default visiting sequence)
}
```

### PlanTemplate
```
{
  _id, destinationId, days: Number,
  itinerary: [
    { day: 1, places: [placeId, placeId], notes }
  ],
  budgetBreakdown: {
    low:    { stay, food, travel, activities, total },
    medium: { stay, food, travel, activities, total },
    high:   { stay, food, travel, activities, total }
  }
}
```

### SavedPlan (per user)
```
{
  _id, userId, destinationId, planTemplateId,
  selectedBudgetTier, customNotes, createdAt
}
```

### ContactMessage
```
{ _id, name, email, message, createdAt, isRead }
```

---

## 9. Core API Endpoints

```
Auth
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout

Destinations
GET    /api/destinations              -> list all (with filters/query params)
GET    /api/destinations/:id          -> single destination + places

Places
GET    /api/destinations/:id/places

Plans
GET    /api/destinations/:id/plan?budget=low|medium|high
POST   /api/plans/save                -> (auth required) save a plan
GET    /api/plans/my                  -> (auth required) get user's saved plans
DELETE /api/plans/:id                 -> (auth required) delete a saved plan

Admin (role: admin required)
POST   /api/admin/destinations
PUT    /api/admin/destinations/:id
DELETE /api/admin/destinations/:id
POST   /api/admin/places
PUT    /api/admin/places/:id
DELETE /api/admin/places/:id
POST   /api/admin/plan-templates
PUT    /api/admin/plan-templates/:id

Contact
POST   /api/contact
GET    /api/admin/contact-messages    -> (admin only)
```

---

## 10. Budget Logic (Core Differentiator)

Each `PlanTemplate` stores a per-tier cost breakdown. The Generated Plan Page:
1. Fetches the plan template for the selected destination
2. Reads the `budgetBreakdown` object
3. Renders a table: Stay / Food / Local Travel / Activities / **Total per day** and **Total for trip**
4. Switching the tab (Low/Medium/High) re-renders the numbers instantly via JS — no reload needed (fetch once, store in a JS variable, toggle display)

This keeps the "budget planner" feeling snappy and interactive even without a frontend framework.

---

## 11. Non-Functional Requirements

- **Responsive:** must work well on mobile (majority of travel searches are mobile)
- **Performance:** destination list should support pagination once data grows
- **Security:** passwords hashed with bcrypt, JWT stored in httpOnly cookie or localStorage with care, input validation on all forms (server-side, not just client-side)
- **Validation:** use a library like `express-validator` for backend input checks
- **Error handling:** centralized Express error-handling middleware, user-friendly error pages/messages on frontend

---

## 12. Suggested Folder Structure

```
tripcraft/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Destination.js
│   │   ├── Place.js
│   │   ├── PlanTemplate.js
│   │   ├── SavedPlan.js
│   │   └── ContactMessage.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── destinationRoutes.js
│   │   ├── planRoutes.js
│   │   ├── adminRoutes.js
│   │   └── contactRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── adminMiddleware.js
│   ├── controllers/
│   ├── config/db.js
│   ├── server.js
│   └── .env
├── frontend/
│   ├── index.html
│   ├── destinations.html
│   ├── destination-detail.html
│   ├── plan.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── profile.html
│   ├── contact.html
│   ├── about.html
│   ├── admin/
│   │   ├── admin-login.html
│   │   ├── admin-dashboard.html
│   │   ├── manage-destinations.html
│   │   ├── manage-places.html
│   │   ├── manage-plans.html
│   │   └── manage-users.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── api.js        (shared fetch helper)
│       ├── auth.js
│       ├── destinations.js
│       ├── plan.js
│       └── admin.js
└── README.md
```

---

## 13. Recommended Build Order (Milestones)

1. **Setup** — Express server, MongoDB connection, folder structure, `.env` config
2. **Auth system** — signup/login, JWT middleware, password hashing
3. **Destination CRUD (admin)** — add/edit/delete destinations + places via admin routes
4. **Public destination pages** — list + detail pages fetching real data
5. **Plan generation** — build the PlanTemplate model + budget tier logic + Generated Plan Page
6. **Save Plan feature** — user dashboard, saved plans CRUD
7. **Contact Us + Admin message viewer**
8. **Polish** — responsive CSS, loading states, error handling, empty states
9. **(Phase 2 stretch)** — reviews, PDF export, weather API, group planning

---

## 14. Success Criteria (Definition of Done for MVP)

- [ ] User can search/browse destinations without logging in
- [ ] User can view a destination's popular places and a generated plan
- [ ] User can toggle Low/Medium/High budget and see updated costs instantly
- [ ] User can sign up, log in, and save a plan
- [ ] Admin can log in and add/edit/delete destinations, places, and plan templates
- [ ] All pages are mobile-responsive
- [ ] Contact form submissions are viewable by admin

---

*End of PRD — ready to use as the build reference for TripCraft.*
