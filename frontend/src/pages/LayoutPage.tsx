import { NavLink, Outlet } from "react-router-dom";
import { NotificationProvider, UIProvider } from "context";
import {
  House,
  BugBeetle,
  Users,
  ClipboardText,
  Globe,
  Farm,
} from "@phosphor-icons/react";

interface LayoutProps {
  children?: React.ReactNode;
}

export const LayoutPage = ({ children }: LayoutProps) => {
  const navItemStyle = ({ isActive }: any) =>
    `rounded-lg px-3 py-1.5 text-lg text-gray-700 hover:bg-[#ffc6c6] flex items-center gap-2
  ${isActive ? "bg-[#ffc6c6]  " : "bg-white"}`;

  //foto de perfil do usuario
  const fotoPerfil = "";

  //foto de perfil padrão quando sem foto no perfil do usuario
  const fotoUserDefault =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  //nome do usuário
  const nomeUser = "Fillipe Faria";

  //nome da organização
  const nomeOrg = "Faria's Farm";

  return (
    <NotificationProvider>
      <UIProvider>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar Menu */}
          <div className="w-70 flex flex-col border-r border-slate-200">
            <div className="flex items-center gap-4 bg-white p-4 shadow-sm">
              <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border border-gray-300 bg-gray-200">
                {fotoPerfil ? (
                  <img
                    src={fotoPerfil}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={fotoUserDefault}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              {/* Texto */}
              <div>
                <h1 className="text-xl font-semibold text-black leading-tight">
                  {nomeUser}
                </h1>
                <h2 className="text-sm text-gray-600">{nomeOrg}</h2>
              </div>
            </div>

            <nav className="flex flex-col gap-4 mt-6  px-4">
              <NavLink to="" className={navItemStyle}>
                <House size={28} />
                Visão geral
              </NavLink>
              <NavLink to="usuario" className={navItemStyle}>
                <Users size={28} />
                Lista de usuários
              </NavLink>
              <NavLink to="praga" className={navItemStyle}>
                <BugBeetle size={28} />
                Pragas
              </NavLink>
              <NavLink to="monitoramento" className={navItemStyle}>
                <ClipboardText size={28} />
                Monitoramento
              </NavLink>
              <NavLink to="" className={navItemStyle}>
                <Globe size={28} />
                Comunidade
              </NavLink>
              <NavLink to="cliente" className={navItemStyle}>
                <Farm size={28} />
                Clientes
              </NavLink>
            </nav>
          </div>

          <main className="flex-1 h-screen p-4 w-full bg-[#F3F6FA] overflow-auto">
            {children}
            <Outlet />
          </main>
        </div>
      </UIProvider>
    </NotificationProvider>
  );
};
