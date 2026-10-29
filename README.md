# MOTOVERA — Ride Beyond Limits

MOTOVERA is a responsive motorcycle brand experience built around a high-performance superbike. Explore the bike, learn about its technology, and configure its appearance in an interactive 3D showroom.

## Live Demo

[View MOTOVERA live](https://motovera-ride-beyond-limits.vercel.app)

## Features

- **Immersive landing page** with animated sections, product highlights, and a motorcycle gallery.
- **Interactive 3D configurator** with selectable paint, wheel, seat, and accent colors, plus studio, performance, and detail viewing modes.
- **Technology and gallery pages** featuring motorcycle details, specifications, and image browsing.
- **Test-ride booking and contact forms** with client-side validation.
- **Responsive navigation** with a mobile menu, account modal, and light/dark theme toggle.
- **Motion and usability details**, including smooth scrolling, page transitions, loading animation, and reduced-motion support.
- **Custom MOTOVERA browser-tab icon**.

## Technologies

- **React 19** for the component-based interface
- **Vite 8** for development and production builds
- **Tailwind CSS 3** for styling
- **Three.js**, **React Three Fiber**, and **Drei** for 3D rendering
- **Framer Motion** for interface animation
- **React Router** for page navigation
- **React Hook Form** and **Zod** for form handling and validation
- **Lenis**, **Lucide React**, and **Sonner** for smooth scrolling, icons, and notifications

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AhmedRaza2007/MOTOVERA-Ride-Beyond-Limits.git
   cd MOTOVERA-Ride-Beyond-Limits
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   Open the local URL printed by Vite (typically `http://localhost:5173`).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Vite development server |
| `npm run build` | Create the optimized production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## Deployment

The app is deployed on [Vercel](https://motovera-ride-beyond-limits.vercel.app). To deploy your own copy, import this repository into Vercel and use the Vite defaults:

- **Build command:** `npm run build`
- **Output directory:** `dist`

## Project Structure

```text
public/       Static assets, favicon, and 3D model
src/
  components/ Shared UI components
  data/       Product, feature, gallery, and specification data
  hooks/      Reusable React hooks
  pages/      Home, experience, technology/gallery, and contact pages
  utils/      Shared constants and validation schemas
```

## License

No license is currently specified for this repository. Contact the repository owner before redistributing or reusing the project.
