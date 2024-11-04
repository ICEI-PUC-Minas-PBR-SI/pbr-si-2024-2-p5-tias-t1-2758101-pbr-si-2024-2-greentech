// frontend/src/pages/EconomyCalculator.js
import React, { useState } from 'react';
import '../styles/App.css';

function EconomyCalculator() {
  const [formData, setFormData] = useState({
    consumption: [0, 0, 0, 0, 0, 0],
    lastBillConsumption: '',
    lastBillValue: '',
    kwValue: '',
    connection: 'monofasico',
    userId: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/fotovoltaico/calc-economy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setResult(data.payload);
    } catch (error) {
      console.error('Erro ao calcular economia:', error);
    }
  };

  return (
    <div className="register-container">
      <h2>Calculadora de Economia Fotovoltaica</h2>
      <form onSubmit={handleSubmit}>
        <label>Consumo da Última Conta (em kWh):</label>
        <input
          type="number"
          name="lastBillConsumption"
          placeholder="Exemplo: 350"
          value={formData.lastBillConsumption}
          onChange={handleChange}
          required
        />
        
        <label>Valor da Última Conta (em R$):</label>
        <input
          type="number"
          name="lastBillValue"
          placeholder="Exemplo: 250.00"
          value={formData.lastBillValue}
          onChange={handleChange}
          required
        />

        <label>Valor do kWh (em R$):</label>
        <input
          type="number"
          name="kwValue"
          placeholder="Exemplo: 0.75"
          value={formData.kwValue}
          onChange={handleChange}
          required
        />

        <label>Tipo de Conexão:</label>
        <select
          name="connection"
          value={formData.connection}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="monofasico">Monofásico</option>
          <option value="bifasico">Bifásico</option>
          <option value="trifasico">Trifásico</option>
        </select>

        <label>ID do Usuário:</label>
        <input
          type="number"
          name="userId"
          placeholder="Digite o ID do usuário"
          value={formData.userId}
          onChange={handleChange}
          required
        />

        <button type="submit">Calcular Economia</button>
      </form>

      {result && (
        <div className="economy-result">
          <h3>Resultado da Economia</h3>
          <p>Consumo Médio (kWh): {result.averageConsumptionKw}</p>
          <p>Valor Médio da Conta (R$): {result.averageBillValue}</p>
          <p>Iluminação Pública (R$): {result.publicLighting}</p>
          <p>Valor Mínimo da Conta (R$): {result.minBillValue}</p>
          <p>Economia Média (R$): {result.averageBillEconomy}</p>
        </div>
      )}
    </div>
  );
}

export default EconomyCalculator;
