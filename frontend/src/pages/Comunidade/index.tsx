import React from "react";
import Logo from "../../../public/logo.svg";
import { FormComunidade } from "./form";
import { useFetch } from "hooks";
import type { PostType, UsuarioType } from "types";
import { config } from "config";
import { PostCard } from "./PostCard";

export const Comunidade: React.FC = () => {

    const { data, loaded, refetch } = useFetch<{ data: PostType[] }>({
        url: config.apiUrl + "/post/list",
        options: {
            method: "GET",
            params: {
                page: 0,
                numberOfPragues: 100,
            },
        },
    });

    const { data: user } = useFetch<{ data: UsuarioType[] }>({
        url: config.apiUrl + "/user/list",
        options: {
            method: "GET",
            params: {
                page: 0,
                numberOfPragues: 100,
            },
        },
    });
    console.log(data);
    console.log(user);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                gap: 24,
                minHeight: "100vh",      // fundo ocupa pelo menos a tela
                width: "100%",
                background: "#f3f4f6",   // cor de fundo
                padding: 24,
                boxSizing: "border-box",
            }}
        >
            <aside
                style={{
                    width: 300,
                    background: "#fff",
                    padding: 14,
                    borderRadius: 16,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    height: "fit-content",
                }}
            >
                <h3 style={{ fontWeight: "bold", marginBottom: 12 }}>Sugestões</h3>

                <div style={{ marginBottom: 20 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                        Contas para seguir
                    </h4>
                    {
                        user && (
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 10,
                                }}
                            >
                                {user.map((account, i) => (
                                    <li
                                        key={i}
                                        style={{
                                            padding: 10,
                                            background: "#fafafa",
                                            borderRadius: 12,
                                            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                            gap: 8,
                                        }}
                                    >
                                        <strong>{account.name}</strong>
                                        <button className="bg-[#ffc6c6] hover:bg-rose-300 px-2 py-1 rounded-md"
                                            type="button"
                                            style={{
                                                border: "none",
                                                borderRadius: 8,
                                                padding: "4px 8px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Seguir
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                </div>
            </aside>

            <main style={{ padding: 24, fontFamily: "Inter, system-ui, sans-serif", flex: 1 }}>
                <header style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={Logo} alt="Logo" style={{ width: 48, height: 48 }} />
                    <h1 style={{ fontSize: 24, fontWeight: "bold" }}>Comunidade</h1>
                </header>


                <FormComunidade refetch={refetch} />

                <section style={{ marginTop: 20, maxWidth: 700 }}>
                    {!loaded && !data && <p>Carregando posts...</p>}

                    {loaded && (
                        <p style={{ opacity: 0.6 }}>Nenhuma postagem ainda.</p>
                    )}
                    {
                        data && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {data.map((p) => (
                                    <PostCard key={p.id} post={p} refetch={refetch} />
                                ))}
                            </div>
                        )
                    }
                </section>
            </main>
        </div>
    );
};

