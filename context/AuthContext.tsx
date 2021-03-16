import { createContext } from "react";
import { AuthState, AuthActions } from "../store/AuthStore";

export type AuthContextProps = {
  authState: AuthState;
  authActions: AuthActions;
};

const initalState: AuthState = { state: "loading" };
const initalActions: AuthActions = {
  login: () => new Promise((_, reject) => reject("Invalid Context")),
  logout: () => new Promise((_, reject) => reject("Invalid Context")),
};

const AuthContext = createContext<AuthContextProps>({
  authState: initalState,
  authActions: initalActions,
});

export default AuthContext;
