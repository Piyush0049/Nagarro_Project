import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './components/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MenuPage from './pages/MenuPage';
import Chatbot from './components/chatbot/Chatbot';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Navbar/>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/menu"
            element={
              // <ProtectedRoute>
                <MenuPage />
              // </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <footer className="bg-gray-800 text-gray-400 py-6 text-center">
        <p>© {new Date().getFullYear()} EcoBite Foods. All rights reserved.</p>
      </footer>
      <Chatbot />
    </AuthProvider>
  );
}

export default App;
