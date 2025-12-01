import { useState } from "react";
import Logo from "../../../../public/logo.svg";
import { config } from "config";
import { apiFetch } from "utils";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeSlash } from "@phosphor-icons/react";

export const ResetNewPassPage = () => {
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [showSenha, setShowSenha] = useState(false);
    const [showConfSenha, setShowConfSenha] = useState(false);
    const [mensagemErro, setMensagemErro] = useState<string | null>(null);
    const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const token = new URLSearchParams(location.search).get("token");

    async function onSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMensagemErro(null);
        setMensagemSucesso(null);

        if (!token) {
            setMensagemErro("Token inválido ou ausente.");
            return;
        }

        if (senha !== confirmarSenha) {
            setMensagemErro("As senhas não coincidem.");
            return;
        }

        setLoading(true);

        const { data, error } = await apiFetch({
            url: config.apiUrl + "/auth/reset-password/confirm",
            options: {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    token: token,
                    newPassword: senha,
                },
            },
        });

        setLoading(false);

        if (error || !data) {
            console.error(error);
            setMensagemErro("Erro ao redefinir senha. Tente novamente.");
            return;
        }

        setMensagemSucesso("Senha redefinida com sucesso!");

        setTimeout(() => navigate("/login"), 2000);
    }

    const senhasIguais = senha === confirmarSenha && senha.length > 0;

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

                <h1 className="text-[18px] text-center text-gray-500 mt-2">
                    Escolha sua nova senha
                </h1>

                <div className="flex flex-col items-center gap-3 mt-4 w-full max-w-md">
                    <div className="flex flex-col w-full">
                        <span className="mb-1 text-[18px] text-stone-500">Nova senha:</span>
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
                                    <EyeSlash size={22} />
                                ) : (
                                    <Eye size={22} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col w-full">
                        <span className="mb-1 text-[18px] text-stone-500">Confirmar senha:</span>
                        <div className="relative">
                            <input
                                type={showConfSenha ? "text" : "password"}
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                required
                                className={`border ${confirmarSenha.length > 0 && senha !== confirmarSenha
                                    ? "border-red-400"
                                    : "border-gray-300"
                                    } rounded-[75px] p-2 px-4 w-full pr-12`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfSenha((prev) => !prev)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showConfSenha ? <EyeSlash size={22} /> : <Eye size={22} />}
                            </button>
                        </div>

                        {confirmarSenha.length > 0 && senha !== confirmarSenha && (
                            <p className="text-red-500 text-sm mt-1">As senhas não coincidem.</p>
                        )}
                    </div>

                    {mensagemErro && (
                        <p className="text-red-500 text-sm text-center mt-1">
                            {mensagemErro}
                        </p>
                    )}

                    {mensagemSucesso && (
                        <p className="text-green-600 text-sm text-center mt-1 font-semibold">
                            {mensagemSucesso}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !senhasIguais}
                        className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white p-2 rounded-[10px] transition w-70 mt-2"
                    >
                        {loading ? "Salvando..." : "Alterar senha"}
                    </button>
                </div>
            </form>
        </div>
    );
};
