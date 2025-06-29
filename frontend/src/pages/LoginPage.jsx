import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(credentials.username, credentials.password);
      if (success) {
        navigate('/');
      } else {
        setError('Неверные учетные данные');
      }
    } catch (err) {
      setError('Произошла ошибка при входе');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#4F46E5"/>
            <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#4F46E5"/>
          </svg>
          <h2 style={styles.title}>Вход в систему</h2>
        </div>
        
        {error && (
          <div style={styles.error}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="username" style={styles.label}>Имя пользователя</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              style={styles.input}
              placeholder="Введите имя пользователя"
              required
            />
          </div>
          
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              style={styles.input}
              placeholder="Введите пароль"
              required
            />
          </div>
          
          <button 
            type="submit" 
            style={styles.button}
            disabled={isLoading}
          >
            {isLoading ? (
              <span style={styles.loader}></span>
            ) : 'Войти'}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.helpText}>Тестовые пользователи:</p>
          <div style={styles.userList}>
            <div style={styles.userBadge}>
              <span style={styles.userRole}>Пользователь</span>
              <span>user / user123</span>
            </div>
            <div style={styles.userBadge}>
              <span style={{ ...styles.userRole, background: '#9333EA' }}>Администратор</span>
              <span>admin / admin123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Стили компонента
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#F3F4F6',
    padding: '20px'
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    padding: '32px',
    width: '100%',
    maxWidth: '400px'
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '24px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#111827',
    marginTop: '16px',
    marginBottom: '0'
  },
  error: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px',
    backgroundColor: '#FEE2E2',
    color: '#DC2626',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '14px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151'
  },
  input: {
    padding: '12px',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
    ':focus': {
      borderColor: '#4F46E5',
      boxShadow: '0 0 0 3px rgba(79, 70, 229, 0.1)'
    }
  },
  button: {
    backgroundColor: '#4F46E5',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '44px',
    ':hover': {
      backgroundColor: '#4338CA'
    },
    ':disabled': {
      backgroundColor: '#A5B4FC',
      cursor: 'not-allowed'
    }
  },
  loader: {
    border: '3px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    borderTop: '3px solid white',
    width: '20px',
    height: '20px',
    animation: 'spin 1s linear infinite',
    '@keyframes spin': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' }
    }
  },
  footer: {
    marginTop: '24px',
    borderTop: '1px solid #E5E7EB',
    paddingTop: '20px'
  },
  helpText: {
    fontSize: '14px',
    color: '#6B7280',
    marginBottom: '12px',
    textAlign: 'center'
  },
  userList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  userBadge: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: '8px 12px',
    borderRadius: '6px',
    fontSize: '13px'
  },
  userRole: {
    backgroundColor: '#3B82F6',
    color: 'white',
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500'
  }
};