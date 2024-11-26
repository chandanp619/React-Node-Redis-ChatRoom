import React from 'react';
import { NavLink,active } from 'react-router-dom';

export default function HeaderComponent() {
  return (
    <div className='row header'>
        <div className='col-12'>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse d-flex justify-content-center align-items-center" id="navbarNav">
                <ul className="navbar-nav text-center">
                  <li className="nav-item">
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/rooms">Rooms</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/logout">Logout</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
  )
}
