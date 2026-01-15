# Quick Start - Get It Running Now!

## ✅ What's Already Done

1. ✅ Database initialized with 8 employee records
2. ✅ React dependencies installed
3. ✅ React dev server starting...

## 🚀 React Frontend

The React app should be running at: **http://localhost:3000**

If it's not open, navigate to that URL in your browser.

## ⚠️ Important: ColdFusion Backend Setup Required

The React app needs the ColdFusion API to fetch data. You need to:

### Step 1: Configure ColdFusion Datasource

1. Open ColdFusion Administrator:
   - Adobe CF: `http://localhost:8500/CFIDE/administrator/`
   - Lucee: `http://localhost:8888/lucee/admin/`

2. Create datasource:
   - **Name**: `teamDirectory`
   - **Type**: SQLite (or JDBC)
   - **Database Path**: `C:\Users\rafay\OneDrive\Desktop\Cursor\database\team_directory.db`

### Step 2: Deploy API Files

Copy the `api` folder to your ColdFusion web root:
- **Adobe CF**: `C:\ColdFusion\cfusion\wwwroot\api\`
- **Lucee**: `C:\lucee\tomcat\webapps\ROOT\api\`

### Step 3: Test API

Open in browser:
```
http://localhost:8500/api/employees_alternative.cfc?method=getEmployees
```

You should see JSON data. If you see an error, check:
- Datasource is configured correctly
- Database file path is correct
- ColdFusion server is running

### Step 4: Update React App (if needed)

If your ColdFusion server uses a different port or URL, edit `src/App.jsx` line 35:
```javascript
const response = await fetch('http://YOUR_SERVER:PORT/api/employees_alternative.cfc?method=getEmployees', {
```

## 🎯 Current Status

- ✅ Database: Ready (8 employees)
- ✅ React Frontend: Running on port 3000
- ⏳ ColdFusion Backend: Needs configuration

Once ColdFusion is configured, the app will work end-to-end!

## 🐛 Troubleshooting

**React app shows "Error" message:**
- ColdFusion API is not accessible
- Check if ColdFusion server is running
- Verify API URL in browser

**CORS errors:**
- CORS headers are already in the CFC files
- Make sure you're using the correct API endpoint

**Database connection errors:**
- Verify datasource name is exactly "teamDirectory"
- Check database file path is absolute and correct
- Ensure ColdFusion has read access to the database file
