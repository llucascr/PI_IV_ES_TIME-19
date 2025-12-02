// src/pages/Cliente/form.tsx
import { Button, Input, Select } from "components";
import { config } from "config";
import { useUI } from "context";
import { useState } from "react";
import type { LoteType } from "types";
import { apiFetch, getOrganizacao } from "utils";

type StatusOption = {
    value: "SOLD" | "RESERVED" | "DEACTIVATED";
    name: string;
};

const statusOptions: StatusOption[] = [
    { value: "SOLD", name: "Vendido" },
    { value: "RESERVED", name: "Reservado" },
    { value: "DEACTIVATED", name: "Desativado" },
];

export const FormBatch = ({
    action,
    refetch,
    lote,
    clientId,
}: {
    action: "create" | "update";
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

    const [status, setStatus] = useState<StatusOption>(
        lote
            ? statusOptions.find((s) => s.value === lote.situation) ?? statusOptions[0]
            : statusOptions[0]
    );

    async function onSave(e: any) {
        e.preventDefault();

        const { error } = await apiFetch({
            url: config.apiUrl + "/batch/" + action,
            options: {
                method: action === "create" ? "POST" : "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                params: action === "update" ? { batchId: lote?.id } : undefined,
                data: {
                    name: nome,
                    area: Number(area),
                    situation: status.value,
                    organizationId: getOrganizacao()?.id,
                    clientId,
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
                min={0}
                value={area}
                onChange={(e) => setArea(e.target.value)}
            />

            <Select<StatusOption>
                title="Status"
                field="name"
                id="status"
                value={status.name}
                onChange={(opt) => setStatus(opt)}
                options={statusOptions}
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
