// frontend/src/pages/Home.js
import React, { useState } from 'react';
import LoginModal from '../components/LoginModal';
import '../styles/App.css';

function Home({ onNavigate }) {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseModal = () => {
    setShowLogin(false);
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="project-name">Projeto GreenTech</div>
        <button className="login-button" onClick={handleLoginClick}>
          Entrar
        </button>
      </header>
      <main className="main-content">
        <h1>Bem-vindo ao Projeto GreenTech</h1>
        <p>
          Este projeto visa promover a sustentabilidade por meio do uso eficiente de energia solar.
          Nossa aplicação calcula a economia gerada com a instalação de sistemas fotovoltaicos e permite
          aos usuários acompanharem seus consumos e benefícios.
        </p>
      </main>
      {showLogin && <LoginModal onClose={handleCloseModal} onNavigate={onNavigate} />}
    </div>
  );
}

export default Home;
