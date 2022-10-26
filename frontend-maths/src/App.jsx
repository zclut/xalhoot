import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Components
import Rooms from './components/Rooms'
import Room from './components/Room'
import SelectUser from './components/SelectUser'

const ProtectedRoute = ({ user,redirectPath = '/', children, }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};


function App() {
  
  const [user, setUser] = useState('')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<SelectUser user={user} onChange={setUser}/>}/>

        <Route path="rooms" element={
          <ProtectedRoute user={user}>
            <Rooms user={user}/>
          </ProtectedRoute>
        }/>

        <Route path="room/:id" element={
          <ProtectedRoute user={user}>
            <Room/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
