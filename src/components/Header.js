import React,{ useContext, useState } from 'react'
import logo from './../logo.svg';

function Header({theme,setTheme,ThemeContext}) {
  const themeName = useContext(ThemeContext);
 // const className = 'button-'+theme;
  return (
    <>
    <nav class="navbar bg-dark border-bottom border-primary-subtle border-5">
        <div class="container-fluid">
            <h2 class="navbar-brand text-light">
            <img src={logo} alt="Logo" width="30" height="24" class="d-inline-block align-text-top"/>
            Bootstrap
            </h2>
            {/* <button className='float-end' onClick={}>{themeName}</button> */}
            <div class="form-check form-switch float-end">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" 
              checked={theme === 'dark'}
              onChange={(e)=>{
                setTheme(e.target.checked ?'dark':'light')
                  }}/>
              <label class="form-check-label" for="flexSwitchCheckDefault">{theme}</label>
            </div>
        </div>
        
    </nav>
    </>
  )
}

export default Header