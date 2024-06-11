import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='flex-between'>
        <nav className='flex-between'>
            <div className='left-navbar'>
              <h2 className='navbar-header'>Social</h2>
            </div>
            <div className='right-navbar'>
              <ul className='flex-between'>
                <li>
                  <Link className='link' to='/'>Home</Link>
                </li>
                <li>
                <Link className='link' to='/profile'>My Profile</Link>
                </li>
              </ul>
            </div>
        </nav>        
    </header>

  )
}

export default Navbar
