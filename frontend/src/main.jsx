import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import UploadPage from "./pages/UploadPage";
import AbsorptionPage from './pages/AbsorptionPage';
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import "./styles.css";

// Модифицированный компонент для защиты маршрутов
const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user } = React.useContext(AuthContext);
  
  if (!user) return <Navigate to="/login" replace />;
  
  // Если пользователь админ и запрашивается главная страница - перенаправляем на справочник
  if (!adminOnly && user.role === 'admin' && window.location.pathname === '/') {
    return <Navigate to="/справочник" replace />;
  }
  
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;
  
  return children;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Главная страница - для обычных пользователей */}
          <Route path="/" element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          } />
          
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/upload" element={
            <PrivateRoute>
              <UploadPage />
            </PrivateRoute>
          } />
          
          {/* Основной маршрут для администратора */}
          <Route path="/справочник" element={
            <PrivateRoute>
              <AbsorptionPage />
            </PrivateRoute>
          } />
          
          <Route path="/profile" element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
          
          {/* Старый маршрут /admin можно удалить или оставить как альтернативный */}
          <Route path="/admin" element={
            <PrivateRoute adminOnly>
              <Navigate to="/справочник" replace />
            </PrivateRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);