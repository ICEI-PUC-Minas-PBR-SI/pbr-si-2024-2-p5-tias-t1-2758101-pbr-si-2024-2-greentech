// frontend/src/pages/Register.js
import React, { useState } from 'react';
import '../styles/App.css';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    enderecos: [{ cep: '', logradouro: '', number: '', bairro: '', cidade: '', estado: '' }]
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

  const fetchAddress = async (index) => {
    const cep = formData.enderecos[index].cep.replace(/\D/g, ''); // Remove caracteres não numéricos

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

      const updatedEnderecos = [...formData.enderecos];
      updatedEnderecos[index] = {
        ...updatedEnderecos[index],
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        estado: data.uf || ''
      };

      setFormData((prevData) => ({ ...prevData, enderecos: updatedEnderecos }));
    } catch (error) {
      console.error("Erro ao buscar o CEP:", error);
      alert("Não foi possível buscar o CEP.");
    }
  };

  const handleAddAddress = () => {
    setFormData((prevData) => ({
      ...prevData,
      enderecos: [...prevData.enderecos, { cep: '', logradouro: '', number: '', bairro: '', cidade: '', estado: '' }]
    }));
  };

  const handleRemoveAddress = (index) => {
    const updatedEnderecos = formData.enderecos.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, enderecos: updatedEnderecos }));
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
              name="cep"
              placeholder="CEP"
              value={endereco.cep}
              onChange={(e) => handleAddressChange(index, e)}
              onBlur={() => fetchAddress(index)}
              required
            />
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
              name="bairro"
              placeholder="Bairro"
              value={endereco.bairro}
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
            {/* Mostrar o botão "Remover Endereço" apenas se houver mais de um endereço */}
            {index > 0 && (
              <button type="button" onClick={() => handleRemoveAddress(index)}>
                Remover Endereço
              </button>
            )}
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
