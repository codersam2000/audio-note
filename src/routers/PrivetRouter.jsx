import {useContext} from 'react';
import { Navigate } from 'react-router-dom';

import {AuthContext} from '../contexts/Auth'

const PrivetRouter = ({children}) => {
    const authContext = useContext(AuthContext);
    const isLoggedIn = authContext.isUserLoggedIn
  
    return isLoggedIn ? children : <Navigate to = '/account' /> 
}

export default PrivetRouter