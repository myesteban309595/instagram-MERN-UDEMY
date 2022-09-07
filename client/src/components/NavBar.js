import React from 'react'

const NavBar = ()=> {
    return(
        <nav>
        <div class="nav-wrapper white">
          <a href="/" class="brand-logo">Isntagram</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="/SignIn">SignIn</a></li>
            <li><a href="/SignUp">SignUp</a></li>
            <li><a href="/Profile">Profile</a></li>
          </ul>
        </div>
      </nav>    
    )}

export default NavBar