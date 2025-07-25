# Stephanie's React Learning App

For over six years, I've been working with Angular professionally. It's quite obvious that it would be beneficial for me to know some React as well.

This is a copy of the (Real World)[https://github.com/gothinkster/realworld] example app that I'm building to learn React. I'm building it with Copilot turned off, so that I actually learn :).

Instead of using the Real World repo, I built this from scratch, scaffolding the app using the (Vite React + TypeScript template)[https://vite.dev/guide/#scaffolding-your-first-vite-project].

## Tech Stack decisions

- Use React Router in declarative mode to facilitate overlay modals with their own routes.
- Radix UI for UI components.
- Use CSS Modules and Sass for styling. (I actually like writing CSS).

## UX/Design Deviations

## UX

- Make it clear what "popular tags" actually do -- clarify that they are interactive with visual cues and a better label ("Show articles about"). Tags are also now multi-select.
- "Show articles about" filters results in place -- no need for a new "feed".
- Sign in and Sign up are now in modal overlays, not separate pages.

### Visual Design

- Green color isn't accessible, let's change it to something more accessible.
- Implement multi-toned color palette.
- Style articles as cards with...better styling and a fallback icon since the API icons have a CORS issue.
