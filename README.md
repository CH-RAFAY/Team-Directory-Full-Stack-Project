# Team Directory Full-Stack Project

Full-stack take-home project that exposes a ColdFusion REST API and a React front-end to display a team directory with basic search.

## Tech stack

- Back-end: ColdFusion CFC REST service
- Database: Any relational database with the provided SQL script
- Front-end: React with Vite

## Project structure

- [backend/EmployeeService.cfc](file:///c:/Users/rafay/OneDrive/Desktop/Team-Directory-Full-Stack-Project/backend/EmployeeService.cfc): ColdFusion REST API
- [db/employees.sql](file:///c:/Users/rafay/OneDrive/Desktop/Team-Directory-Full-Stack-Project/db/employees.sql): Table definition and seed data
- [src](file:///c:/Users/rafay/OneDrive/Desktop/Team-Directory-Full-Stack-Project/src): React application source

## 1. Database setup

1. Create a new database in your preferred RDBMS.
2. Run the script [db/employees.sql](file:///c:/Users/rafay/OneDrive/Desktop/Team-Directory-Full-Stack-Project/db/employees.sql) to create the `Employees` table and insert sample rows.
3. In your ColdFusion Administrator, create a datasource named `TeamDirectoryDSN` pointing to this database.

The ColdFusion code assumes this datasource name. If you use a different one, update the `datasource` attribute in [EmployeeService.cfc](file:///c:/Users/rafay/OneDrive/Desktop/Team-Directory-Full-Stack-Project/backend/EmployeeService.cfc#L9-L28).

## 2. ColdFusion REST API setup

1. Copy the [backend](file:///c:/Users/rafay/OneDrive/Desktop/Team-Directory-Full-Stack-Project/backend) folder into a location under your ColdFusion webroot, or create a mapping that points to it.
2. In ColdFusion Administrator, register a REST application:
   - REST path: physical path to the `backend` folder
   - Application name: `teamDirectoryApi`
3. Verify that ColdFusion has scanned and registered `EmployeeService.cfc` as a REST resource.

After registration, the main endpoints are:

- `GET /rest/teamDirectoryApi/employees` returns all employees as JSON
- `GET /rest/teamDirectoryApi/employees/{id}` returns details for a single employee

The service returns data in the format:

```json
[
  {
    "id": 1,
    "firstName": "Alice",
    "lastName": "Johnson",
    "role": "Software Engineer"
  }
]
```

### CORS configuration

The CFC sets CORS headers to allow requests from a local Vite dev server at `http://localhost:5173`. If your front-end runs on a different origin, update the `Access-Control-Allow-Origin` header values in [EmployeeService.cfc](file:///c:/Users/rafay/OneDrive/Desktop/Team-Directory-Full-Stack-Project/backend/EmployeeService.cfc#L5-L7).

### Security

- Database access uses a named datasource and a parameterized query with `<cfqueryparam>` in `getEmployeeById` to prevent SQL injection.
- All JSON is returned as plain ColdFusion data structures and serialized by the REST engine.

## 3. React front-end setup

Requirements:

- Node.js 18 or later
- npm, pnpm, or Yarn

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

By default Vite serves the app at `http://localhost:5173`.

If your ColdFusion server runs on a different host, port, or REST application name, update the API base URL in [src/config.js](file:///c:/Users/rafay/OneDrive/Desktop/Team-Directory-Full-Stack-Project/src/config.js).

## 4. Application behavior

- On load, the React app calls `GET /rest/teamDirectoryApi/employees` and stores the results in state.
- The directory is rendered as a responsive table showing ID, first name, last name, and role.
- A search input filters the in-memory data by first name, last name, or role using case-insensitive matching.
- Loading and error states are displayed to the user if the API is slow or unavailable.

The key React hooks used are:

- `useEffect` in [App.jsx](file:///c:/Users/rafay/OneDrive/Desktop/Team-Directory-Full-Stack-Project/src/App.jsx#L6-L42) to fetch data from the API when the component mounts.
- `useState` and `useMemo` in [App.jsx](file:///c:/Users/rafay/OneDrive/Desktop/Team-Directory-Full-Stack-Project/src/App.jsx#L6-L42) to manage the data set and search term.

## 5. Recording the demo video

To create the requested short walkthrough video:

- Start your ColdFusion server and REST application.
- Start the React dev server with `npm run dev`.
- Open the app in a browser, load the directory, and demonstrate the search bar.
- Briefly describe the modules:
  - ColdFusion REST API in `backend/EmployeeService.cfc`
  - React UI in `src/App.jsx`
  - Database script in `db/employees.sql`
