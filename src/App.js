import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/auth';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" 
              element={<PrivateRoute>
                        <Profile />
                      </PrivateRoute>} 
              />
          <Route path="/" 
              element={<PrivateRoute>
                        <Home />
                      </PrivateRoute>} 
              />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
