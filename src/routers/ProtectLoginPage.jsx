import {useContext} from 'react';
import { Navigate } from 'react-router-dom';

import {AuthContext} from '../contexts/Auth'

const ProtectLoginPage = ({children}) => {
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext.isUserLoggedIn
  
    return isLoggedIn ? <Navigate to = '/' /> : children 
}

export default ProtectLoginPage