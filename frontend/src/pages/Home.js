// frontend/src/pages/Home.js
import React from 'react';
import '../styles/App.css';
import RegionsDashboard from '../components/RegionsDashboard';

function Home() {
  return (
    <div style={{ height: 'calc(100vh - 100px)' }}>
      <RegionsDashboard />
    </div>
  );
}

export default Home;
