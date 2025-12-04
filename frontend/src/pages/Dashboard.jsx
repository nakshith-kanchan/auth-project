import React from 'react'

export default function Dashboard(){
  const user = JSON.parse(localStorage.getItem('auth_user') || 'null')
  const logout = () => { localStorage.removeItem('auth_user'); window.location.href = '/login' }
  return (
    <div className="container-form">
      <h2 id="dashboard-title">Dashboard</h2>
      {user ? (
        <div id="dashboard-user">Welcome, {user.firstName} {user.lastName} ({user.email})</div>
      ) : (
        <div id="dashboard-user">Welcome, unknown user</div>
      )}
      <button id="dashboard-logout" className="btn btn-danger mt-3" onClick={logout}>Logout</button>
    </div>
  )
}
