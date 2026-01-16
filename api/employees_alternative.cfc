<cfcomponent output="false">

    <cffunction name="getEmployees" access="remote" returntype="string" output="false">
        
        <cfheader name="Access-Control-Allow-Origin" value="*">
        <cfheader name="Access-Control-Allow-Methods" value="GET, OPTIONS">
        <cfheader name="Access-Control-Allow-Headers" value="Content-Type, Accept">
        <cfheader name="Content-Type" value="application/json; charset=utf-8">
        
        <cfif cgi.request_method EQ "OPTIONS">
            <cfreturn "">
        </cfif>
        
        <cfscript>
            var result = [];
            
            try {
                var qryEmployees = queryExecute(
                    sql = "SELECT ID, FirstName, LastName, Role FROM Employees ORDER BY LastName, FirstName",
                    options = {
                        datasource: "teamDirectory"
                    }
                );
                
                for (var i = 1; i <= qryEmployees.recordCount; i++) {
                    var employee = {
                        "ID": qryEmployees.ID[i],
                        "FirstName": qryEmployees.FirstName[i],
                        "LastName": qryEmployees.LastName[i],
                        "Role": qryEmployees.Role[i]
                    };
                    arrayAppend(result, employee);
                }
                
            } catch (any e) {
                writeLog(
                    file = "application",
                    text = "Error in getEmployees: #e.message# | Detail: #e.detail# | Stack: #e.stackTrace#"
                );
                
                result = [{
                    "error": true,
                    "message": "Failed to retrieve employees",
                    "details": e.message
                }];
                
                cfheader(statuscode="500", statustext="Internal Server Error");
            }
            
            return serializeJSON(result);
        </cfscript>
    </cffunction>

    <cffunction name="getEmployeesLegacy" access="remote" returntype="string" output="false">
        
        <cfheader name="Access-Control-Allow-Origin" value="*">
        <cfheader name="Access-Control-Allow-Methods" value="GET, OPTIONS">
        <cfheader name="Access-Control-Allow-Headers" value="Content-Type, Accept">
        <cfheader name="Content-Type" value="application/json; charset=utf-8">
        
        <cfscript>
            var result = [];
        </cfscript>
        
        <cftry>
            <cfquery name="qryEmployees" datasource="teamDirectory">
                SELECT ID, FirstName, LastName, Role 
                FROM Employees 
                ORDER BY LastName, FirstName
            </cfquery>
            
            <cfscript>
                for (var i = 1; i <= qryEmployees.recordCount; i++) {
                    var employee = {
                        "ID": qryEmployees.ID[i],
                        "FirstName": qryEmployees.FirstName[i],
                        "LastName": qryEmployees.LastName[i],
                        "Role": qryEmployees.Role[i]
                    };
                    arrayAppend(result, employee);
                }
            </cfscript>
            
            <cfcatch type="any">
                <cfscript>
                    writeLog(
                        file = "application",
                        text = "Error in getEmployeesLegacy: #cfcatch.message# | Detail: #cfcatch.detail#"
                    );
                    
                    result = [{
                        "error": true,
                        "message": "Failed to retrieve employees",
                        "details": cfcatch.message
                    }];
                    
                    cfheader(statuscode="500", statustext="Internal Server Error");
                </cfscript>
            </cfcatch>
        </cftry>
        
        <cfreturn serializeJSON(result)>
    </cffunction>

</cfcomponent>
