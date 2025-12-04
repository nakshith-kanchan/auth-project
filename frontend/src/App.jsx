import React from 'react'
import { Link } from 'react-router-dom'

export default function App(){
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container">
        <a className="navbar-brand" href="#">AuthDemo</a>
        <div>
          <Link to="/login" className="btn btn-link">Login</Link>
          <Link to="/signup" className="btn btn-link">Signup</Link>
        </div>
      </div>
    </nav>
  )
}
