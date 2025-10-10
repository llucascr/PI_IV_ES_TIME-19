import { NavLink, Outlet } from "react-router-dom";
import { UIProvider } from "context";

interface LayoutProps {
  children?: React.ReactNode;
}

export const LayoutPage = ({ children }: LayoutProps) => {
  return (
    <UIProvider>
      <div className="flex h-screen">
        {/* Sidebar Menu */}
        <div className="w-60 flex flex-col border-r border-slate-200">
          <h1>Sidebar Menu</h1>

          <hr />

          <nav className="flex flex-col gap-4 mt-4 px-8">
            <NavLink to="">Home</NavLink>
            <NavLink to="praga">Pragas</NavLink>
          </nav>
        </div>

        <main className="p-4 w-full bg-background">
          <h1>Layout</h1>

          {children}

          <Outlet />
        </main>
      </div>
    </UIProvider>
  );
};
