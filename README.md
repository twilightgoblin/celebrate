# Invite - Event Planning Platform

A modern event planning and celebration platform built with Next.js, featuring smooth animations, 3D graphics, and an intuitive user experience.

## Features

- **Smooth Scrolling**: Powered by Lenis for buttery-smooth scroll animations
- **3D Graphics**: Interactive visual effects using Three.js and React Three Fiber
- **Animated Gradients**: Custom gradient animations with the Grainient component
- **Responsive Design**: Fully responsive across all devices with Tailwind CSS
- **Modern UI Components**: Built with Radix UI and Lucide icons
- **Motion Animations**: Engaging animations using Motion library

## Tech Stack

- **Framework**: Next.js 16.1.6 with React 19
- **Styling**: Tailwind CSS 4.1
- **Animations**: Motion, Lenis smooth scrolling
- **3D Graphics**: Three.js, React Three Fiber, OGL
- **UI Components**: Radix UI, Lucide React icons
- **Testing**: Vitest with React Testing Library

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests once
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── contact/      # Contact page
│   ├── globals.css   # Global styles
│   ├── layout.js     # Root layout
│   └── page.js       # Home page
├── components/       # Reusable components
│   ├── CTA.jsx
│   ├── Footer.jsx
│   ├── Grainient.jsx
│   ├── Navbar.jsx
│   └── ui/           # UI components
├── pages/            # Page sections
│   ├── about.jsx
│   ├── hero.jsx
│   ├── process.jsx
│   ├── services.jsx
│   └── work.jsx
└── lib/              # Utility functions
```

## Deploy on Vercel

Deploy easily using the [Vercel Platform](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/invite)

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---------