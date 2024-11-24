import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from 'antd';

function RegionsDashboard() {
  const [regions, setRegions] = useState([]);
  const [mostAccessed, setMostAccessed] = useState(null);
  const [viewMode, setViewMode] = useState('cidades'); // Alterna entre cidades e estados
  const [maxAccesses, setMaxAccesses] = useState(1); // Valor máximo de acessos

  useEffect(() => {
    const fetchRegionsData = async () => {
      try {
        const response = await fetch('http://localhost:8080/relatorio/mais-acessados');
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados do servidor');
        }
        const data = await response.json();

        const currentData = data[viewMode] || [];
        setRegions(currentData);

        // Atualiza o valor máximo de acessos
        const maxAccess = Math.max(...currentData.map((region) => region.accesses), 1);
        setMaxAccesses(maxAccess);

        const mostAccessedRegion = currentData.reduce((prev, curr) =>
          prev.accesses > curr.accesses ? prev : curr
        );
        setMostAccessed(mostAccessedRegion);
      } catch (error) {
        console.error('Erro ao buscar os dados das regiões:', error);
      }
    };

    // Atualiza os dados a cada 5 segundos
    const intervalId = setInterval(fetchRegionsData, 5000);
    fetchRegionsData(); // Chamada inicial

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar o componente
  }, [viewMode]);

  const getColor = (accesses) => {
    if (mostAccessed && accesses === mostAccessed.accesses) return 'blue';
    if (accesses > 1000) return 'green';
    if (accesses > 500) return 'orange';
    return 'red';
  };

  const getBorderColor = (accesses) => {
    if (mostAccessed && accesses === mostAccessed.accesses) return 'darkblue';
    return 'darkgray';
  };

  const getRadius = (accesses) => {
    return (accesses / maxAccesses) * 20 || 5; // Escala proporcional ao máximo de acessos
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
        <Button
          type={viewMode === 'cidades' ? 'primary' : 'default'}
          onClick={() => setViewMode('cidades')}
          style={{ marginRight: '10px' }}
        >
          Cidades
        </Button>
        <Button
          type={viewMode === 'estados' ? 'primary' : 'default'}
          onClick={() => setViewMode('estados')}
        >
          Estados
        </Button>
      </div>
      <MapContainer
        center={[0, 0]}
        zoom={3}
        minZoom={3}
        maxZoom={10}
        style={{ height: '100%', width: '100%' }}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {regions.map((region, index) => (
          <CircleMarker
            key={index}
            center={[region.latitude, region.longitude]}
            radius={getRadius(region.accesses)}
            fillColor={getColor(region.accesses)}
            color={getBorderColor(region.accesses)}
            fillOpacity={0.6}
          >
            <Popup>
              <b>{region.name}</b>
              <br />
              Acessos: {region.accesses}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}

export default RegionsDashboard;
