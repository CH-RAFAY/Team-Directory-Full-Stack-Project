# Quick Setup Guide

This guide will help you get the Team Directory application running quickly.

## Prerequisites Checklist

- [ ] Node.js installed (v16+)
- [ ] ColdFusion Server running (Adobe CF or Lucee)
- [ ] SQLite database file created
- [ ] ColdFusion datasource configured

## Step-by-Step Setup

### 1. Initialize Database (Choose One Method)

**Method A: Python (Easiest)**
```bash
python database/init_database.py
```

**Method B: Node.js**
```bash
cd database
npm install sqlite3
node init_database.js
```

**Method C: SQLite CLI**
```bash
sqlite3 database/team_directory.db < database/setup.sql
```

### 2. Configure ColdFusion Datasource

#### Adobe ColdFusion:
1. Open CF Admin: `http://localhost:8500/CFIDE/administrator/`
2. Navigate to: **Data & Services → Datasources**
3. Click **Add New Datasource**
4. Configure:
   - **Name**: `teamDirectory`
   - **Driver**: SQLite (or JDBC)
   - **Database File**: Full path to `database/team_directory.db`
   - Example: `C:\Users\rafay\OneDrive\Desktop\Cursor\database\team_directory.db`

#### Lucee:
1. Open Lucee Admin: `http://localhost:8888/lucee/admin/`
2. Navigate to: **Services → Datasources**
3. Add new datasource:
   - **Name**: `teamDirectory`
   - **Type**: Other
   - **JDBC URL**: `jdbc:sqlite:C:/Users/rafay/OneDrive/Desktop/Cursor/database/team_directory.db`
   - **Driver Class**: `org.sqlite.JDBC`

**Important**: Use forward slashes (`/`) in paths for Lucee, even on Windows.

### 3. Deploy ColdFusion API

1. Copy the `api` folder to your ColdFusion web root:
   - **Adobe CF**: `C:\ColdFusion\cfusion\wwwroot\api\`
   - **Lucee**: `C:\lucee\tomcat\webapps\ROOT\api\` or your web root

2. Test the API endpoint:
   ```
   http://localhost:8500/api/employees_alternative.cfc?method=getEmployees
   ```
   
   You should see JSON output like:
   ```json
   [{"ID":1,"FirstName":"John","LastName":"Smith","Role":"Software Engineer"},...]
   ```

### 4. Set Up React Frontend

1. Install dependencies:
   ```bash
   npm install
   ```

2. Update API URL if needed:
   - Open `src/App.jsx`
   - Line 35: Update the URL if your CF server uses a different port/URL
   - Default: `http://localhost:8500/api/employees_alternative.cfc?method=getEmployees`

3. Start development server:
   ```bash
   npm run dev
   ```

4. Open browser: `http://localhost:3000`

## Troubleshooting

### API Returns Empty Array or Error

1. **Check datasource name**: Ensure it matches in the CFC file (default: `teamDirectory`)
2. **Verify database path**: Use absolute path in datasource configuration
3. **Check database file**: Ensure `team_directory.db` exists and has data
4. **View ColdFusion logs**: Check `logs/application.log` for errors

### CORS Errors in Browser Console

- The CFC files already include CORS headers
- If still seeing errors, check that the API URL in `App.jsx` matches your server
- Verify ColdFusion allows REST/remote method calls

### React App Shows "Error" Message

1. Check browser console (F12) for detailed error
2. Verify ColdFusion server is running
3. Test API endpoint directly in browser
4. Check network tab for failed requests

### Database Connection Issues

- **SQLite JDBC Driver**: May need to download and place in ColdFusion lib folder
- **Path Issues**: Use absolute paths, forward slashes for Lucee
- **Permissions**: Ensure ColdFusion has read/write access to database file

## Testing the Application

1. **Database**: Run `python database/init_database.py` and verify output
2. **API**: Test endpoint in browser or Postman
3. **Frontend**: Start React app and verify data loads
4. **Search**: Type in search box to filter employees

## Production Build

```bash
npm run build
```

Deploy the `dist` folder to your web server.

## Need Help?

- Check `README.md` for detailed documentation
- Review ColdFusion server logs
- Verify all paths and configurations match your setup
