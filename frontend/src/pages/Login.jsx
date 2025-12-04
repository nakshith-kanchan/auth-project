import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login as apiLogin } from '../services/api'
import { isValidEmail } from '../utils/validators'

export default function Login() {

  const navigate = useNavigate()

  // Only email, password, terms
  const [form, setForm] = useState({
    email: '',
    password: '',
    terms: false
  })

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target

    if (type === 'checkbox') {
      setForm({ ...form, [id]: checked })
    } else {
      setForm({ ...form, [id]: value })
    }
  }

  const validate = () => {
    if (!isValidEmail(form.email)) return 'Enter a valid email'
    if (!form.password) return 'Enter password'
    if (!form.terms) return 'You must accept terms and conditions'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const error = validate()
    if (error) {
      toast.error(error)
      return
    }

    try {
      const res = await apiLogin({ email: form.email, password: form.password })
      const user = res.data

      localStorage.setItem(
        'auth_user',
        JSON.stringify({ email: user.email, firstName: user.firstName, lastName: user.lastName })
      )

      toast.success('Login successful')
      navigate('/dashboard')

    } catch (err) {
      const message = err?.response?.data?.message || err.message || 'Login failed'
      toast.error(message)
    }
  }

  return (
    <div className="container-form">
      <h3>Login</h3>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            id="email"
            value={form.email}
            onChange={handleChange}
            className="form-control"
            autoComplete="email"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            id="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="form-control"
            autoComplete="current-password"
          />
        </div>

        <div className="mb-3 form-check">
          <input
            id="terms"
            type="checkbox"
            checked={form.terms}
            onChange={handleChange}
            className="form-check-input"
          />
          <label htmlFor="terms" className="form-check-label">
            I accept Terms & Conditions
          </label>
        </div>

        <button id="login-submit" type="submit" className="btn btn-primary w-100">
          Login
        </button>

      </form>
    </div>
  )
}
