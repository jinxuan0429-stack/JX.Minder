# my-blog Web Product Design & Implementation Guide

- Export date: 2026-02-03
- Goal: Convert the current website into a clear, execution-ready product design and implementation spec.
- Code baseline: `app/page.tsx`, `app/navigation/page.tsx`, `app/eloqwnt/page.tsx`, `app/content/**`, `lib/posts.ts`
- Stack: Next.js App Router + React + TypeScript + Tailwind CSS + Framer Motion + Spline

---

## 1. Product Positioning and Scope

### 1.1 Product Positioning
This project works as an immersive creative content site:
1. A cinematic 3D entry point builds strong first impression.
2. A portal page distributes users to content categories.
3. A brand showcase page demonstrates motion and interaction quality.
4. A content area expands into learning, articles, and game-related modules.

### 1.2 Current Implemented Scope
- `/`: 3D entry page with slider-triggered navigation to `/navigation`
- `/navigation`: portal page with content blocks and embedded 3D sections
- `/eloqwnt`: high-interaction brand showcase page
- `/content/learn`: structured learning/workshop page
- `/content/articles/[slug]`: markdown article rendering

### 1.3 Current Gaps
- `/content/games` is empty
- `/content`, `/content/studio`, `/content/articles` are placeholders
- Search, newsletter, and many CTA buttons are UI-only (no business logic yet)

---

## 2. Information Architecture and User Flow

### 2.1 Route Map

```text
/
?? 3D scene + slider threshold trigger
?? /navigation
   ?? Navigation links and search shell
   ?? Broadcast hero (external Spline iframe)
   ?? Fashion/story card cluster (local Spline iframe)
   ?? Editor note + ad block + newsletter shell

/eloqwnt
?? Hero + sticky bar
?? Featured cases
?? Creative Lab (drop animation)
?? Services + Studio section
?? Final CTA

/content
?? /content/learn (most complete content module)
?? /content/studio (placeholder)
?? /content/games (empty)
?? /content/articles/[slug] (markdown article detail)
```

### 2.2 Primary User Journey
1. User lands on `/` and sees immersive loading + interactive slider.
2. Slider crosses threshold and triggers transition to `/navigation`.
3. User explores categories and featured content.
4. User continues to brand showcase (`/eloqwnt`) or knowledge content (`/content/learn`, article detail).

---

## 3. Visual and Interaction System

### 3.1 Typography
- Primary UI body: `Space Grotesk`
- Editorial/brand heading: `Fraunces`
- Technical/meta text: `Space Mono`
- Workshop page identity: `Bricolage Grotesque`

Implementation method:
- Use `next/font/google` at page level and bind class names to sections.
- Keep typography role-based (headline/body/meta) and consistent across routes.

### 3.2 Color System (recommend tokenization)
Current pages use hard-coded colors. Convert to CSS variables:
- Base background: `#f2efe9`
- Primary text: `#141414` / `#151515`
- Secondary text: `#8a7f73` / `#6b645c`
- Light card: `#fbfaf7`
- Dark accent block: `#101010`
- Deep workshop background: `#0b0f12`

### 3.3 Motion Language
- Reveal-in (opacity + translate + blur)
- Line-by-line headline reveal
- Scroll-based parallax via CSS variable
- Magnetic hover for CTA/buttons
- Marquee strip
- Drop-in animation for lab cards

Implementation strategy:
- CSS transitions/keyframes for lightweight loops and reveal effects
- React state and class toggles for interaction states
- Framer Motion for route transition and cinematic overlays

### 3.4 Layout Rules
- Max content width: `1200px`
- Full-bleed hero where needed using viewport breakout technique
- Card radii: roughly `28px` to `40px`
- Shadow hierarchy: light / medium / heavy

---

## 4. Feature Matrix

