import { Navigate, useLocation } from 'react-router-dom';
import {tokenService} from "../services/tokenService.js";

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const isAuth = tokenService.isValid();
    if (!isAuth) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return children;
};

export default PrivateRoute;
