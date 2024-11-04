// frontend/src/App.js
import React, { useState } from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import UserList from './pages/UserList';
import EconomyCalculator from './pages/EconomyCalculator';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="project-name">Projeto GreenTech</div>
        <nav className="nav-menu">
          <button onClick={() => navigateTo('home')}>Home</button>
          <button onClick={() => navigateTo('register')}>Cadastrar Usuário</button>
          <button onClick={() => navigateTo('userList')}>Listar Usuários</button>
          <button onClick={() => navigateTo('economyCalculator')}>Calcular Economia</button>
        </nav>
      </header>
      
      <main className="main-content">
        {currentPage === 'home' && <Home />}
        {currentPage === 'register' && <Register />}
        {currentPage === 'userList' && <UserList />}
        {currentPage === 'economyCalculator' && <EconomyCalculator />}
      </main>
    </div>
  );
}

export default App;
