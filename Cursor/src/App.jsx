import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEmployees()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredEmployees(employees)
    } else {
      const search = searchTerm.trim().toLowerCase()
      const filtered = employees.filter(employee => {
        const first = employee.FirstName.toLowerCase()

        // Strict match: only if first name starts with search
        return first.startsWith(search)
      })
      setFilteredEmployees(filtered)
    }
  }, [searchTerm, employees])

  const fetchEmployees = async () => {
    try {
      setLoading(true)
      setError(null)
      // Use Vite environment variable VITE_API_URL if provided, otherwise default to localhost:8502
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8502/api/employees_alternative.cfc?method=getEmployees'
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      if (data && Array.isArray(data)) {
        setEmployees(data)
        setFilteredEmployees(data)
      } else {
        throw new Error('Invalid data format received')
      }
    } catch (err) {
      setError(err.message)
      console.error('Error fetching employees:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Team Directory</h1>
          <p className="subtitle">Find your team members quickly and easily</p>
        </header>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="clear-button"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading employees...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>Error: {error}</p>
            <button onClick={fetchEmployees} className="retry-button">
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="results-info">
              <p>
                Showing {filteredEmployees.length} of {employees.length} employees
              </p>
            </div>

            {filteredEmployees.length === 0 ? (
              <div className="no-results">
                <p>No employees found matching your search.</p>
              </div>
            ) : (
              <div className="employee-grid">
                {filteredEmployees.map((employee) => (
                  <div key={employee.ID} className="employee-card">
                    <div className="employee-avatar">
                      {employee.FirstName.charAt(0)}{employee.LastName.charAt(0)}
                    </div>
                    <div className="employee-info">
                      <h2 className="employee-name">
                        {employee.FirstName} {employee.LastName}
                      </h2>
                      <p className="employee-role">{employee.Role}</p>
                      <p className="employee-id">ID: {employee.ID}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App
