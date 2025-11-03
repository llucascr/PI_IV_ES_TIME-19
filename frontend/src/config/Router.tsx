import {
  ErrorPage,
  HomePage,
  LayoutPage,
  LoginPage,
  Praga,
  Cliente,
  Monitoramento,
  Usuario,
} from "pages";
import { createBrowserRouter } from "react-router-dom";

export const Router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: LayoutPage,
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
    ],
    errorElement: <ErrorPage />,
  },
  {
    id: "login",
    path: "/login",
    Component: LoginPage,
  },
]);
