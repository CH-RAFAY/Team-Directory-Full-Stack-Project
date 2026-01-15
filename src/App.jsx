import { useEffect, useMemo, useState } from 'react'
import { API_BASE_URL } from './config'

function App() {
  const [employees, setEmployees] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadEmployees() {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(`${API_BASE_URL}/employees`)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const data = await response.json()
        if (!ignore) {
          setEmployees(data)
        }
      } catch (e) {
        if (!ignore) {
          setError(e.message || 'Unknown error')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadEmployees()

    return () => {
      ignore = true
    }
  }, [])

  const filteredEmployees = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) {
      return employees
    }
    return employees.filter(employee => {
      const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase()
      return (
        fullName.includes(term) ||
        employee.role.toLowerCase().includes(term)
      )
    })
  }, [employees, searchTerm])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Team Directory</h1>
        <p>Browse the team and search by name or role.</p>
      </header>

      <main className="app-main">
        <div className="search-bar">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Type a name or role"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        </div>

        {loading && <div className="status">Loading employees...</div>}
        {error && !loading && <div className="status error">{error}</div>}

        {!loading && !error && (
          <div className="table-container">
            {filteredEmployees.length === 0 ? (
              <div className="status">No employees found.</div>
            ) : (
              <table className="employee-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map(employee => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App

