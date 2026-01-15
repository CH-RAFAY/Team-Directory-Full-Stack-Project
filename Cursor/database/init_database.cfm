<cfsetting showdebugoutput="false">

<cfscript>
    dbPath = expandPath("../database/team_directory.db");
    
    try {
        datasource = {
            class: "org.sqlite.JDBC",
            connectionString: "jdbc:sqlite:#dbPath#"
        };
        
        if (!fileExists(dbPath)) {
            fileWrite(dbPath, "");
        }
        
        queryExecute("
            CREATE TABLE IF NOT EXISTS Employees (
                ID INTEGER PRIMARY KEY AUTOINCREMENT,
                FirstName TEXT NOT NULL,
                LastName TEXT NOT NULL,
                Role TEXT NOT NULL
            )
        ", {}, {datasource: datasource});
        
        checkQuery = queryExecute("SELECT COUNT(*) as count FROM Employees", {}, {datasource: datasource});
        
        if (checkQuery.count EQ 0) {
            sampleData = [
                {FirstName: "Ahmed", LastName: "Khan", Role: "Software Engineer"},
                {FirstName: "Fatima", LastName: "Ali", Role: "Product Manager"},
                {FirstName: "Hassan", LastName: "Malik", Role: "UX Designer"},
                {FirstName: "Ayesha", LastName: "Raza", Role: "Data Analyst"},
                {FirstName: "Usman", LastName: "Sheikh", Role: "DevOps Engineer"},
                {FirstName: "Zainab", LastName: "Iqbal", Role: "Frontend Developer"},
                {FirstName: "Bilal", LastName: "Hussain", Role: "Backend Developer"},
                {FirstName: "Sana", LastName: "Ahmed", Role: "QA Engineer"}
            ];
            
            for (employee in sampleData) {
                queryExecute("
                    INSERT INTO Employees (FirstName, LastName, Role)
                    VALUES (:firstName, :lastName, :role)
                ", {
                    firstName: {value: employee.FirstName, cfsqltype: "CF_SQL_VARCHAR"},
                    lastName: {value: employee.LastName, cfsqltype: "CF_SQL_VARCHAR"},
                    role: {value: employee.Role, cfsqltype: "CF_SQL_VARCHAR"}
                }, {datasource: datasource});
            }
            
            writeOutput("<h2>Database initialized successfully!</h2>");
            writeOutput("<p>Inserted " & arrayLen(sampleData) & " employee records.</p>");
        } else {
            writeOutput("<h2>Database already exists!</h2>");
            writeOutput("<p>Found " & checkQuery.count & " existing employee records.</p>");
        }
        
    } catch (any e) {
        writeOutput("<h2>Error initializing database:</h2>");
        writeOutput("<pre>#htmlEditFormat(e.message)#</pre>");
        writeOutput("<pre>#htmlEditFormat(e.detail)#</pre>");
    }
</cfscript>
