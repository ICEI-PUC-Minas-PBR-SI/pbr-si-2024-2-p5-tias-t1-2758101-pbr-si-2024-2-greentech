// frontend/src/App.js
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, LoginOutlined } from '@ant-design/icons';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister';
import './styles/App.css';

const { Header, Content } = Layout;

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header" style={{ backgroundColor: '#001529', display: 'flex', alignItems: 'center' }}>
        <div className="project-name" style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', flexGrow: 1 }}>
          Projeto GreenTech
        </div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[currentPage]} style={{ flexGrow: 2 }}>
          <Menu.Item key="home" icon={<HomeOutlined />} onClick={() => navigateTo('home')}>
            Home
          </Menu.Item>
          <Menu.Item key="login" icon={<LoginOutlined />} onClick={() => navigateTo('login')}>
            Entrar
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
        {currentPage === 'home' && <Home />}
        {currentPage === 'login' && <LoginRegister />}
      </Content>
    </Layout>
  );
}

export default App;
