// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { Layout, Menu, message } from 'antd';
import { HomeOutlined, LoginOutlined, CalculatorOutlined, CloudOutlined } from '@ant-design/icons';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import EconomyCalculator from './pages/EconomyCalculator';
import PluvialEconomyCalculator from './pages/PluvialEconomyCalculator'; // Importa o novo componente
import Users from './pages/UserList';
import './styles/App.css';

const { Header, Content } = Layout;

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica se o usuário está autenticado no armazenamento local
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true');
  }, []);

  const handleLogin = (userId) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userId', userId); // Armazena o ID do usuário para referência futura
    setIsAuthenticated(true);
    message.success('Login realizado com sucesso!');
    setCurrentPage('home'); // Navega para a home após o login
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
    setCurrentPage('home');
    message.info('Você foi desconectado.');
  };

  const navigateTo = (page) => {
    // Redireciona para o login se o usuário não estiver autenticado
    const requiresAuth = ['economyCalculator', 'pluvialEconomyCalculator'];
    if (requiresAuth.includes(page) && !isAuthenticated) {
      message.warning('Por favor, faça login para acessar esta funcionalidade.');
      setCurrentPage('login');
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header" style={{ backgroundColor: '#001529', display: 'flex', alignItems: 'center' }}>
        <div className="project-name" style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
          Projeto GreenTech
        </div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[currentPage]} style={{ flexGrow: 1, marginLeft: '20px' }}>
          <Menu.Item key="home" icon={<HomeOutlined />} onClick={() => navigateTo('home')}>
            Home
          </Menu.Item>
          {isAuthenticated && (
            <>
              <Menu.Item key="economyCalculator" icon={<CalculatorOutlined />} onClick={() => navigateTo('economyCalculator')}>
                Calcular Economia Solar
              </Menu.Item>
              <Menu.Item key="pluvialEconomyCalculator" icon={<CloudOutlined />} onClick={() => navigateTo('pluvialEconomyCalculator')}>
                Calcular Economia Pluvial
              </Menu.Item>
              <Menu.Item key="Users" icon={<CloudOutlined />} onClick={() => navigateTo('Users')}>
                Users
              </Menu.Item>
            </>
          )}
        </Menu>
        <Menu theme="dark" mode="horizontal" selectedKeys={[]} style={{ marginLeft: 'auto' }}>
          {!isAuthenticated ? (
            <Menu.Item key="login" icon={<LoginOutlined />} onClick={() => navigateTo('login')}>
              Entrar
            </Menu.Item>
          ) : (
            <Menu.Item key="logout" icon={<LoginOutlined />} onClick={handleLogout}>
              Sair
            </Menu.Item>
          )}
        </Menu>
      </Header>

      <Content style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
        {currentPage === 'home' && <Home />}
        {currentPage === 'login' && <LoginRegister onLogin={handleLogin} />}
        {currentPage === 'economyCalculator' && isAuthenticated && <EconomyCalculator />}
        {currentPage === 'pluvialEconomyCalculator' && isAuthenticated && <PluvialEconomyCalculator />}
        {currentPage === 'Users' && isAuthenticated && <Users/>}
      </Content>
    </Layout>
  );
}

export default App;
