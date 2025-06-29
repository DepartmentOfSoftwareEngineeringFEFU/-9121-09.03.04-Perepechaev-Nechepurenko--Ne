import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{
      maxWidth: '800px',
      margin: '2rem auto',
      padding: '1rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Профиль пользователя</h1>
      
      <div style={{
        background: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '8px',
        marginTop: '1rem'
      }}>
        <h2>Основная информация</h2>
        <p><strong>Имя:</strong> {user?.username || 'Неизвестно'}</p>
        <p><strong>Роль:</strong> {user?.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>

        <div style={{ marginTop: '2rem' }}>
          <button 
            onClick={logout}
            style={{
              padding: '0.5rem 1rem',
              background: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Выйти
          </button>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <Link to="/">← На главную</Link>
      </div>
    </div>
  );
};

export default ProfilePage;