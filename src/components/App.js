import React from 'react';
import './App.css';
import HomePage from './HomePage';
import NavBar from './NavBar';
import SideMenu from './SideMenu';

function App() {
  return (
    <div className="App">
      <SideMenu />
      <HomePage />
      <NavBar />
    </div>
  );
}

export default App;
