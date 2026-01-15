<cfcomponent output="false" rest="true" restpath="/employees">

    <cffunction name="onRequestStart" access="public" returntype="boolean" output="false">
        <cfheader name="Access-Control-Allow-Origin" value="*">
        <cfheader name="Access-Control-Allow-Methods" value="GET, POST, OPTIONS">
        <cfheader name="Access-Control-Allow-Headers" value="Content-Type, Accept">
        <cfheader name="Content-Type" value="application/json; charset=utf-8">
        
        <cfif cgi.request_method EQ "OPTIONS">
            <cfreturn false>
        </cfif>
        
        <cfreturn true>
    </cffunction>

    <cffunction name="getEmployees" access="remote" returntype="array" httpmethod="GET" restpath="/" produces="application/json">
        
        <cfscript>
            var employees = [];
            
            try {
                var qry = queryExecute(
                    "SELECT ID, FirstName, LastName, Role FROM Employees ORDER BY LastName, FirstName",
                    {},
                    {
                        datasource: "teamDirectory"
                    }
                );
                
                for (var i = 1; i <= qry.recordCount; i++) {
                    var employee = {
                        "ID": qry.ID[i],
                        "FirstName": qry.FirstName[i],
                        "LastName": qry.LastName[i],
                        "Role": qry.Role[i]
                    };
                    arrayAppend(employees, employee);
                }
                
                return employees;
                
            } catch (any e) {
                writeLog(file="application", text="Error in getEmployees: #e.message#");
                
                var errorResponse = {
                    "error": true,
                    "message": "Failed to retrieve employees",
                    "details": e.message
                };
                
                cfheader(statuscode="500", statustext="Internal Server Error");
                
                return [errorResponse];
            }
        </cfscript>
    </cffunction>

    <cffunction name="getEmployeesLegacy" access="remote" returntype="array" httpmethod="GET" restpath="/legacy" produces="application/json">
        
        <cfquery name="qryEmployees" datasource="teamDirectory">
            SELECT ID, FirstName, LastName, Role 
            FROM Employees 
            ORDER BY LastName, FirstName
        </cfquery>
        
        <cfscript>
            var employees = [];
            
            for (var i = 1; i <= qryEmployees.recordCount; i++) {
                var employee = {
                    "ID": qryEmployees.ID[i],
                    "FirstName": qryEmployees.FirstName[i],
                    "LastName": qryEmployees.LastName[i],
                    "Role": qryEmployees.Role[i]
                };
                arrayAppend(employees, employee);
            }
            
            return employees;
        </cfscript>
    </cffunction>

</cfcomponent>
