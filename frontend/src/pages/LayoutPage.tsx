import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { NotificationProvider, UIProvider } from "context";
import {
  House,
  BugBeetle,
  Users,
  ClipboardText,
  Globe,
  Farm,
  SignOut,
} from "@phosphor-icons/react";
import { getOrganizacao } from "utils";
import { useCookie } from "hooks";
import { config } from "config";
import { useEffect, useState } from "react";

interface LayoutProps {
  children?: React.ReactNode;
}

export const LayoutPage = ({ children }: LayoutProps) => {
  const navItemStyle = ({ isActive }: any) =>
    `rounded-lg px-3 py-1.5 text-lg text-gray-700 hover:bg-[#ffc6c6] flex items-center gap-2
  ${isActive ? "bg-[#ffc6c6]  " : "bg-white"}`;

  const { setCookie } = useCookie();
  const navigate = useNavigate();
  const [nomeOrg, setNomeOrg] = useState<string>("");

  //foto de perfil do usuario
  const fotoPerfil = "";
  //foto de perfil padrão quando sem foto no perfil do usuario
  const fotoUserDefault =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  //nome do usuário
  const nomeUser = localStorage.getItem("safratechUserName") || "Usuário";

  function handleLogout() {
    setCookie(config.tokenCookieNome, "", -1);
    localStorage.clear();
    navigate("/login");
  }

  useEffect(() => {
    const atualizarOrg = () => {
      const org = getOrganizacao();
      if (org) setNomeOrg(org.name);
    };

    atualizarOrg();

    window.addEventListener(config.organizacaoCookieNome, atualizarOrg);

    return () =>
      window.removeEventListener(config.organizacaoCookieNome, atualizarOrg);
  }, []);

  return (
    <NotificationProvider>
      <UIProvider>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar Menu */}
          <div className="w-70 flex-col border-r border-slate-200">
            <div className="p-4 flex items-center gap-4 bg-white shadow-sm">
              <div className="max-w-15 h-15 rounded-full items-center justify-center overflow-hidden border border-gray-300 bg-gray-200">
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

            <hr className="border-gray-300 mt-5" />

            <div className="mt-auto px-4 pb-4 pt-3">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md px-2 py-1.5 transition"
              >
                <SignOut size={18} />
                <span>Sair</span>
              </button>
            </div>
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
