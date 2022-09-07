import React from 'react'
import NavBar from './components/NavBar';
import './App.css'

import {BrowserRouter, Route} from 'react-router-dom'

import Home from './components/screens/Home'
import SignIn from './components/screens/Login'
import Profile from './components/screens/Profile'
import SignUp from './components/screens/signup'
//hola mundo     
function App() {
  return ( 
    <BrowserRouter>
      <NavBar/>
      <Route path="/Home" component={Home} />
      <Route path="/SignIn" component={SignIn}/>
      <Route path="/Profile" component={Profile}/>
      <Route path="/SignUp" component={SignUp}/>
    </BrowserRouter>
  )}

export default App;
