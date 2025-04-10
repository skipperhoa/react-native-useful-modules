
import { AUTH_TYPES } from '@/redux/contains/authTypes';
export const loginRequest = (credentials) => ({

    type: AUTH_TYPES.LOGIN_REQUEST,
    payload: credentials
  });
  
  export const loginSuccess = (data) => ({
    type: AUTH_TYPES.LOGIN_SUCCESS,
    payload: data
  });
  
  export const loginFailure = (error) => ({
    type: AUTH_TYPES.LOGIN_FAILURE,
    payload: error
  });
  
  export const logout = () => ({
    type: AUTH_TYPES.LOGOUT
  });
  
  export const checkAuth = () => ({
    type: AUTH_TYPES.CHECK_AUTH
  });

  export const updateMeta = (data) => ({
      type: AUTH_TYPES.UPDATE_META,
      payload: data,
    
  });
  