// src/pages/Register.js
import React, { useState } from 'react';
import '../styles/App.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    enderecos: [{ logradouro: '', number: '', cep: '', cidade: '', estado: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddressChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEnderecos = [...formData.enderecos];
    updatedEnderecos[index][name] = value;
    setFormData((prevData) => ({ ...prevData, enderecos: updatedEnderecos }));
  };

  const handleAddAddress = () => {
    setFormData((prevData) => ({
      ...prevData,
      enderecos: [...prevData.enderecos, { logradouro: '', number: '', cep: '', cidade: '', estado: '' }]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/person', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log('Usuário registrado com sucesso:', data);
    } catch (error) {
      console.error('Erro ao registrar o usuário:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="Primeiro Nome"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Sobrenome"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="gender"
          placeholder="Gênero"
          value={formData.gender}
          onChange={handleChange}
        />

        <h3>Endereços</h3>
        {formData.enderecos.map((endereco, index) => (
          <div key={index} className="address-fields">
            <input
              type="text"
              name="logradouro"
              placeholder="Logradouro"
              value={endereco.logradouro}
              onChange={(e) => handleAddressChange(index, e)}
            />
            <input
              type="text"
              name="number"
              placeholder="Número"
              value={endereco.number}
              onChange={(e) => handleAddressChange(index, e)}
            />
            <input
              type="text"
              name="cep"
              placeholder="CEP"
              value={endereco.cep}
              onChange={(e) => handleAddressChange(index, e)}
            />
            <input
              type="text"
              name="cidade"
              placeholder="Cidade"
              value={endereco.cidade}
              onChange={(e) => handleAddressChange(index, e)}
            />
            <input
              type="text"
              name="estado"
              placeholder="Estado"
              value={endereco.estado}
              onChange={(e) => handleAddressChange(index, e)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddAddress}>
          Adicionar Endereço
        </button>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default Register;
