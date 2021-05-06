import React, { useEffect } from 'react';
import './App.scss';
import Header from './components/layout/Header';
import { getPlaces } from './services/VisitedPlacesService';

function App() {
  useEffect(() => {
    getPlaces().then(r => console.log(r));
  }, [])

  return (
    <div className="app-container">
      <Header></Header>
    </div>
  );
}

export default App;
