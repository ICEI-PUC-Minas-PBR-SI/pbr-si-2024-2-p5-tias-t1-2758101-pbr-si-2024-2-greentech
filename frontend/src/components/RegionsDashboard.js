import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function RegionsDashboard() {
    const regions = [
        { name: 'São Paulo', latitude: -23.55052, longitude: -46.633308, accesses: 1500 },
        { name: 'Rio de Janeiro', latitude: -22.906847, longitude: -43.172896, accesses: 800 },
        { name: 'Belo Horizonte', latitude: -19.916681, longitude: -43.934493, accesses: 500 },
        { name: 'Curitiba', latitude: -25.428954, longitude: -49.267137, accesses: 400 },
        { name: 'New York', latitude: 40.712776, longitude: -74.005974, accesses: 2000 },
        { name: 'Los Angeles', latitude: 34.052235, longitude: -118.243683, accesses: 1200 },
        { name: 'London', latitude: 51.507351, longitude: -0.127758, accesses: 1700 },
        { name: 'Paris', latitude: 48.856613, longitude: 2.352222, accesses: 1600 },
        { name: 'Berlin', latitude: 52.520008, longitude: 13.404954, accesses: 1100 },
        { name: 'Tokyo', latitude: 35.689487, longitude: 139.691711, accesses: 2500 },
        { name: 'Beijing', latitude: 39.904202, longitude: 116.407394, accesses: 2200 },
        { name: 'Sydney', latitude: -33.868820, longitude: 151.209290, accesses: 1300 },
        { name: 'Cape Town', latitude: -33.924870, longitude: 18.424055, accesses: 900 },
        { name: 'Moscow', latitude: 55.755825, longitude: 37.617298, accesses: 1800 },
        { name: 'Dubai', latitude: 25.276987, longitude: 55.296249, accesses: 1000 },
        { name: 'Mexico City', latitude: 19.432608, longitude: -99.133209, accesses: 1400 },
        { name: 'Buenos Aires', latitude: -34.603722, longitude: -58.381592, accesses: 700 },
        { name: 'Toronto', latitude: 43.651070, longitude: -79.347015, accesses: 900 },
        { name: 'Cairo', latitude: 30.044420, longitude: 31.235712, accesses: 1100 },
        { name: 'Seoul', latitude: 37.566536, longitude: 126.977966, accesses: 2100 },
        { name: 'Singapore', latitude: 1.352083, longitude: 103.819839, accesses: 1500 },
        { name: 'Mumbai', latitude: 19.076090, longitude: 72.877426, accesses: 1900 },
        { name: 'Bangkok', latitude: 13.756331, longitude: 100.501762, accesses: 1200 },
        { name: 'Lagos', latitude: 6.524379, longitude: 3.379206, accesses: 800 },
        { name: 'Istanbul', latitude: 41.008240, longitude: 28.978359, accesses: 1700 },
        { name: 'Rome', latitude: 41.902782, longitude: 12.496366, accesses: 1300 },
        { name: 'Johannesburg', latitude: -26.204103, longitude: 28.047304, accesses: 700 },
        { name: 'Jakarta', latitude: -6.208763, longitude: 106.845596, accesses: 1400 },
        { name: 'Lima', latitude: -12.046374, longitude: -77.042793, accesses: 600 },
        { name: 'Madrid', latitude: 40.416775, longitude: -3.703790, accesses: 900 },
        { name: 'Amsterdam', latitude: 52.367573, longitude: 4.904138, accesses: 1100 },
        { name: 'Lisbon', latitude: 38.722252, longitude: -9.139337, accesses: 800 },
        { name: 'Vienna', latitude: 48.208176, longitude: 16.373819, accesses: 950 },
        { name: 'Hanoi', latitude: 21.028511, longitude: 105.804817, accesses: 750 },
        { name: 'Kuala Lumpur', latitude: 3.139003, longitude: 101.686852, accesses: 650 },
        { name: 'Bangkok', latitude: 13.756331, longitude: 100.501762, accesses: 1400 },
        { name: 'Manila', latitude: 14.599512, longitude: 120.984222, accesses: 1200 },
        { name: 'Baghdad', latitude: 33.315241, longitude: 44.366066, accesses: 500 },
        { name: 'Tehran', latitude: 35.689198, longitude: 51.388973, accesses: 950 },
        { name: 'Rio de Janeiro', latitude: -22.906847, longitude: -43.172896, accesses: 800 },
        { name: 'Belo Horizonte', latitude: -19.916681, longitude: -43.934493, accesses: 500 },
        { name: 'Curitiba', latitude: -25.428356, longitude: -49.273251, accesses: 600 },
        { name: 'Porto Alegre', latitude: -30.034647, longitude: -51.217658, accesses: 450 },
        { name: 'Brasília', latitude: -15.826691, longitude: -47.921822, accesses: 700 },
        { name: 'Fortaleza', latitude: -3.71722, longitude: -38.543556, accesses: 400 },
        { name: 'Salvador', latitude: -12.9714, longitude: -38.5014, accesses: 550 },
        { name: 'Manaus', latitude: -3.101944, longitude: -60.025, accesses: 300 },
        { name: 'Recife', latitude: -8.047562, longitude: -34.877, accesses: 350 },
        { name: 'Belém', latitude: -1.455833, longitude: -48.504444, accesses: 200 },
        { name: 'Goiânia', latitude: -16.686891, longitude: -49.264794, accesses: 450 },
        { name: 'Campinas', latitude: -22.90556, longitude: -47.06083, accesses: 700 },
        { name: 'Florianópolis', latitude: -27.595378, longitude: -48.54805, accesses: 350 },
        { name: 'São Luís', latitude: -2.529688, longitude: -44.302223, accesses: 220 },
        { name: 'Maceió', latitude: -9.66583, longitude: -35.73528, accesses: 280 },
        { name: 'Natal', latitude: -5.79448, longitude: -35.211, accesses: 400 },
        { name: 'João Pessoa', latitude: -7.1195, longitude: -34.845, accesses: 350 },
        { name: 'Aracaju', latitude: -10.947247, longitude: -37.073082, accesses: 320 },
        { name: 'Campo Grande', latitude: -20.46971, longitude: -54.62012, accesses: 280 },
        { name: 'Cuiabá', latitude: -15.59892, longitude: -56.09489, accesses: 250 },
        { name: 'Teresina', latitude: -5.09194, longitude: -42.80336, accesses: 200 },
        { name: 'Macapá', latitude: 0.03889, longitude: -51.06639, accesses: 180 },
        { name: 'Rio Branco', latitude: -9.974722, longitude: -67.808056, accesses: 150 },
        { name: 'Palmas', latitude: -10.1849, longitude: -48.3336, accesses: 130 },
        { name: 'Boa Vista', latitude: 2.819444, longitude: -60.673889, accesses: 110 },
        { name: 'Vitória', latitude: -20.3155, longitude: -40.3128, accesses: 350 },
        { name: 'Santos', latitude: -23.960833, longitude: -46.333889, accesses: 320 },
        { name: 'Uberlândia', latitude: -18.91861, longitude: -48.2772, accesses: 300 },
        { name: 'Ribeirão Preto', latitude: -21.17666, longitude: -47.82083, accesses: 270 },
        { name: 'Sorocaba', latitude: -23.5017, longitude: -47.4578, accesses: 250 },
        { name: 'Joinville', latitude: -26.3044, longitude: -48.8456, accesses: 240 },
        { name: 'Niterói', latitude: -22.8838, longitude: -43.1034, accesses: 230 },
        { name: 'Juiz de Fora', latitude: -21.764, longitude: -43.3504, accesses: 200 },
        { name: 'Londrina', latitude: -23.304, longitude: -51.1695, accesses: 210 },
        { name: 'Caxias do Sul', latitude: -29.1628, longitude: -51.1795, accesses: 180 },
        { name: 'Anápolis', latitude: -16.3281, longitude: -48.9534, accesses: 160 },
        { name: 'Piracicaba', latitude: -22.7253, longitude: -47.6492, accesses: 140 },
        { name: 'Maringá', latitude: -23.4209, longitude: -51.933, accesses: 130 },
        { name: 'Ponta Grossa', latitude: -25.0916, longitude: -50.1616, accesses: 120 },
        { name: 'São José dos Campos', latitude: -23.1896, longitude: -45.8841, accesses: 110 },
        { name: 'Pelotas', latitude: -31.765, longitude: -52.3371, accesses: 105 },
        { name: 'Blumenau', latitude: -26.9186, longitude: -49.0661, accesses: 100 },
        { name: 'Canoas', latitude: -29.9177, longitude: -51.1833, accesses: 95 },
        { name: 'Araraquara', latitude: -21.7849, longitude: -48.1781, accesses: 90 },
        { name: 'Bauru', latitude: -22.3145, longitude: -49.0584, accesses: 85 },
        { name: 'Itaquaquecetuba', latitude: -23.4858, longitude: -46.3488, accesses: 80 },
        { name: 'Caruaru', latitude: -8.2848, longitude: -35.9732, accesses: 75 },
        { name: 'Petrópolis', latitude: -22.5123, longitude: -43.1784, accesses: 70 },
        { name: 'Vila Velha', latitude: -20.3297, longitude: -40.2922, accesses: 65 },
        { name: 'Volta Redonda', latitude: -22.5202, longitude: -44.0995, accesses: 60 },
        { name: 'Foz do Iguaçu', latitude: -25.5428, longitude: -54.5827, accesses: 55 },
        { name: 'Itajaí', latitude: -26.9071, longitude: -48.6616, accesses: 50 },
        { name: 'Chapecó', latitude: -27.0967, longitude: -52.618, accesses: 45 },
        { name: 'Campos dos Goytacazes', latitude: -21.7545, longitude: -41.3311, accesses: 40 },
        { name: 'Governador Valadares', latitude: -18.8516, longitude: -41.9499, accesses: 35 },
        { name: 'Santana', latitude: 0.0599, longitude: -51.1769, accesses: 30 },
        { name: 'Sinop', latitude: -11.8646, longitude: -55.5023, accesses: 25 },
        { name: 'Rondonópolis', latitude: -16.4703, longitude: -54.6351, accesses: 20 },
        { name: 'Palmeira dos Índios', latitude: -9.40567, longitude: -36.6337, accesses: 15 },
      ];

  const mostAccessed = regions.reduce((prev, curr) =>
    prev.accesses > curr.accesses ? prev : curr
  );

  const getColor = (accesses) => {
    if (accesses === mostAccessed.accesses) return 'blue';
    if (accesses > 1000) return 'green';
    if (accesses > 500) return 'orange';
    return 'red';
  };

  const getBorderColor = (accesses) => {
    if (accesses === mostAccessed.accesses) return 'darkblue';
    return 'darkgray';
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={[0, 0]} // Centralizado no mapa-múndi
        zoom={3} // Nível inicial de zoom
        minZoom={3} // Nível mínimo de zoom permitido
        maxZoom={10} // Nível máximo de zoom permitido
        style={{
          height: '100%',
          width: '100%',
        }}
        maxBounds={[
          [-90, -180], // Coordenadas mínimas (sudoeste)
          [90, 180],   // Coordenadas máximas (nordeste)
        ]}
        maxBoundsViscosity={1.0} // Faz o mapa "puxar" de volta ao limite
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {regions.map((region, index) => (
          <CircleMarker
            key={index}
            center={[region.latitude, region.longitude]}
            radius={Math.sqrt(region.accesses)} // Tamanho proporcional ao número de acessos
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
