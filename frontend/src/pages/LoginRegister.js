// frontend/src/pages/LoginRegister.js
import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Typography, Divider, Select, message } from 'antd';

const { Title } = Typography;
const { Option } = Select;

function LoginRegister({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Feminino',
    email: '',
    password: '',
    confirmPassword: '',
    enderecos: [],
  });

  const [currentAddress, setCurrentAddress] = useState({
    logradouro: '',
    number: '',
    cep: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const fetchAddressByCep = async () => {
    const cep = currentAddress.cep.replace(/\D/g, '');
    if (cep.length !== 8) {
      message.error("Por favor, insira um CEP válido com 8 dígitos.");
      return;
    }
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        message.error("CEP não encontrado.");
        return;
      }
      setCurrentAddress((prevAddress) => ({
        ...prevAddress,
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || ''
      }));
    } catch (error) {
      message.error("Não foi possível buscar o CEP.");
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  const addAddressIfComplete = () => {
    const requiredFields = ["logradouro", "number", "cep"];
    const isAddressComplete = requiredFields.every((field) => currentAddress[field]);
  
    if (isAddressComplete) {
      setFormData((prevData) => ({
        ...prevData,
        enderecos: [...prevData.enderecos, currentAddress]  // Adiciona o novo endereço ao array existente
      }));
      return true;
    } else {
      message.error("Por favor, preencha todos os campos do endereço.");
      return false;
    }
  };

  const handleLogin = async (values) => {
    try {
      const response = await fetch('http://localhost:8080/person/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', data.person.id);
        onLogin(data.person.id);
        message.success('Login realizado com sucesso!');
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error('Erro ao fazer login.');
      console.error(error);
    }
  };

  const handleRegister = async () => {
    console.log(formData)
    if (formData.password !== formData.confirmPassword) {
      message.error('As senhas não coincidem.');
      return;
    }

    if (formData.enderecos.length === 0) {
      const added = addAddressIfComplete();
      console.log(added, "enderecos");
      if (!added) return; // Impede o envio se o endereço não estiver completo
    }

    const { confirmPassword, ...dataToSend } = formData;

    try {
      const response = await fetch('http://localhost:8080/person', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        message.success('Registro realizado com sucesso!');
        setIsLogin(true);
      } else {
        const errorData = await response.json();
        message.error(errorData.message || 'Erro ao registrar o usuário.');
      }
    } catch (error) {
      message.error('Erro ao registrar o usuário.');
      console.error(error);
    }
  };

  const personalInfoForm = (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item label="Primeiro Nome" required>
          <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Primeiro Nome" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Sobrenome" required>
          <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Sobrenome" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Gênero">
          <Select name="gender" value={formData.gender} onChange={(value) => setFormData((prevData) => ({ ...prevData, gender: value }))}>
            <Option value="Feminino">Feminino</Option>
            <Option value="Masculino">Masculino</Option>
            <Option value="Outros">Outros</Option>
          </Select>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Email" required>
          <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Senha" required>
          <Input.Password name="password" value={formData.password} onChange={handleChange} placeholder="Senha" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item label="Confirmar Senha" required>
          <Input.Password name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmar Senha" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Button type="primary" onClick={() => setStep(2)} block>
          Próximo
        </Button>
      </Col>
    </Row>
  );

  const addressForm = (
    <>
      <Title level={4}>Endereço</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Logradouro" required>
            <Input name="logradouro" value={currentAddress.logradouro} onChange={handleAddressChange} placeholder="Logradouro" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Número" required>
            <Input name="number" value={currentAddress.number} onChange={handleAddressChange} placeholder="Número" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="CEP" required>
            <Input name="cep" value={currentAddress.cep} onChange={handleAddressChange} onBlur={fetchAddressByCep} placeholder="CEP" />
          </Form.Item>
        </Col>
      </Row>
      <Divider />
      <Button type="primary" onClick={handleRegister} block>
        Registrar
      </Button>
    </>
  );

  const loginForm = (
    <>
      <Form.Item label="Email" name="email" required>
        <Input name="email" placeholder="Email" />
      </Form.Item>
      <Form.Item label="Senha" name="password" required>
        <Input.Password name="password" placeholder="Senha" />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        Entrar
      </Button>
    </>
  );

  return (
    <Row style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Col span={12} style={{ padding: '40px', textAlign: 'center' }}>
        <Title level={2}>Bem-vindo ao Projeto GreenTech</Title>
        <p>Soluções sustentáveis para um futuro melhor. Cadastre-se para explorar as funcionalidades.</p>
      </Col>
      <Col span={10} style={{ padding: '40px', backgroundColor: '#fff' }}>
        <Title level={3} style={{ textAlign: 'center' }}>{isLogin ? 'Login' : 'Registrar'}</Title>
        <Form layout="vertical" onFinish={isLogin ? handleLogin : handleRegister}>
          {isLogin ? loginForm : step === 1 ? personalInfoForm : addressForm}
        </Form>
        <Divider />
        <Button type="link" onClick={() => { setIsLogin(!isLogin); setStep(1); }} block>
          {isLogin ? 'Não tem uma conta? Registre-se' : 'Já tem uma conta? Faça login'}
        </Button>
      </Col>
    </Row>
  );
}

export default LoginRegister;
