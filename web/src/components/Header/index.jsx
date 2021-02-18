import React from 'react';

import './styles.css';

import Logo from '../../assets/logo.svg';

function Header() {
  return (
    <header>
      <img src={Logo} alt="Logo Dev Finance" />
    </header>
  );
}

export default Header;