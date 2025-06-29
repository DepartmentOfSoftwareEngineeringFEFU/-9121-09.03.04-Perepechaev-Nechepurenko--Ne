import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function AdminPage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Панель администратора</h1>
      <p>Добро пожаловать, {user?.username}!</p>
      <button onClick={logout}>Выйти</button>
      <div>
        <h2>Привилегированный контент</h2>
        <p>Только администраторы могут видеть этот контент.</p>
      </div>
    </div>
  );
}