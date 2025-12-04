import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { signup as apiSignup } from '../services/api'
import { isValidName, isValidEmail, isValidPassword, isValidPhone } from '../utils/validators'

export default function Signup(){
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', country: '', company: '', gender: 'male', email: '', password: '', confirmPassword: ''
  })
  const handleChange = (e) => {
    const id = e.target.id.replace('signup-','')
    setForm({...form, [id]: e.target.value})
  }
  const validate = () => {
    if(!isValidName(form.firstName)) return 'First name must be at least 2 characters'
    if(!isValidName(form.lastName)) return 'Last name must be at least 2 characters'
    if(!isValidPhone(form.phone)) return 'Phone must be numeric between 7 and 15 digits'
    if(!form.country) return 'Country required'
    if(!isValidEmail(form.email)) return 'Invalid email'
    if(!isValidPassword(form.password)) return 'Password must be min 8 chars, include 1 uppercase, 1 number and 1 special char'
    if(form.password !== form.confirmPassword) return 'Passwords do not match'
    return null
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const error = validate()
    if(error){ toast.error(error); return }
    try{
      const payload = { firstName: form.firstName, lastName: form.lastName, phone: form.phone, country: form.country, company: form.company, gender: form.gender, email: form.email, password: form.password }
      const res = await apiSignup(payload)
      const saved = res.data
      localStorage.setItem('auth_user', JSON.stringify({ email: saved.email, firstName: saved.firstName, lastName: saved.lastName }))
      toast.success('Signup successful')
      navigate('/dashboard')
    }catch(err){
      const message = err?.response?.data?.message || err.message || 'Signup failed'
      toast.error(message)
    }
  }

  return (
    <div className="container-form">
      <h3>Signup</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">First name</label>
          <input id="signup-firstName" value={form.firstName} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Last name</label>
          <input id="signup-lastName" value={form.lastName} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input id="signup-phone" value={form.phone} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Country</label>
          <select id="signup-country" value={form.country} onChange={handleChange} className="form-select">
            <option value="">Select country</option>
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="Canada">Canada</option>
            <option value="Australia">Australia</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Company</label>
          <input id="signup-company" value={form.company} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label d-block">Gender</label>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="gender" id="signup-gender-male" value="male" checked={form.gender==='male'} onChange={(e)=>setForm({...form, gender:e.target.value})} />
            <label className="form-check-label" htmlFor="signup-gender-male">Male</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="gender" id="signup-gender-female" value="female" checked={form.gender==='female'} onChange={(e)=>setForm({...form, gender:e.target.value})} />
            <label className="form-check-label" htmlFor="signup-gender-female">Female</label>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input id="signup-email" value={form.email} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input id="signup-password" type="password" value={form.password} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input id="signup-confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="form-control" />
        </div>
        <button id="signup-submit" type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  )
}
