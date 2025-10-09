import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: React.ReactNode;
}

export const LayoutPage = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1>Layout</h1>

      <main>
        {children}

        <Outlet />
      </main>
    </div>
  );
};
