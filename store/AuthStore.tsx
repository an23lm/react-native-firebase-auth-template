import React, { useEffect, useMemo, useReducer } from "react";
import { View, Text } from "react-native";
import * as SecureStore from "expo-secure-store";

export type AuthState = {
  state: "loading" | "authenticated" | "unauthenticated";
  token?: string;
};
type AuthAction = { type: string; token?: string };
export type AuthActions = {
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

export default function AuthStore() {
  const createAction = (type: string, token?: string) => ({
    type,
    payload: token,
  });

  const [authState, dispatch] = useReducer(
    (state: AuthState, action: AuthAction): AuthState => {
      switch (action.type) {
        case "SET_TOKEN":
          return { state: "authenticated", token: action.token! };
        case "REMOVE_TOKEN":
          return { state: "unauthenticated" };
        case "SET_LOADING":
          return { state: "loading" };
        default:
          return state;
      }
    },
    {
      state: "loading",
      token: undefined,
    }
  );

  const login = async (token: string) => {
    try {
      await SecureStore.setItemAsync("token", token);
      dispatch(createAction("SET_TOKEN", token));
    } catch (err) {
      console.warn(err);
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    dispatch(createAction("REMOVE_TOKEN"));
  };

  const authActions = useMemo<AuthActions>(() => ({ login, logout }), []);

  useEffect(() => {
    SecureStore.getItemAsync("token").then((token) => {
      if (token) dispatch(createAction("SET_TOKEN", token));
      else dispatch(createAction("REMOVE_TOKEN"))
    });
  }, []);

  return { authState, authActions };
}
