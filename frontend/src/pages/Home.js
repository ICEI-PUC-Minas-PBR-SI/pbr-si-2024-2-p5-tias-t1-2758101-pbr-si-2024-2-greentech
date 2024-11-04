// frontend/src/pages/Home.js
import React from 'react';
import '../styles/App.css';

function Home() {
  return (
    <div className="home-container">
      <main className="main-content">
        <h1>Bem-vindo ao Projeto GreenTech</h1>
        <p>
          Este projeto visa promover a sustentabilidade por meio do uso eficiente de energia solar.
          Nossa aplicação calcula a economia gerada com a instalação de sistemas fotovoltaicos e permite
          aos usuários acompanharem seus consumos e benefícios.
        </p>
      </main>
    </div>
  );
}

export default Home;
