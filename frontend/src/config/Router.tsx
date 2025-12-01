import {
  ErrorPage,
  HomePage,
  LayoutPage,
  LoginPage,
  Praga,
  Cliente,
  Monitoramento,
  Usuario,
  Comunidade,
} from "pages";
import { createBrowserRouter, redirect } from "react-router-dom";
import { getAuthToken } from "../utils/auth";

function isTokenExpired(token: string): boolean {
  try {
    const [, payload] = token.split(".");
    const decoded = JSON.parse(atob(payload));
    if (!decoded.exp) return false;
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch {
    return true;
  }
}

export const Router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: LayoutPage,
     loader: () => {
      const token = getAuthToken();

      if (!token || isTokenExpired(token)) {
        throw redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        Component: HomePage,
        errorElement: <ErrorPage />,
      },
      {
        path: "/usuario",
        Component: Usuario,
        errorElement: <ErrorPage />,
      },
      {
        path: "/praga",
        Component: Praga,
        errorElement: <ErrorPage />,
      },
      {
        path: "/monitoramento",
        Component: Monitoramento,
        errorElement: <ErrorPage />,
      },
      {
        path: "/cliente",
        Component: Cliente,
        errorElement: <ErrorPage />,
      },
      {
        path: "/comunidade",
        Component: Comunidade,
        errorElement: <ErrorPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    id: "login",
    path: "/login",
    Component: LoginPage,
  },
]);
