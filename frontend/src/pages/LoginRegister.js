// frontend/src/pages/LoginRegister.js
import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, Typography, Divider, Select, Space } from 'antd';

const { Title } = Typography;
const { Option } = Select;

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true); // Controle de alternância entre Login e Registro
  const [step, setStep] = useState(1); // Controle da etapa (1 - Dados Pessoais, 2 - Endereços)
  const [currentAddressIndex, setCurrentAddressIndex] = useState(0); // Índice do endereço atualmente exibido
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: 'Masculino',
    email: '',
    password: '',
    confirmPassword: '',
    enderecos: [],
  });

  const [currentAddress, setCurrentAddress] = useState({
    cep: '',
    logradouro: '',
    number: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  // Funções de Manipulação de Dados
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  // Função para buscar dados do CEP usando a API do ViaCEP
  const fetchAddressByCep = async () => {
    const cep = currentAddress.cep.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cep.length !== 8) {
      alert("Por favor, insira um CEP válido com 8 dígitos.");
      return;
    }

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert("CEP não encontrado.");
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
      console.error("Erro ao buscar o CEP:", error);
      alert("Não foi possível buscar o CEP.");
    }
  };

  const handleAddAddress = () => {
    // Adiciona o endereço atual ao array e limpa o formulário
    setFormData((prevData) => ({
      ...prevData,
      enderecos: [...prevData.enderecos, currentAddress],
    }));
    setCurrentAddress({
      cep: '',
      logradouro: '',
      number: '',
      bairro: '',
      cidade: '',
      estado: '',
    });
    setCurrentAddressIndex(formData.enderecos.length); // Define o índice do novo endereço
  };

  const handleSaveAddress = () => {
    // Atualiza o endereço atual no array
    const updatedEnderecos = [...formData.enderecos];
    updatedEnderecos[currentAddressIndex] = currentAddress;
    setFormData((prevData) => ({ ...prevData, enderecos: updatedEnderecos }));
  };

  const handlePreviousAddress = () => {
    // Navega para o endereço anterior
    if (currentAddressIndex > 0) {
      setCurrentAddressIndex(currentAddressIndex - 1);
      setCurrentAddress(formData.enderecos[currentAddressIndex - 1]);
    }
  };

  const handleNextAddress = () => {
    // Navega para o próximo endereço
    if (currentAddressIndex < formData.enderecos.length - 1) {
      setCurrentAddressIndex(currentAddressIndex + 1);
      setCurrentAddress(formData.enderecos[currentAddressIndex + 1]);
    }
  };

  const handleSubmit = async () => {
    // Validação de senha
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/person', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
          email: formData.email,
          password: formData.password,
          enderecos: formData.enderecos,
        }),
      });
      const data = await response.json();
      console.log('Usuário registrado com sucesso:', data);
    } catch (error) {
      console.error('Erro ao registrar o usuário:', error);
    }
  };

  // Formulário de Dados Pessoais
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
            <Option value="Masculino">Masculino</Option>
            <Option value="Feminino">Feminino</Option>
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

  // Formulário de Endereços
  const addressForm = (
    <>
      <Title level={4}>Endereço {currentAddressIndex + 1}</Title>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="CEP" required>
            <Input name="cep" value={currentAddress.cep} onChange={handleAddressChange} onBlur={fetchAddressByCep} placeholder="CEP" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Cidade">
            <Input name="cidade" value={currentAddress.cidade} onChange={handleAddressChange} placeholder="Cidade" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Estado">
            <Input name="estado" value={currentAddress.estado} onChange={handleAddressChange} placeholder="Estado" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Logradouro">
            <Input name="logradouro" value={currentAddress.logradouro} onChange={handleAddressChange} placeholder="Logradouro" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Bairro">
            <Input name="bairro" value={currentAddress.bairro} onChange={handleAddressChange} placeholder="Bairro" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item label="Número">
            <Input name="number" value={currentAddress.number} onChange={handleAddressChange} placeholder="Número" />
          </Form.Item>
        </Col>
      </Row>
      <Button.Group style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
        <Button onClick={handlePreviousAddress} disabled={currentAddressIndex === 0}>
          Anterior
        </Button>
        <Button onClick={handleSaveAddress} type="primary">
          Salvar Alterações
        </Button>
        <Button onClick={handleNextAddress} disabled={currentAddressIndex === formData.enderecos.length - 1}>
          Próximo
        </Button>
      </Button.Group>
      <Divider />
      <Space style={{ display: 'flex', justifyContent: 'center' }}>
        <Button type="dashed" onClick={handleAddAddress}>
          Adicionar Novo Endereço
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          Registrar
        </Button>
      </Space>
    </>
  );

  // Formulário de Login
  const loginForm = (
    <>
      <Form.Item label="Email" required>
        <Input name="email" placeholder="Email" />
      </Form.Item>
      <Form.Item label="Senha" required>
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
        <Form layout="vertical" onFinish={isLogin ? undefined : handleSubmit}>
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
