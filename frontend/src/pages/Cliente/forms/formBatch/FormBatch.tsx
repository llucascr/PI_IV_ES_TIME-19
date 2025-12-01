// src/pages/Cliente/form.tsx
import { Button, Input } from "components";
import { config } from "config";
import { useUI } from "context";
import { useState } from "react";
import type { LoteType } from "types";
import { apiFetch } from "utils";

export const FormBatch = ({
    action,
    refetch,
    lote,
    clientId,
}: {
    action: "create";
    refetch: () => void;
    lote?: LoteType;
    clientId: React.Key;
}) => {
    const ui = useUI();
    const [error, setError] = useState<boolean>(false);
    const [nome, setNome] = useState<string>(lote?.name || "");
    const [area, setArea] = useState<string>(
        lote?.area !== undefined ? String(lote.area) : ""
    );

    async function onSave(e: any) {
        e.preventDefault();

        const { error } = await apiFetch({
            url: config.apiUrl + "/batch/" + action,
            options: {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: {
                    name: nome,
                    area: Number(area),
                    organizationId: "4b3fe7de-1c28-4fb0-80c3-427ee7d0627e",
                    clientId: clientId,
                },
            },
        });

        if (error) {
            setError(true);
        } else {
            refetch();
            ui.hide("modal", `${action}-lote`);
        }
    }

    return (
        <form action="" className="flex flex-col gap-4">
            <Input
                title="Nome"
                field="nome"
                id="nome"
                required
                placeholder="Nome do lote"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />

            <Input
                title="Área"
                field="area"
                id="area"
                required
                placeholder="Área"
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
            />

            {error && (
                <p className="text-red-500">Não foi possível salvar o lote.</p>
            )}

            <div className="flex justify-end gap-2">
                <Button
                    color="yellow"
                    title="Cancelar"
                    type="button"
                    onClick={() => ui.hide("modal", `${action}-lote`)}
                />
                <Button
                    color="green"
                    title="Salvar"
                    type="submit"
                    onClick={onSave}
                    disable={!nome || !area}
                />
            </div>
        </form>
    );
};
