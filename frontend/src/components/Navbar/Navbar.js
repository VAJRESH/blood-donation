import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const navLinks = [
    { name: 'Home', path: '/' }, 
    { name: 'Add New Donor', path: '/add' }
]
const Navbar = () => {
    return (
        <nav className='navbar'>
            {
                navLinks.map(link => {
                    return (
                        <Link to={link.path} className='navlink' key={link.name}>{link.name}</Link>
                    )
                })
            }
        </nav>
    );
}

export default Navbar;
