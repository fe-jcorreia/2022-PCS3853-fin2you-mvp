import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "../services/api";
import Router from "next/router";
import jwt from "jwt-decode";

type User = {
  id: number;
  name: string;
  email: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
  cpf: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<DefaultAuthResponse>;
  signUp: (credentials: SignUpCredentials) => Promise<DefaultAuthResponse>;
  signOut: () => void;
  isAuthenticated: boolean;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode;
};

type DefaultAuthResponse = {
  error: string;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  destroyCookie(undefined, "nextauth.token");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (token) {
      const { data }: { data: { id: number; email: string; name: string } } =
        jwt(token);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      setUser(data);
    }
  }, []);

  async function signUp({
    name,
    email,
    password,
    cpf,
  }: SignUpCredentials): Promise<DefaultAuthResponse> {
    try {
      await api.post("signup", { name, email, password, cpf });
      await signIn({ email, password });
    } catch (err) {
      return { error: "Esse usuário já existe" };
    }
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("login", { email, password });
      const { token } = response.data;

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      const jwtResponse: { data: { id: number; email: string; name: string } } =
        jwt(token);
      setUser(jwtResponse.data);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (err) {
      return { error: "Email ou senha incorretos" };
    }
  }

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, signOut, isAuthenticated, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}
