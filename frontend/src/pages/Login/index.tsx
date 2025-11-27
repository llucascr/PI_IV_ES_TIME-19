import { useState } from "react";
import Logo from "../../../public/logo.svg";
import { config } from "config";
import { apiFetch, saveOrganizacao } from "utils";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { useCookie } from "hooks";
import type { LoginResponse } from "types/login";

export const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [showSenha, setShowSenha] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setCookie } = useCookie();

  async function handleBuscarOrganizacao(organizacaoId: string) {
    const { data, error } = await apiFetch({
      url: config.apiUrl + "/organization/listById",
      options: {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        params: { organizationId: organizacaoId },
      },
    });

    if (error) {
      console.log(error);
    } else {
      saveOrganizacao(data);
    }
  }

  async function onSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMensagemErro(null);
    setLoading(true);

    const { data, error } = await apiFetch<LoginResponse>({
      url: config.apiUrl + "/auth/login",
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email,
          password: senha,
        },
      },
    });

    setLoading(false);

    if (error || !data) {
      console.error(error);
      setMensagemErro("Não foi possível fazer login. Verifique email e senha.");
      return;
    }

    const { token, name, organizationId } = data;

    if (!token) {
      setMensagemErro("Resposta inesperada do servidor.");
      return;
    }

    setCookie(config.tokenCookieNome, token, 5);

    localStorage.setItem("safratechUserName", name);

    handleBuscarOrganizacao(organizationId);

    navigate("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSave}
        className="flex flex-col bg-white items-center p-6 rounded-[75px] shadow-lg w-140 pt-2 border-3 border-red-400"
      >
        <img src={Logo} alt="Logo" className="w-30 h-30 mx-auto" />
        <h2 className="text-[24px] font-semibold italic text-center text-red-900 -mt-3">
          SAFRATECH
        </h2>

        <div className="flex flex-col items-center gap-3 mt-2 w-full max-w-md">
          <div className="flex flex-col w-full">
            <span className="mb-1 text-[18px] text-stone-500 text-left">
              Email:
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 rounded-[75px] p-2 px-4"
            />
          </div>

          <div className="flex flex-col w-full">
            <span className="mb-1 text-[18px] text-stone-500">Senha:</span>
            <div className="relative">
              <input
                type={showSenha ? "text" : "password"}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="border border-gray-300 rounded-[75px] p-2 px-4 w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowSenha((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showSenha ? (
                  <EyeSlash size={22} weight="regular" />
                ) : (
                  <Eye size={22} weight="regular" />
                )}
              </button>
            </div>
          </div>

          {mensagemErro && (
            <p className="text-red-500 text-sm text-center mt-1">
              {mensagemErro}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !email || !senha}
            className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white p-2 rounded-[10px] transition w-70 mt-2"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <a href="#" className="text-red-500 hover:underline mt-1">
            Esqueceu a senha?
          </a>
        </div>
      </form>
    </div>
  );
};
