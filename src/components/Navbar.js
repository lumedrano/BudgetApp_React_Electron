// src/components/Navbar.js
import React from 'react';
import { House, User, FileText } from 'lucide-react';
import { NavBar } from './tubelight-navbar';

export function Navbar() {
  const navItems = [
    { name: 'Dashboard', url: '/', icon: House },
    { name: 'Add', url: '/add', icon: User },
    { name: 'Transactions', url: '/transactions', icon: FileText },
  ];

  // const formattedItems = navItems.map(item => ({
  //   ...item,
  //   target: item.external ? '_blank' : undefined,
  //   rel: item.external ? 'noopener noreferrer' : undefined,
  // }));

  return <NavBar items={navItems} />;
}

export default Navbar;