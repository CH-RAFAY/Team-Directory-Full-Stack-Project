<cfcomponent displayname="EmployeeService" rest="true" restPath="employees">

    <cffunction name="getEmployees" access="remote" returntype="any" httpmethod="GET" restPath="/" produces="application/json">
        <cfset var employees = []>
        <cfset var row = {}>

        <cfheader name="Access-Control-Allow-Origin" value="http://localhost:5173">
        <cfheader name="Access-Control-Allow-Methods" value="GET, OPTIONS">
        <cfheader name="Access-Control-Allow-Headers" value="Content-Type">

        <cfquery name="qEmployees" datasource="TeamDirectoryDSN">
            SELECT ID, FirstName, LastName, Role
            FROM Employees
            ORDER BY LastName, FirstName
        </cfquery>

        <cfloop query="qEmployees">
            <cfset row = {
                id = qEmployees.ID,
                firstName = qEmployees.FirstName,
                lastName = qEmployees.LastName,
                role = qEmployees.Role
            }>
            <cfset arrayAppend(employees, row)>
        </cfloop>

        <cfreturn employees>
    </cffunction>

    <cffunction name="getEmployeeById" access="remote" returntype="any" httpmethod="GET" restPath="{id}" produces="application/json">
        <cfargument name="id" type="numeric" required="true" restArgSource="path">
        <cfset var employee = {}>
        <cfset var qEmployee = "">

        <cfheader name="Access-Control-Allow-Origin" value="http://localhost:5173">
        <cfheader name="Access-Control-Allow-Methods" value="GET, OPTIONS">
        <cfheader name="Access-Control-Allow-Headers" value="Content-Type">

        <cfquery name="qEmployee" datasource="TeamDirectoryDSN">
            SELECT ID, FirstName, LastName, Role
            FROM Employees
            WHERE ID = <cfqueryparam cfsqltype="cf_sql_integer" value="#arguments.id#">
        </cfquery>

        <cfif qEmployee.recordCount EQ 0>
            <cfheader statusCode="404" statusText="Not Found">
            <cfreturn employee>
        </cfif>

        <cfset employee = {
            id = qEmployee.ID,
            firstName = qEmployee.FirstName,
            lastName = qEmployee.LastName,
            role = qEmployee.Role
        }>

        <cfreturn employee>
    </cffunction>

    <cffunction name="handleOptions" access="remote" returntype="void" httpmethod="OPTIONS" restPath="/">
        <cfheader name="Access-Control-Allow-Origin" value="http://localhost:5173">
        <cfheader name="Access-Control-Allow-Methods" value="GET, OPTIONS">
        <cfheader name="Access-Control-Allow-Headers" value="Content-Type">
        <cfheader statusCode="204" statusText="No Content">
    </cffunction>

</cfcomponent>

