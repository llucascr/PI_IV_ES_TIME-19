import { useState } from "react";
import Logo from "../../../public/logo.svg";

export const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");

  async function onSave(e: any) {
    e.preventDefault();
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSave}
        className="flex flex-col bg-white items-center p-6 rounded-[75px] shadow-lg w-140 pt-2 border-3 border-red-400"
      >
        <img src={Logo} alt="Logo" className="w-30 h-30 mx-auto" />
        <h2 className="text-[24px] font-semibold italic text-center text-red-900 -mt-3">SAFRATECH</h2>

        <div className="flex flex-col items-center gap-3">
          <div className="flex flex-col w-100">
            <span className="mb-1 text-[18px] text-stone-500 text-left">Email:</span>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // placeholder="Digite seu Email"
              required
              className="border border-gray-300 rounded-[75px] p-2"
            />
          </div>

          <div className="flex flex-col w-100">
            <span className="mb-1 text-[18px] text-stone-500">Senha:</span>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              // placeholder="Digite sua senha"
              required
              className="border border-gray-300 rounded-[75px] p-2"

            />
          </div>

          <div className="flex flex-col w-100">
            <span className="mb-1 text-[18px] text-stone-500">CNPJ:</span>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              // placeholder="Digite seu CNPJ"
              required
              className="border border-gray-300 rounded-[75px] p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-[10px] transition w-70"
          >
            Entrar
          </button>
          <a href="#" className="text-red-500 hover:underline">
            Esqueceu a senha?
          </a>
        </div>
      </form>
    </div>
  );
};