| Feature ID | Feature | Route | Status | Core File |
|---|---|---|---|---|
| F-01 | Spline entry scene load | `/` | Done | `app/page.tsx` |
| F-02 | Slider threshold navigation | `/` | Done | `app/page.tsx` |
| F-03 | Offline + long-load guard | `/` | Done | `app/page.tsx` |
| F-04 | Transition overlay | `/` | Done | `app/page.tsx` |
| F-05 | Portal 3D sections | `/navigation` | Done | `app/navigation/page.tsx` |
| F-06 | Reveal animation framework | `/navigation`,`/eloqwnt` | Done | page-level global styles |
| F-07 | Scroll-direction sticky bar | `/eloqwnt` | Done | `app/eloqwnt/page.tsx` |
| F-08 | Hero frame expand/collapse | `/eloqwnt` | Done | `app/eloqwnt/page.tsx` |
| F-09 | Magnetic hover controls | `/eloqwnt` | Done | `app/eloqwnt/page.tsx` |
| F-10 | Parallax system | `/eloqwnt` | Done | `app/eloqwnt/page.tsx` |
| F-11 | Creative Lab drop-in sequence | `/eloqwnt` | Done | `app/eloqwnt/page.tsx` |
| F-12 | Markdown article pipeline | `/content/articles/[slug]` | Done | `lib/posts.ts` + route page |
| F-13 | Search workflow | `/navigation` | Placeholder | `app/navigation/page.tsx` |
| F-14 | Newsletter workflow | `/navigation` | Placeholder | `app/navigation/page.tsx` |
| F-15 | Games hub | `/content/games` | Missing | `app/content/games/page.tsx` |

---

## 5. Detailed Feature Implementation Guide

## 5.1 F-01 Spline Entry Scene (`/`)

Objective:
- Provide strong first-contact brand impact.

Current implementation:
1. Render scene with `@splinetool/react-spline`.
2. Set `isSplineReady` in `onLoad` callback.
3. Show animated loading overlay until ready.

Key states:
- `isSplineReady`, `isOnline`, `loadingTooLong`

Reusable pattern:
```tsx
const [isReady, setIsReady] = useState(false);
<Spline scene="..." onLoad={() => setIsReady(true)} />
{!isReady && <LoadingOverlay />}
```

Recommended upgrade:
- Add retry button on scene-load failure with exponential backoff.

---

## 5.2 F-02 Slider Threshold Navigation (`/`)

Objective:
- Replace ordinary click-entry with tactile interaction.

Current implementation:
1. Check slider position on `onMouseMove` and `onMouseUp`.
2. Throttle checks with `CHECK_INTERVAL_MS`.
3. Find object by name via `findObjectByName`.
4. Trigger once when X position crosses threshold.
5. Play transition, then navigate to `/navigation` after delay.

Risk:
- Relies on exact Spline object name.

Recommended upgrade:
- Implement candidate-name fallback logic and analytics event when fallback used.

---

## 5.3 F-03 Offline and Long-Load Messaging (`/`)

Current implementation:
- Read `navigator.onLine`.
- Listen to `online/offline` events.
- Set timeout guard (`LOADING_TIMEOUT_MS = 12000`) for user feedback.

Recommended upgrade:
- Wrap in `useNetworkStatus()` hook.
- Add telemetry on timeout frequency.

---

## 5.4 F-04 Entry Transition Layer (`/`)

Current implementation:
- `isNavigating` triggers:
  - scene fade + scale + blur
  - full-screen black overlay
  - center line expansion + transition label

Recommended upgrade:
- Use finite state machine (`idle -> preparing -> navigating -> done`) for cleaner transition logic.

---

## 5.5 F-05 Portal Layout and 3D Modules (`/navigation`)

Modules:
1. Header nav and search shell
2. Broadcast hero with external Spline iframe
3. Fashion/story card cluster with local Spline iframe
4. Editor list + ad module + newsletter shell

Current implementation:
- Data-driven rendering from arrays (`NAV_LINKS`, `FEATURE_CHIPS`, `FEATURE_LIST`).
- Mixed embedded sources (remote Spline + local static viewer).

Recommended upgrade:
- Move content arrays into JSON/CMS.
- Build responsive iframe wrapper with explicit aspect ratio handling.

---

## 5.6 F-06 Reveal Animation Framework (`/navigation`, `/eloqwnt`)

Current approaches:
- `/navigation`: time-based reveal using `animation-delay`
- `/eloqwnt`: viewport-based reveal using `IntersectionObserver`

Guideline:
- Use observer-driven reveal for scroll-heavy pages.
- Use static delay reveal for short hero-first pages.

---

