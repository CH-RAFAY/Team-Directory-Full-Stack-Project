# ColdFusion Server Setup Guide

This guide explains how to configure your ColdFusion server to run the Team Directory application.

## Prerequisites

- ColdFusion Server installed (Adobe ColdFusion or Lucee)
- SQLite database file: `database/team_directory.db`
- React frontend configured

## Step 1: Determine Your ColdFusion Installation

### For Adobe ColdFusion:
- Administrator URL: `http://localhost:8500/CFIDE/administrator/`
- Web Root: `C:\ColdFusion\cfusion\wwwroot\`
- Port: Usually 8500

### For Lucee:
- Administrator URL: `http://localhost:8888/lucee/admin/`
- Web Root: `C:\lucee\tomcat\webapps\ROOT\`
- Port: Usually 8888

## Step 2: Create the Datasource

### In Adobe ColdFusion Administrator:

1. Login to: `http://localhost:8500/CFIDE/administrator/`
   - Default username: `admin`
   - Enter your admin password

2. Navigate to: **Data & Services** → **Data Sources**

3. Click **Add New Data Source**

4. Enter:
   - **Data Source Name:** `teamDirectory`
   - **Driver:** SQLite JDBC (if available) or similar
   - **Database Path:** 
     ```
     C:\Users\rafay\OneDrive\Desktop\Team-Directory-Full-Stack-Project\database\team_directory.db
     ```
   - **Description:** Team Directory Database

5. Click **Submit**

6. On the next page, click **Submit Again** to verify connection

7. You should see: ✓ "The data source 'teamDirectory' has been successfully added."

### In Lucee Administrator:

1. Login to: `http://localhost:8888/lucee/admin/`

2. Navigate to: **Services** → **Datasources**

3. Click **Create New Datasource**

4. Enter:
   - **Name:** `teamDirectory`
   - **Class:** `org.sqlite.JDBC`
   - **Connection String:** 
     ```
     jdbc:sqlite:C:\Users\rafay\OneDrive\Desktop\Team-Directory-Full-Stack-Project\database\team_directory.db
     ```

5. Click **Create**

## Step 3: Deploy CFC Files

1. Copy the entire `api` folder from the project:
   ```
   Source: Team-Directory-Full-Stack-Project\api\
   ```

2. Paste it to your ColdFusion web root:
   
   **For Adobe ColdFusion:**
   ```
   Destination: C:\ColdFusion\cfusion\wwwroot\api\
   ```
   
   **For Lucee:**
   ```
   Destination: C:\lucee\tomcat\webapps\ROOT\api\
   ```

3. You should now have:
   ```
   C:\[CF_PATH]\wwwroot\api\
   ├── employees.cfc
   ├── employees_alternative.cfc
   └── test.html
   ```

## Step 4: Test the ColdFusion API

### Test the Primary Endpoint:

Open your browser and visit:
```
http://localhost:8500/api/employees_alternative.cfc?method=getEmployees
```

You should see JSON data:
```json
[
  {
    "ID": 9,
    "FirstName": "Ahmed",
    "LastName": "Khan",
    "Role": "Software Engineer"
  },
  ...
]
```

### Test Alternative Endpoint:

```
http://localhost:8500/api/employees.cfc
```

### Test with test.html:

Open:
```
http://localhost:8500/api/test.html
```

## Step 5: Configure React to Use ColdFusion

Edit `src/App.jsx` (line 35):

**Change from:**
```javascript
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8501/api/employees_alternative.cfc?method=getEmployees'
```

**To:**
```javascript
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8500/api/employees_alternative.cfc?method=getEmployees'
```

Or use environment variable:
```bash
# Windows PowerShell
$env:VITE_API_URL = "http://localhost:8500/api/employees_alternative.cfc?method=getEmployees"
npm run dev
```

## Step 6: Run the React Frontend

```bash
cd Team-Directory-Full-Stack-Project
npm install
npm run dev
```

Open: `http://localhost:3000`

## Troubleshooting

### Problem: "Datasource not found"

**Solution:** 
- Verify datasource name is exactly: `teamDirectory` (case-sensitive)
- Check database path is correct
- Ensure SQLite JDBC driver is installed

### Problem: CORS Error in Browser Console

**Solution:**
- Both `.cfc` files include CORS headers
- Ensure you're calling from the correct API endpoint
- Check browser console for exact error message

### Problem: "HTTP 404 - API not found"

**Solution:**
- Verify CFC files are in correct location: `[CF_ROOT]\wwwroot\api\`
- Restart ColdFusion service
- Check file permissions

### Problem: Database locked or "Cannot access database"

**Solution:**
- Ensure no other process is using the database
- Check if Node.js server is still running (may lock DB)
- Try stopping Node server: Press Ctrl+C in terminal

### Problem: JSON returned but React shows error

**Solution:**
- Check browser console (F12) for exact error
- Verify all 10 employees are in database
- Test API directly in browser URL bar

## API Endpoints Reference

### Primary Endpoint (queryExecute method):
```
GET http://localhost:8500/api/employees_alternative.cfc?method=getEmployees
```

### Legacy Endpoint (cfquery method):
```
GET http://localhost:8500/api/employees_alternative.cfc?method=getEmployeesLegacy
```

### Modern REST Endpoint:
```
GET http://localhost:8500/api/employees.cfc
```

All return:
```json
[
  {
    "ID": <number>,
    "FirstName": "<string>",
    "LastName": "<string>",
    "Role": "<string>"
  },
  ...
]
```

## Important Notes

1. **Port Conflicts:** Make sure port 8500 is not used by another application
2. **Database Path:** Must use absolute path with forward slashes or escaped backslashes
3. **ColdFusion Restart:** After creating datasource, may need to restart ColdFusion service
4. **Permissions:** Ensure ColdFusion service has read/write access to database directory
5. **CORS:** React frontend at localhost:3000 can access API at localhost:8500 due to CORS headers

## Running Both Simultaneously

In separate terminal windows:

**Terminal 1 - ColdFusion:**
- Ensure ColdFusion service is running
- Keep ColdFusion Administrator accessible

**Terminal 2 - React:**
```bash
cd Team-Directory-Full-Stack-Project
npm run dev
```

Then open browser to: `http://localhost:3000`

## Switching Between Node.js and ColdFusion

### To Use Node.js Backend:
```javascript
// src/App.jsx line 35
const apiUrl = 'http://localhost:8501/api/employees_alternative.cfc?method=getEmployees'
```

### To Use ColdFusion Backend:
```javascript
// src/App.jsx line 35
const apiUrl = 'http://localhost:8500/api/employees_alternative.cfc?method=getEmployees'
```

## Next Steps

1. Follow Step 1-2 to create datasource
2. Follow Step 3 to deploy CFC files
3. Follow Step 4 to test API
4. Follow Step 5 to update React config
5. Follow Step 6 to run application

For video demonstration, see: `README_PRESENTATION.md`
