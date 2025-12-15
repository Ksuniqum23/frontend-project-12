import { Navigate, useLocation } from 'react-router-dom'
import { tokenService } from '../services/tokenService.js'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ children }) => {
  const location = useLocation()
  const token = useSelector(state => state.auth.token)
  const user = useSelector(state => state.auth.user)
  if (!token || !user) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}

export default PrivateRoute
