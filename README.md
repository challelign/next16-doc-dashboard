# Next.js App Router Course – Starter

This repository is the official starter template for the **Next.js App Router Course**.  
It demonstrates all core concepts of the App Router including:

- File-based routing
- Route groups & nested routes
- Layouts & templates
- Loading states
- Error boundaries
- 404 handling
- Server vs Client components
- Data fetching on the server

For more details, see the official curriculum:  
👉 https://nextjs.org/learn

---

# 📚 App Router Concepts — Complete Guide

The Next.js **App Router** introduces a modern and powerful model for building React applications using the `app/` directory.  
Each file inside `app/` influences routing or UI behavior.

---

## 1️⃣ `page.js` — Route Entry Point

A `page.js` defines UI for a route.

### ✔ Key Behavior

- Represents a unique URL
- Server Component by default
- Performs async data fetching

### 📁 Example Structure

app/dashboard/page.js

### 🧩 Example

```tsx
export default function Page() {
  return <h1>Dashboard</h1>;
}

🧠 When to Use

Use page.js when defining a route such as:

/dashboard

/products/[id]

/settings/security

📦 Scope

page.js is wrapped by:

nearest layout.js

nearest template.js

nearest loading.js

nearest error.js

🏷 Common Use Cases

List/detail pages

Dashboards

Search pages

2️⃣ layout.js — Persistent Layout Wrapper

A layout.js wraps a route segment and persists across navigation.

✔ Key Characteristics

Does not remount on navigation

Preserves state

Server Component by default

📁 Example Structure
app/dashboard/layout.js

🧩 Example
export default function Layout({ children }) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

🧠 When to Use

Use for shared UI that shouldn't reset, such as:

Navigation bars

Sidebars

Footers

Auth shells

📦 Scope Wraps

page.js

template.js

loading.js

error.js

not-found.js

🏷 Use Cases

Dashboard shells

Marketing pages

Global navigation

3️⃣ template.js — Layout That Resets State

Similar to layout.js but remounts on every navigation.

📁 Example Structure
app/forms/template.js

🧩 Example
export default function Template({ children }) {
  return <div className="form-wrapper">{children}</div>;
}

🧠 When to Use

Use when UI should reset on navigation:

Forms

Wizards

Step-based flows

Animated transitions

📦 Scope

Wraps only:

page.js

Does not apply to:

loading.js

error.js

not-found.js

4️⃣ loading.js — Loading State UI

Displayed while a route segment is waiting for data.

📁 Example Structure
app/dashboard/loading.js

🧩 Example
export default function Loading() {
  return <p>Loading dashboard...</p>;
}

🧠 When to Use

Used for async data fetching scenarios.

📦 Scope Works During

Server rendering

Client navigation

Suspense boundaries

🏷 Use Cases

Skeleton UI

Spinners

Placeholders

5️⃣ error.js — Route Error Boundary

A React Error Boundary scoped to a specific segment.

📁 Example Structure
app/dashboard/error.js

🧩 Example
"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}


Must be a Client Component ("use client";)

🧠 When to Use

Useful when route depends on:

Database calls

APIs

Unstable logic

📦 Scope Catches

Rendering errors

Async runtime errors

Server & Client errors

Does not catch:

notFound()

redirect()

6️⃣ global-error.js — Application-wide Fallback

Used as last-resort crash handler.

🧩 Example
"use client";

export default function GlobalError({ error }) {
  return <h2>Something went wrong globally: {error.message}</h2>;
}

🧠 When to Use

In production apps to prevent total crash.

7️⃣ notFound() & not-found.js — 404 Behavior

notFound() intentionally triggers a 404 state.

🧩 Example
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const item = await fetchItem(params.id);

  if (!item) {
    notFound();
  }

  return <Item item={item} />;
}

Matching not-found.js
app/items/[id]/not-found.js

export default function NotFound() {
  return <h1>Item not found</h1>;
}

🧠 When to Use

Use for:

Missing records

Invalid params

Private items

📁 Recommended Folder Structure (Best Practice)
app/
 ├─ layout.js
 ├─ page.js
 ├─ error.js
 ├─ global-error.js
 ├─ loading.js
 ├─ not-found.js
 └─ dashboard/
     ├─ layout.js
     ├─ page.js
     ├─ loading.js
     ├─ error.js
     └─ [id]/
         ├─ page.js
         ├─ not-found.js
         └─ error.js

🧭 When to Use What (Quick Matrix)
Concept	Purpose	Persists	Scope
page.js	Defines UI route	❌	Single segment
layout.js	Shared UI wrapper	✅	Segment + children
template.js	Resettable wrapper	❌	Segment only
loading.js	Show fallback UI	N/A	Loading state
error.js	Catch route errors	N/A	Segment + children
global-error.js	Crash fallback	N/A	Entire app
notFound()	Trigger 404	N/A	Triggers 404 UI
```