## 5.7 F-07 Sticky Bar via Scroll Direction (`/eloqwnt`)

Behavior:
- Hidden while hero is active.
- After hero: show on upward scroll, hide on downward scroll.
- Keep hidden near top threshold.

Current implementation:
1. `heroRef` observed by `IntersectionObserver`.
2. Compare current Y vs `lastScrollRef` in scroll listener.
3. Toggle `showSticky` and class state.

Recommended upgrade:
- Use `requestAnimationFrame` batching for scroll work.

---

## 5.8 F-08 Hero Frame Expand/Collapse (`/eloqwnt`)

Objective:
- Start as full-screen immersive frame, then condense into structured layout.

Current implementation:
- `frameExpanded` toggles by scroll thresholds.
- CSS custom props control gutters and nav spacing.
- `.hero-page.is-expanded .hero-frame` removes border and radius.

Recommended upgrade:
- Replace hard threshold with interpolated motion for smoother feel.

---

## 5.9 F-09 Magnetic Hover (`/eloqwnt`)

Current implementation:
- Bind `pointermove`/`pointerleave` to `[data-magnetic]` elements.
- Translate element based on pointer offset from center.

Important improvement:
- Add event listener cleanup in effect teardown to avoid listener accumulation after remount.

Suggested pattern:
```tsx
useEffect(() => {
  const els = [...document.querySelectorAll('[data-magnetic]')];
  const cleanups = els.map((el) => {
    const onMove = (e: PointerEvent) => { /* compute translate */ };
    const onLeave = () => { /* reset transform */ };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  });
  return () => cleanups.forEach((fn) => fn());
}, []);
```

---

## 5.10 F-10 Scroll Parallax (`/eloqwnt`)

Current implementation:
1. On scroll, set `--scroll-y` on root.
2. Any `[data-parallax]` element uses formula-based transform.

Why it works well:
- One shared variable drives many elements with low coupling.

Recommended upgrade:
- Reduce parallax intensity on low-power devices and small screens.

---

## 5.11 F-11 Creative Lab Drop Animation (`/eloqwnt`)

Current implementation:
- Define card positions in array (`left`, `top`, `rotate`).
- Trigger `drop-in` keyframes when section enters visible state.
- Stagger through per-card `--drop-delay`.

Recommended upgrade:
- Add micro-shadow and settle bounce variation for richer material feel.

---

## 5.12 F-12 Data-Driven Card Rendering (multi-route)

Current implementation:
- Most lists are rendered through array `.map()`.

Standardization recommendation:
- Extract common interfaces and central content schema.

```ts
interface FeatureCard {
  id: string;
  title: string;
  category?: string;
  date?: string;
  image?: string;
  href?: string;
}
```

---

## 5.13 F-13 Markdown Article Pipeline (`/content/articles/[slug]`)

Current implementation:
1. Read markdown files from `content/articles`.
2. Parse frontmatter with `gray-matter`.
3. Convert markdown to HTML via `remark` + `remark-html`.
4. Render in detail page with `dangerouslySetInnerHTML`.

Current strengths:
- Clear slug-based routing
- Basic metadata extraction
- 404 fallback via `notFound()`

Recommended upgrade:
- Sanitize generated HTML before rendering.
- Expand frontmatter schema (`summary`, `tags`, `cover`, `updatedAt`).

---

## 5.14 F-14 Learning Workshop (`/content/learn`)

Structure:
- Hero value proposition + CTA
- AI console module cards
- Four-step build path
- Game recipe cards
- Remix zone + sidecar assistant section

Current implementation:
- Static arrays + strong visual layering (gradients, grid mask, floating blobs)
- Hover and shimmer effects for interaction depth

Recommended upgrade:
- Connect "today guide" block to live data source.
- Persist user progress (local storage or user profile).

---

## 5.15 F-15 Placeholder Feature Delivery Plan

### A) Search (`/navigation`)
Implementation steps:
1. Build search index from markdown + project metadata.
2. Add `GET /api/search` endpoint.
3. Debounced input on client (250ms).
4. Grouped results with keyword highlighting.

### B) Newsletter (`/navigation`)
Implementation steps:
1. Validate email and prevent duplicate submits.
2. Add `POST /api/newsletter` endpoint.
3. Integrate provider with double opt-in.
4. Add success/error state and analytics event.

