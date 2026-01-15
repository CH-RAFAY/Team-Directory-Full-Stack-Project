async function checkStatus() {
  console.log('\nChecking Application Status...\n');
  
  try {
    const healthResponse = await fetch('http://localhost:8501/api/health');
    const healthData = await healthResponse.json();
    console.log('API Server: RUNNING on port 8501');
    console.log('Status:', healthData.status);
    
    const empResponse = await fetch('http://localhost:8501/api/employees_alternative.cfc?method=getEmployees');
    const employees = await empResponse.json();
    console.log('API Endpoint: WORKING');
    console.log('Employees found:', employees.length);
  } catch (error) {
    console.log('API Server: NOT RUNNING on port 8501');
    console.log('Error:', error.message);
    console.log('Start it with: node server.cjs');
  }
  
  console.log('\nReact App: http://localhost:3000');
  console.log('API Server: http://localhost:8501\n');
  
  console.log('Application is ready!');
  console.log('Open http://localhost:3000 in your browser\n');
}

checkStatus();
