# Cognita – Code Review & Progress Tracker

A student-style React web application for code review simulation and progress tracking.

## Features

- Code input textarea with validation
- Simulated code review logic using JavaScript keyword checks
- Score, strengths, and suggestions generated on demand
- Progress page with total reviews and average score
- Local storage persistence for review history
- React Router navigation between Home and Progress pages
- Dark / Light mode toggle with a tech-savvy UI
- Tailwind CSS styling with glowing blue accent buttons

## Project Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

- `src/App.jsx` — main app layout and routing
- `src/components/CodeInput.jsx` — code editor and review action
- `src/components/ReviewResult.jsx` — displays simulated review output
- `src/components/ProgressTracker.jsx` — shows review history and averages
- `src/ThemeContext.jsx` — theme state and local storage persistence

## Notes

No backend or external AI API is used. All review logic is handled in-browser with React state and simulated async behavior.
