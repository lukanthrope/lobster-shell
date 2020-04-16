import * as React from 'react';
import * as jwtDecode from 'jwt-decode';

const codedToken:string = localStorage.getItem('jwt');

interface User {
  id: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

type State = {
  user: User;
}
const initialState:State = {
  user: null
}

if (codedToken) {
  const decodedToken: User = jwtDecode(codedToken);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwt');
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = React.createContext({
  user: null,
  login: (data:any) => {},
  logout: () => {},
});

const AuthReducer = (state:State, action:any) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      }
    default: 
      return state;
  }
};

const AuthProvider:React.FC = props => {
  const [state, dispatch] = React.useReducer(AuthReducer, initialState);

  const login = (userData:any) => {
    localStorage.setItem('jwt', userData.token);
    dispatch({
      type: 'LOGIN',
      payload: userData,
    })
  };

  const logout = () => {
    localStorage.removeItem('jwt');
    dispatch({
      type: 'LOGOUT',
    })
  };

  return <AuthContext.Provider 
          value={{ 
            user: state.user, 
            login, 
            logout 
          }} 
          {...props}
        />
};

export { AuthContext, AuthProvider };