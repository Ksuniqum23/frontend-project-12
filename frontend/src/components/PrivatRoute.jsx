import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    // Проверяем есть ли токен в localStorage
    const token = localStorage.getItem('authToken');

    // Если токена нет - редирект на /login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Если токен есть - показываем защищенный контент
    return children;
};

export default PrivateRoute;
