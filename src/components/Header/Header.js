/** @format */

import React from 'react';
import './Header.css';
import newLogo from '../../asset/favicon.png';

export default function Header() {
  return (
    <div className="header">
      <img
        src={newLogo}
        alt="Baesh Logo"
        className="header_logo"
      />
      <div className="header_search">
        <input type="text" placeholder="Search" />
      </div>
      <div className="header_menu">
        <button>Home</button>
        <button>Messages</button>
        <button>Profile</button>
      </div>
    </div>
  );
}
