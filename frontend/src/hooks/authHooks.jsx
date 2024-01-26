import { useContext } from 'react';
import AuthContext from '../provider/auth.provider';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;