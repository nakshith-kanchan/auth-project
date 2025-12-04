const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs-extra')
const path = require('path')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const DATA_FILE = path.join(__dirname, 'users.json')

// Read users
async function readUsers() {
  try {
    const exists = await fs.pathExists(DATA_FILE)
    if (!exists) return []
    const txt = await fs.readFile(DATA_FILE, 'utf8')
    return JSON.parse(txt || '[]')
  } catch (e) {
    console.error('Error reading users.json:', e)
    return []
  }
}

// Write users
async function writeUsers(users) {
  await fs.writeFile(DATA_FILE, JSON.stringify(users, null, 2))
}

// SIGNUP
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, phone, country, company, gender, email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' })
  }

  const users = await readUsers()

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const newUser = {
    id: Date.now(),
    firstName,
    lastName,
    phone,
    country,
    company,
    gender,
    email,
    password
  }

  users.push(newUser)
  await writeUsers(users)

  const { password: _, ...safeUser } = newUser

  res.json(safeUser)
})

// LOGIN
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' })
  }

  const users = await readUsers()

  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const { password: _, ...safeUser } = user

  res.json(safeUser)
})

// START SERVER
app.listen(4000, () => {
  console.log('🔥 Backend started on http://localhost:4000')
})
