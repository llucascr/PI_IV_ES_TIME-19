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
import { getOrganizacao } from "utils";

interface LayoutProps {
  children?: React.ReactNode;
}

export const LayoutPage = ({ children }: LayoutProps) => {
  const navItemStyle = ({ isActive }: any) =>
    `rounded-lg px-3 py-1.5 text-lg text-gray-700 hover:bg-[#ffc6c6] flex items-center gap-2
  ${isActive ? "bg-[#ffc6c6]  " : "bg-white"}`;

  //foto de perfil do usuario
  const fotoPerfil =
    "data:image/jpeg;base64,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";
  //imagem de perfil teste (data:image/jpeg;base64,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)

  //foto de perfil padrão quando sem foto no perfil do usuario
  const fotoUserDefault =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  //nome do usuário
  const nomeUser = "Fillipe Faria";

  //nome da organização
  const nomeOrg = getOrganizacao()?.name;

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
              <NavLink to="comunidade" className={navItemStyle}>
                <Globe size={28} />
                Comunidade
              </NavLink>
              <NavLink to="cliente" className={navItemStyle}>
                <Farm size={28} />
                Clientes
              </NavLink>
            </nav>
          </div>

          <main className="flex-1 h-full w-full p-4 bg-[#E0E0E0] overflow-auto">
            <div className="bg-white rounded-lg shadow-sm h-full">
              {children}
              <Outlet />
            </div>
          </main>
        </div>
      </UIProvider>
    </NotificationProvider>
  );
};