### C) Contact CTA conversion
Implementation steps:
1. Add `/contact` route with lead form.
2. Add `POST /api/contact` endpoint.
3. Persist leads and send team notifications.

---

## 6. Content and Data Model Recommendations

### 6.1 Article Frontmatter

```yaml
title: "Article title"
date: "2026-02-03"
updatedAt: "2026-02-10"
summary: "One-line abstract"
tags: ["design", "3d", "interaction"]
cover: "/images/posts/xxx.jpg"
author: "JX.Minder"
```

### 6.2 Case Card Model

```ts
interface CaseItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'brand' | 'commerce' | 'editorial' | 'lab';
  thumbnail: string;
  stack: string[];
  ctaLabel: string;
  href: string;
}
```

### 6.3 Suggested Analytics Events
- `landing_loaded`
- `slider_threshold_reached`
- `navigation_entered`
- `hero_cta_clicked`
- `newsletter_submitted`
- `contact_form_submitted`

---

## 7. Non-Functional Requirements

### 7.1 Performance
- Offer lighter Spline scenes for mobile.
- Minimize React state updates in scroll handlers.
- Lazy-load heavy media assets.

### 7.2 Accessibility
- Ensure icon-only controls have accessible labels.
- Add explicit labels for form inputs.
- Respect `prefers-reduced-motion`.
- Keep text contrast at WCAG AA or higher.

### 7.3 SEO
- Add route-level metadata for all primary pages.
- Add JSON-LD for article pages.

### 7.4 Security
- Sanitize HTML from markdown pipeline.
- Validate and rate-limit API inputs.

---

## 8. Recommended API Contracts

### 8.1 Search API

```http
GET /api/search?q=spline&type=article,case&limit=10
```

Response example:
```json
{
  "items": [
    {
      "id": "a1",
      "type": "article",
      "title": "...",
      "href": "/content/articles/xxx",
      "snippet": "..."
    }
  ],
  "total": 1
}
```

### 8.2 Newsletter API

```http
POST /api/newsletter
Content-Type: application/json

{"email":"user@example.com","source":"navigation_newsletter"}
```

### 8.3 Contact API

```http
POST /api/contact
Content-Type: application/json

{
  "name":"Alex",
  "email":"alex@example.com",
  "budget":"10k-30k",
  "message":"Need an immersive campaign site"
}
```

---

## 9. QA and Acceptance Checklist

### 9.1 Critical Journey Acceptance
1. `/` scene loads and gives clear offline/slow-network feedback.
2. Slider threshold triggers exactly one navigation event.
3. `/navigation` embedded iframes render correctly on desktop and mobile.
4. `/eloqwnt` sticky bar behavior follows scroll direction rules.
5. `/content/articles/[slug]` renders markdown and handles not-found cases.

### 9.2 Suggested Test Layers
- Unit: threshold logic, input validation, query parser
- Integration: markdown read/parse/render pipeline
- E2E: `/` -> `/navigation` primary entry path

---

## 10. Delivery Milestones

### Phase 1 (1-2 weeks)
- Ship Search, Newsletter, Contact APIs
- Build baseline `/content/games`
- Move static card data into content config files

### Phase 2 (2-4 weeks)
- Componentize `/eloqwnt` sections
- Add reduced-motion fallback paths
- Complete metadata, event tracking, and accessibility pass

### Phase 3 (ongoing)
- Integrate CMS
- Establish publish workflow for articles/cases/events
- Add user profile features (bookmarks, progress, subscription center)

---

## 11. File Responsibility Map

- `app/page.tsx`: 3D entry, slider trigger, transition states
- `app/navigation/page.tsx`: portal layout and featured content sections
- `app/eloqwnt/page.tsx`: scroll-driven brand interaction page
- `app/content/learn/page.tsx`: workshop module template
- `app/content/articles/[slug]/page.tsx`: article detail rendering
- `lib/posts.ts`: markdown reading and conversion pipeline

---

## 12. Executive Conclusion

The project already has a strong experiential shell (visual identity + motion + interactive entry). The next high-value step is to connect placeholder UI blocks to real product workflows (search, subscription, contact, games), then normalize interaction patterns into reusable components and design tokens for scale.
