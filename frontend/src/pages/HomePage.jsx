import { Link } from "react-router-dom";
import UploadForm from "../components/UploadForm";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function HomePage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="page" style={{ 
      maxWidth: 700, 
      margin: "40px auto", 
      padding: "0 20px", 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
      color: "#333" 
    }}>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px',
        paddingBottom: '15px',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#2c3e50' }}>Главная</Link>
          <Link to="/справочник" style={{ textDecoration: 'none', color: '#2c3e50' }}>Справочник</Link>
          {user?.role === 'admin' && (
            <Link to="/admin" style={{ textDecoration: 'none', color: '#2c3e50' }}>Админ</Link>
          )}
        </div>
        
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ color: '#3498db' }}>{user.username}</span>
            <button 
              onClick={logout}
              style={{
                padding: '5px 10px',
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Выйти
            </button>
          </div>
        ) : (
          <Link 
            to="/login" 
            style={{
              padding: '5px 10px',
              background: '#2ecc71',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Войти
          </Link>
        )}
      </div>

      <h1 className="title" style={{ 
        textAlign: "center", 
        color: "#2c3e50", 
        marginBottom: 20 
      }}>
        Система подбора акустических материалов
      </h1>

      <p style={{ 
        fontSize: 18, 
        lineHeight: 1.6, 
        marginBottom: 20 
      }}>
        Добро пожаловать{user ? `, ${user.username}` : ''}! Этот сайт предоставляет удобный инструмент для загрузки проекта помещения, после чего автоматически рассчитываются параметры реверберации (RT), объем помещения, а также формируются персонализированные рекомендации по выбору оптимальных акустических покрытий.
      </p>

      {user ? (
        <>
          <p style={{ 
            fontSize: 16, 
            marginBottom: 10, 
            fontWeight: "600", 
            color: "#34495e" 
          }}>
            Загрузите ваш проект прямо здесь:
          </p>
          <UploadForm />
        </>
      ) : (
        <div style={{
          background: '#f8f9fa',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <p style={{ marginBottom: '15px' }}>
            Для доступа к функционалу загрузки проекта необходимо авторизоваться
          </p>
          <Link 
            to="/login" 
            style={{
              padding: '10px 20px',
              background: '#2ecc71',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              display: 'inline-block'
            }}
          >
            Войти в систему
          </Link>
        </div>
      )}

      <p style={{ 
        marginTop: 40, 
        fontSize: 14, 
        color: "#7f8c8d", 
        textAlign: "center" 
      }}>
        © 2025 Система подбора акустических материалов. Все права защищены.
      </p>
    </div>
  );
}
