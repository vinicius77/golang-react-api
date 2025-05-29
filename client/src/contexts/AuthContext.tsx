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

  React.useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/profile", {
          credentials: "include", // important: sends cookie
        });

        if (res.ok) {
          const user = await res.json();
          // this will be a plain object from backend, not Firebase `User`, but we'll still accept it
          dispatch({ type: "AUTH_IS_READY", payload: user });
        } else {
          dispatch({ type: "AUTH_IS_READY", payload: null });
        }
      } catch (err) {
        console.error("Session check failed:", err);
        dispatch({ type: "AUTH_IS_READY", payload: null });
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
