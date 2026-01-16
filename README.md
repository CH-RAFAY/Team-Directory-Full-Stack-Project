# Team Directory Application

This is a full-stack web application that shows a team directory. It pulls employee information from a SQLite database through a ColdFusion REST API and displays everything in a React interface.

## What's Inside

The project has three main parts:
- React frontend that shows the employee directory
- ColdFusion backend API that serves the data
- SQLite database that stores employee records

## Project Structure

```
team-directory/
├── src/                    React frontend files
│   ├── App.jsx            Main component
│   ├── App.css            Styles
│   ├── main.jsx           Entry point
│   └── index.css          Global styles
├── api/                   ColdFusion backend
│   ├── employees.cfc      Main API component
│   └── employees_alternative.cfc  Alternative version
├── database/              Database files
│   ├── setup.sql          SQL script
│   ├── init_database.js   Node.js setup script
│   ├── init_database.py   Python setup script
│   ├── init_database.cfm  ColdFusion setup script
│   └── team_directory.db  Database file (created after setup)
├── package.json           Dependencies
├── vite.config.js         Vite config
├── index.html             HTML entry
└── README.md              This file
```

## Features

- React frontend built with Vite
- Uses React Hooks (useState, useEffect)
- ColdFusion REST API endpoint
- SQLite database with sample data
- CORS headers configured
- Search to filter employees by name or role
- Responsive design
- Error handling and loading states

## What You Need

**Frontend:**
- Node.js version 16 or higher
- npm or yarn

**Backend:**
- ColdFusion Server (Adobe ColdFusion or Lucee)
- SQLite JDBC driver or configured datasource

## Getting Started

### Step 1: Set Up the Database

You have a few options to create the database:

**Option 1: Python (easiest)**
```bash
python database/init_database.py
```

**Option 2: Node.js**
```bash
npm install sqlite3
node database/init_database.js
```

**Option 3: SQLite command line**
```bash
sqlite3 database/team_directory.db < database/setup.sql
```

**Option 4: ColdFusion**
1. Put `database/init_database.cfm` in your ColdFusion web root
2. Open it in browser: `http://localhost:8500/database/init_database.cfm`
3. Make sure SQLite JDBC driver is set up

### Step 2: Configure ColdFusion Datasource

**For Adobe ColdFusion:**
1. Open ColdFusion Administrator
2. Go to Data & Services → Datasources
3. Create new datasource:
   - Name: `teamDirectory`
   - Driver: SQLite (or JDBC)
   - Database File: Full path to `database/team_directory.db`
   - JDBC URL: `jdbc:sqlite:/path/to/database/team_directory.db`

**For Lucee:**
1. Open Lucee Administrator
2. Go to Services → Datasources
3. Add new datasource:
   - Name: `teamDirectory`
   - Type: Other
   - JDBC URL: `jdbc:sqlite:/absolute/path/to/database/team_directory.db`
   - Driver Class: `org.sqlite.JDBC`

If you can't set up a datasource, you can modify `api/employees.cfc` to use a JDBC connection string directly.

### Step 3: Deploy the API

1. Copy the `api` folder to your ColdFusion web root
   - Adobe CF: `C:\ColdFusion\cfusion\wwwroot\api\`
   - Lucee: `C:\lucee\tomcat\webapps\ROOT\api\`

2. Make sure REST services are enabled in ColdFusion Administrator

3. Test the API:
   ```
   http://localhost:8500/api/employees.cfc?method=getEmployees
   ```
   You should see JSON data.

### Step 4: Set Up React Frontend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Update API endpoint if needed:
   - Open `src/App.jsx`
   - If your ColdFusion server uses a different port, update the fetch URL

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser

### Step 5: Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## API Endpoints

### GET /api/employees.cfc?method=getEmployees

Returns a JSON array of all employees.

**Response:**
```json
[
  {
    "ID": 1,
    "FirstName": "Ahmed",
    "LastName": "Khan",
    "Role": "Software Engineer"
  },
  ...
]
```

**CORS Headers:**
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET, OPTIONS`
- `Access-Control-Allow-Headers: Content-Type, Accept`

## Troubleshooting

**CORS Errors:**
- CORS headers are already in the ColdFusion component
- Check that your ColdFusion server allows REST requests

**Database Connection Issues:**
- Make sure the datasource name matches in `employees.cfc` (default: `teamDirectory`)
- Check the database file path is correct
- Ensure SQLite JDBC driver is installed

**API Not Returning Data:**
- Check ColdFusion server logs
- Test the endpoint: `http://localhost:8500/api/employees.cfc?method=getEmployees`
- Make sure the database file exists and has data

**React App Can't Connect:**
- Make sure ColdFusion server is running
- Check the API URL in `src/App.jsx` matches your server
- Use browser DevTools Network tab to see what's happening

## Security

- SQL Injection Prevention: Uses parameterized queries
- CORS Configuration: Properly set up
- Error Handling: Comprehensive error handling and logging
- Input Validation: Search functionality handles input safely

## Technologies

- Frontend: React 18, Vite, CSS3
- Backend: ColdFusion (CFML)
- Database: SQLite
- API: RESTful JSON API

## How It Works

**React Hooks:**
- `useState`: Keeps track of employees, search term, loading, and error states
- `useEffect`: Fetches data when component loads and filters when search changes

**ColdFusion:**
- RESTful component with proper HTTP methods
- CORS headers for cross-origin requests
- Parameterized queries for security
- Error handling and logging

## Sample Data

The database comes with 8 sample employees:
- Ahmed Khan - Software Engineer
- Fatima Ali - Product Manager
- Hassan Malik - UX Designer
- Ayesha Raza - Data Analyst
- Usman Sheikh - DevOps Engineer
- Zainab Iqbal - Frontend Developer
- Bilal Hussain - Backend Developer
- Sana Ahmed - QA Engineer

## License

This project was created for a technical assessment.
