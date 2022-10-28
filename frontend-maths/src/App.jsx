import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import GLOBE from 'vanta/dist/vanta.globe.min'
import * as THREE from "three"

// Components
import Rooms from './components/Rooms'
import Room from './components/Room'
import SelectUser from './components/SelectUser'
import Game from './components/Game'

const ProtectedRoute = ({ user, redirectPath = '/', children, }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};


function App() {

  const [vantaEffect, setVantaEffect] = useState(0);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        GLOBE({
          el: '#root',
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minWidth: 200.00,
          minHeigth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: '#b9a300',
          size: 0.50,
          backgroundColor: '#000'
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const [user, setUser] = useState('')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<SelectUser user={user} onChange={setUser} />} />

        <Route path="rooms" element={
          <ProtectedRoute user={user}>
            <Rooms />
          </ProtectedRoute>
        } />

        <Route path="room/:id" element={
          <ProtectedRoute user={user}>
            <Room />
          </ProtectedRoute>
        } />

        <Route path="room/:id/game" element={
          <ProtectedRoute user={user}>
            <Game />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App
