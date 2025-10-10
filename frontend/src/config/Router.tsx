import { ErrorPage, HomePage, LayoutPage, LoginPage, Praga } from "pages";
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
        path: "/praga",
        Component: Praga,
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
