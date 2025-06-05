import { type UserCredential } from "firebase/auth";

type AuthAction = "LOGIN" | "LOGOUT" | "AUTH_IS_READY";

export interface BackendUser {
  uid: string;
  email?: string;
  displayName?: string;
}

export interface IAction {
  type: AuthAction;
  payload: UserCredential["user"] | BackendUser | null;
}

export interface IAuthState {
  user: UserCredential["user"] | BackendUser | null;
  authIsReady: boolean;
}

export const authReducer = (state: IAuthState, action: IAction) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: action.payload };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};
