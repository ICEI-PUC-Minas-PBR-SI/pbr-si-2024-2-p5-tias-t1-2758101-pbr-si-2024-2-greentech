// frontend/src/App.js
import React, { useState } from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {currentPage === 'home' && <Home onNavigate={navigateTo} />}
      {currentPage === 'register' && <Register />}
    </div>
  );
}

export default App;
