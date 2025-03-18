import React from 'react'
import './MainHeader.css'
import Navigation from './Navigation.jsx'

const MainHeader = (props) => {
    return (
      <header className="main-header">
        <h1>A Typical Page</h1>
        <Navigation onLogout={props.onLogout} />
      </header>
    );
  };
  
  export default MainHeader;