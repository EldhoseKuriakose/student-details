import React from 'react';
import Dropdown from '../Dropdown/Dropdown.component';
import './Navbar.styles.css';

const Navbar = () => (
    <div className="navbar-container">
        <div className="user-button-container">
            <Dropdown />
        </div>
    </div>
);

export default Navbar;