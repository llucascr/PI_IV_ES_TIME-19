import { useState } from "react";
import Logo from "../../../../public/logo.svg";
import { config } from "config";
import { apiFetch } from "utils";
import { useNavigate } from "react-router-dom";

export const ResetPassEmailPage = () => {
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [mensagemErro, setMensagemErro] = useState<string | null>(null);
    const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);

    const navigate = useNavigate();

    async function onSave(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMensagemErro(null);
        setMensagemSucesso(null);
        setLoading(true);

        const { data, error } = await apiFetch({
            url: config.apiUrl + "/auth/reset-password",
            options: {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    email: email,
                },
            },
        });

        setLoading(false);

        if (error || !data) {
            console.error(error);
            setMensagemErro("Erro ao enviar email. Verifique se o email está correto.");
            return;
        }

        setMensagemSucesso("Email enviado com sucesso!");

        setTimeout(() => navigate("/login"), 2000);
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

                <h1 className="text-[18px] text-center text-gray-500 mt-2">
                    Insira seu email para a recuperação da senha
                </h1>

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
                        disabled={loading || !email}
                        className="bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white p-2 rounded-[10px] transition w-70 mt-2"
                    >
                        {loading ? "Enviando..." : "Enviar Email"}
                    </button>
                </div>
            </form>
        </div>
    );
};