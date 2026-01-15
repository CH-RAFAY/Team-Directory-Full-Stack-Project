Team Directory — Files and Presentation Notes

Purpose
- This document explains what each file/module in the repository does and how to run the project reliably for a presentation.

Quick run (presentation-ready)
1. Install dependencies (run once):

```bash
npm install
```

2. Start both backend and frontend in one terminal:

```bash
# Windows (cmd.exe)
set PORT=8502 && npm run dev:all

# Or PowerShell
$env:PORT=8502; npm run dev:all
```

This uses `concurrently` to start the Node API server (`npm run server`) and the Vite dev server (`npm run dev`).

3. Open the frontend in a browser:

http://localhost:3000/

4. API endpoint (default):

http://localhost:8502/api/employees_alternative.cfc?method=getEmployees

(You can change the API URL used by the React app via the `VITE_API_URL` environment variable.)

Files and what they do

- `package.json` — npm project manifest and scripts. Key scripts:
  - `npm run dev` — starts the Vite dev server (frontend).
  - `npm run server` / `npm start` — starts the Node API server (server.cjs).
  - `npm run dev:all` — starts both `server` and `dev` using `concurrently`.

- `server.cjs` — Small Express-based API wrapper that exposes two routes used by the app (`/api/employees.cfc` and `/api/employees_alternative.cfc`) and a `/api/health` endpoint.
  - Uses `process.env.PORT || 8501` so you can set `PORT` before starting the server.

- `api/` — ColdFusion components (CFML) that implement the original REST endpoints (for CF servers):
  - `employees.cfc` — REST CF component that returns JSON from a configured `teamDirectory` datasource.
  - `employees_alternative.cfc` — Alternative CF component that serializes query results to JSON and sets CORS headers.

- `database/` — Scripts and SQL for the SQLite DB
  - `setup.sql` — Creates `Employees` table and inserts sample records.
  - `init_database.js`, `init_database.py`, `init_database.cfm` — helper scripts to create `database/team_directory.db` when needed.

- `src/` — React frontend
  - `App.jsx` — Main React component. Responsibilities:
    - Fetches employee data from the API using `fetch()`.
    - Uses `useEffect`/`useState` for data, loading, error and search state.
    - Implements a search input that filters employees by first name (starts-with, case-insensitive). If you prefer broader behavior (first/last/role), see notes below.
  - `main.jsx` — Vite/React entry point.
  - `App.css` and `index.css` — Styling for the interface.

- `scripts/test-search.js` — Small Node script used during development to verify search behavior against sample data.

- `README.md` — Original README with general setup instructions and troubleshooting.
- `README_PRESENTATION.md` — This file: concise, presentation-focused file list and run instructions.

Search behavior note
- The UI search currently filters by first name only, using `startsWith` (case-insensitive). This matches the request to show names that start with the typed character(s) (e.g., typing `S` shows `Sana`, not names that merely contain `s`).
- To change to a broader search (first/last/role, substring matching), modify `src/App.jsx`'s filter logic in the second `useEffect`.

Making the app reliably run on any machine
- Ensure Node.js (16+) is installed and `npm install` is run once.
- The frontend reads the API base URL from the Vite env variable `VITE_API_URL`. For example:

```bash
# Start frontend using a remote API
VITE_API_URL=http://api.example.com/api/employees_alternative.cfc?method=getEmployees npm run dev
```

- If you use the Node wrapper (`server.cjs`) during the presentation, start both servers with `npm run dev:all` after setting `PORT`.

CF server notes
- The `api/` folder contains ColdFusion components. If you deploy them to an Adobe ColdFusion or Lucee server, ensure the `teamDirectory` datasource is configured to point at `database/team_directory.db` (or update the CF components to use a full JDBC path).
- CORS headers are set in the CF functions so the React app can fetch from a different origin.

Presentation tips
- Start with `npm install` (if needed).
- Run `set PORT=8502 && npm run dev:all` (or PowerShell variant). Show the console output where Vite reports `Local: http://localhost:3000/` and the Node server prints the API URL.
- Open the site at `http://localhost:3000/`. Demonstrate typing `S` — only `Sana` should appear (first-name starts-with behavior).
- Show `database/setup.sql` to explain the DB structure and sample records.

If you want, I can:
- Update `src/App.jsx` to make the search mode configurable (toggle between `first-name only` and `full search`).
- Add a small `present` npm script that launches both servers and opens the browser automatically.

Good luck with your presentation — tell me which of the optional follow-ups you'd like me to add and I'll implement them quickly.
