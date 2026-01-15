const employees = [
  { ID: 1, FirstName: 'Ahmed', LastName: 'Khan', Role: 'Software Engineer' },
  { ID: 2, FirstName: 'Fatima', LastName: 'Ali', Role: 'Product Manager' },
  { ID: 3, FirstName: 'Hassan', LastName: 'Malik', Role: 'UX Designer' },
  { ID: 4, FirstName: 'Ayesha', LastName: 'Raza', Role: 'Data Analyst' },
  { ID: 5, FirstName: 'Usman', LastName: 'Sheikh', Role: 'DevOps Engineer' },
  { ID: 6, FirstName: 'Zainab', LastName: 'Iqbal', Role: 'Frontend Developer' },
  { ID: 7, FirstName: 'Bilal', LastName: 'Hussain', Role: 'Backend Developer' },
  { ID: 8, FirstName: 'Sana', LastName: 'Ahmed', Role: 'QA Engineer' }
]

function filterEmployees(searchTerm) {
  const s = searchTerm.trim().toLowerCase()
  if (!s) return employees
  return employees.filter(emp => {
    const first = emp.FirstName.toLowerCase()
    return first.startsWith(s)
  })
}

const tests = ['S', 's', 'F', 'Fa', 'A', 'Z', 'H', 'X']

for (const t of tests) {
  const res = filterEmployees(t).map(e => `${e.FirstName} ${e.LastName}`)
  console.log(`Search='${t}' -> [${res.join(', ')}]`)
}

// Exit with success
process.exit(0)
