// frontend/src/pages/PluvialEconomyCalculator.js
import React, { useState, useEffect } from 'react';
import { Typography, Button, Input, Form, Divider, Card, Select, message, Modal } from 'antd';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const { Title } = Typography;
const { Option } = Select;

function PluvialEconomyCalculator() {
  const [formData, setFormData] = useState({
    selectedAddressId: '',
    roofArea: '',
  });
  const [addresses, setAddresses] = useState([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [result, setResult] = useState(null); // Estado para armazenar o resultado do cálculo

  // Função para buscar o usuário e endereços
  const fetchUserAndAddresses = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      message.warning('Usuário não autenticado.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/person/${userId}`);
      //const response = await fetch(`http://localhost:8080/person/${userId}`);
      if (!response.ok) throw new Error('Erro ao buscar dados do usuário');
      const data = await response.json();
      setUser(data);
      setAddresses(data.enderecos || []);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserAndAddresses();
  }, []);

  const fetchAddressByCep = async (cep) => {
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
      return {
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || ''
      };
    } catch (error) {
      message.error("Não foi possível buscar o CEP.");
      console.error("Erro ao buscar o CEP:", error);
    }
  };

  const handleUpdateAddresses = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      message.warning('Usuário não autenticado.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/person/${userId}`, {
      // const response = await fetch(`http://localhost:8080/person/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, enderecos: addresses }),
      });
      if (!response.ok) throw new Error('Erro ao atualizar endereços');
      message.success('Endereço atualizado com sucesso!');
      setIsAddressModalOpen(false);
      fetchUserAndAddresses();
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleAddAddress = () => {
    const newAddress = { cep: '', logradouro: '', number: '', bairro: '', cidade: '', estado: '' };
    setAddresses([...addresses, newAddress]);
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index][field] = value;
    setAddresses(updatedAddresses);
  };

  const handleCepBlur = async (index) => {
    const cep = addresses[index].cep.replace(/\D/g, '');
    const addressData = await fetchAddressByCep(cep);
    if (addressData) {
      const updatedAddresses = [...addresses];
      updatedAddresses[index] = { ...updatedAddresses[index], ...addressData };
      setAddresses(updatedAddresses);
    }
  };

  const handleSubmit = async () => {
    if (!formData.selectedAddressId) {
      message.warning('Selecione um endereço antes de continuar.');
      return;
    }
    if (!formData.roofArea) {
      message.warning('Insira a área do telhado para o cálculo.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/pluvial/endereco/${formData.selectedAddressId}/${formData.roofArea}`, {
      //const response = await fetch(`http://localhost:8080/pluvial/endereco/${formData.selectedAddressId}/${formData.roofArea}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao calcular economia pluvial.');
      }
      const data = await response.json();
      setResult(data.pluvialEconomy); // Armazena o resultado do cálculo no estado
      message.success('Cálculo realizado com sucesso!');
    } catch (error) {
      message.error('Erro ao realizar o cálculo: ' + error.message);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <Card bordered style={{ backgroundColor: '#fff' }}>
        <Title level={3} style={{ textAlign: 'center' }}>Calculadora de Economia Pluvial</Title>
        
        {addresses.length === 0 ? (
          <div style={{ backgroundColor: '#fffae6', padding: '16px', borderRadius: '4px', marginBottom: '20px' }}>
            <Typography.Text style={{ color: '#d48806' }}>
              Você ainda não tem um endereço cadastrado. Por favor, adicione um para continuar.
            </Typography.Text>
            <Button type="primary" style={{ marginTop: '10px' }} onClick={() => setIsAddressModalOpen(true)}>
              Cadastrar Novo Endereço
            </Button>
          </div>
        ) : (
          <Form onFinish={handleSubmit} layout="vertical">
            <Divider>Endereço</Divider>
            <Form.Item label="Selecione o Endereço">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Select
                  value={formData.selectedAddressId}
                  onChange={(value) => setFormData({ ...formData, selectedAddressId: value })}
                  placeholder="Selecione um endereço"
                  style={{ flex: 1 }}
                  required
                >
                  {addresses.map((address, index) => (
                    <Option key={index} value={address.endereco_id}>
                      {`${address.logradouro}, ${address.bairro} - ${address.cidade}`}
                    </Option>
                  ))}
                </Select>
                <Button onClick={() => setIsAddressModalOpen(true)} style={{ marginLeft: '10px' }}>
                  Novo Endereço
                </Button>
              </div>
            </Form.Item>
            <Form.Item label="Área de Captação do Telhado (em m²)">
              <Input
                type="number"
                value={formData.roofArea}
                onChange={(e) => setFormData({ ...formData, roofArea: e.target.value })}
                placeholder="Exemplo: 50"
                required
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Calcular Economia Pluvial
              </Button>
            </Form.Item>
          </Form>
        )}

        {/* Exibe o Resultado se Disponível */}
        {result && (
          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f2f5', borderRadius: '8px' }}>
            <Title level={4}>Resultado do Cálculo</Title>
            <p><strong>Consumo no Primeiro Trimestre:</strong> {result.first_quarter_captaion} m³ ou Litros</p>
            <p><strong>Consumo no Segundo Trimestre:</strong> {result.second_quarter_captaion} m³ ou Litros</p>
            <p><strong>Consumo no Terceiro Trimestre:</strong> {result.third_quarter_captaion} m³ ou Litros</p>
            <p><strong>Consumo no Quarto Trimestre:</strong> {result.fourth_quarter_captaion} m³ ou Litros</p>
          </div>
        )}
      </Card>

      {/* Modal para adicionar ou editar endereço */}
      <Modal
        title="Cadastrar Novo Endereço"
        visible={isAddressModalOpen}
        onCancel={() => setIsAddressModalOpen(false)}
        onOk={handleUpdateAddresses}
        okText="Salvar Endereços"
        cancelText="Cancelar"
      >
        <Form layout="vertical">
          {addresses.map((address, index) => (
            <div key={index}>
              <Form.Item label="CEP">
                <Input
                  name="cep"
                  value={address.cep}
                  onChange={(e) => handleAddressChange(index, 'cep', e.target.value)}
                  onBlur={() => handleCepBlur(index)}
                  placeholder="Digite o CEP"
                />
              </Form.Item>
              <Form.Item label="Logradouro">
                <Input
                  name="logradouro"
                  value={address.logradouro}
                  onChange={(e) => handleAddressChange(index, 'logradouro', e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Número">
                <Input
                  name="number"
                  value={address.number}
                  onChange={(e) => handleAddressChange(index, 'number', e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Bairro">
                <Input
                  name="bairro"
                  value={address.bairro}
                  onChange={(e) => handleAddressChange(index, 'bairro', e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Cidade">
                <Input
                  name="cidade"
                  value={address.cidade}
                  onChange={(e) => handleAddressChange(index, 'cidade', e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Estado">
                <Input
                  name="estado"
                  value={address.estado}
                  onChange={(e) => handleAddressChange(index, 'estado', e.target.value)}
                />
              </Form.Item>
              <Divider />
            </div>
          ))}
          <Button type="dashed" onClick={handleAddAddress} block>
            Adicionar Novo Endereço
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default PluvialEconomyCalculator;
