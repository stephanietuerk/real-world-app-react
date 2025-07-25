# Stephanie's React Learning App

After 6+ years of working professionally in Angular, I'm learning React by rebuilding the [Real World](https://github.com/gothinkster/realworld) demo app. I'm building from scratch (not cloning the starter repo, Copilot turned off) to maximize learning :).

Current status of app: In progress.

## Tech Stack decisions

My approach is to try to keep libraries rather low-level, to focus on learning fundamentals. At the same time, I'm not using this project to work on skills outside of React (for example, building accessible UI components), so I'm happy to use libraries for those types of functionalities.

- Vite + Typescript - scaffolded from the [Vite React + TypeScript template](https://vite.dev/guide/#scaffolding-your-first-vite-project).
- React Router in declarative mode to facilitate overlay modals with their own routes.
- Radix UI for unstyled UI components.
- CSS Modules and Sass for styling. (I actually like writing CSS).

## UX/Design Modifications

The Real World app has a lot of "back of frontend" features to implement, but the user experience [is a bit clunky](https://demo.realworld.build/#/). I'm making some UX and design changes to make it more usable and create better information hierarchy.

### UX

- Make it clear what "popular tags" actually do -- clarify that they are interactive with visual cues and a better label ("Show articles about"). Tags are also now multi-select.
- "Show articles about" (fka "popular tags") filters results in place -- no need for a new "feed".
- Sign in and Sign up are now in modal overlays, not separate pages.

### Visual Design

- Green color isn't accessible, let's change it to something more accessible.
- Implement multi-toned color palette to improve visual hierarchy.
- Style articles as cards and provide a fallback user icon since the user avatar images from the API have a CORS issue.
