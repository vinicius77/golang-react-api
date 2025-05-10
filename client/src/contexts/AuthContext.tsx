import React, { Dispatch, ReactNode, useReducer } from "react";
import { createContext } from "react";
import { authReducer, IAuthState, IAction } from "../reducers/authReducer";

interface IACPProps {
  children: ReactNode;
}

interface IAuthContext {
  state: IAuthState;
  dispatch: Dispatch<IAction>;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

const AuthContextProvider: React.FC<IACPProps> = (props): JSX.Element => {
  const { children } = props;

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
