import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar bg-white/60 backdrop-blur-sm shadow-sm">
        <Link to="/" >
          <p className="text-2xl font-bold text-gradient ">ResumeAnalyzer</p>
        </Link>
        <Link to="/upload" className="primary-button w-fit">
          Upload Resume
        </Link>
    </nav>
  )
}

export default Navbar