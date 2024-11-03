// frontend/src/components/LoginModal.js
import React from 'react';
import '../styles/App.css';

function LoginModal({ onClose, onNavigate }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Login</h2>
        <form>
          <input type="text" placeholder="Usuário" required />
          <input type="password" placeholder="Senha" required />
          <button type="submit">Entrar</button>
        </form>
        <p>
          Não tem uma conta?{' '}
          <button className="link-button" onClick={() => onNavigate('register')}>
            Crie uma agora
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
