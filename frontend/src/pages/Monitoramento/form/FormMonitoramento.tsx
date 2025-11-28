import { Button, Input, Select } from "components";
import { config } from "config";
import { useUI } from "context";
import { useFetch } from "hooks";
import { useEffect, useState } from "react";
import type {
  ClienteType,
  LoteType,
  PragaType,
  RecordStatusType,
  RecordType,
} from "types";
import { apiFetch, getDateTimeInputFormat, getOrganizacao } from "utils";

type SelectOptionType = {
  value: RecordStatusType;
  name: string;
};

type FormMonitoramento = {
  dataHora: string;
  plantsCount: number;
  evaluatedPlantsCount: number;
  attackedPlantsCount: number;
  infestationPercentage: number;
  observation: string;
};

type FormFields = {
  dataHora: string;
  plantsCount: number;
  observation: string;
  attackedPlantsCount?: number;
  infestationPercentage?: number;
  evaluatedPlantsCount?: number;
};

const optionsDevelopmentStatus: SelectOptionType[] = [
  { value: "scheduled", name: "Agendado" },
  { value: "in_progress", name: "Em Progresso" },
  { value: "infested", name: "Infestação" },
  { value: "loss", name: "Controlado" },
  { value: "completed", name: "Concluído" },
];

export const FormMonitoramento = ({
  action,
  refetch,
  monitoramento,
}: {
  action: "update" | "create";
  refetch: () => void;
  monitoramento?: RecordType;
}) => {
  const [tab, setTab] = useState<"details" | "monitoramento">("monitoramento");
  const ui = useUI();
  const [error, setError] = useState<boolean>(false);

  const [developmentStatus, setDevelopmentStatus] = useState<SelectOptionType>(
    monitoramento
      ? optionsDevelopmentStatus.find(
          (it) => it.value == monitoramento.developmentStatus
        ) ?? optionsDevelopmentStatus[0]
      : optionsDevelopmentStatus[0]
  );

  const [dataLote, setDataLote] = useState<LoteType[]>([]);

  const [cliente, setCliente] = useState<ClienteType>({} as ClienteType);
  const [lote, setLote] = useState<LoteType>({} as LoteType);
  const [praga, setPraga] = useState<PragaType>({} as PragaType);

  const [form, setForm] = useState<FormMonitoramento>({
    dataHora: monitoramento?.dataHora || getDateTimeInputFormat(),
    plantsCount: monitoramento?.plantsCount || 0,
    evaluatedPlantsCount: monitoramento?.evaluatedPlantsCount || 0,
    attackedPlantsCount: monitoramento?.attackedPlantsCount || 0,
    infestationPercentage: monitoramento?.infestationPercentage || 0,
    observation: monitoramento?.observation || "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  const { data: dataPraga } = useFetch<{ data: PragaType[] }>({
    url: config.apiUrl + "/prague/list",
    options: {
      method: "GET",
    },
  });

  const { data: dataCliente } = useFetch<{
    data: ClienteType[];
  }>({
    url: config.apiUrl + "/client/listByOrg",
    options: {
      method: "GET",
      params: {
        idOrganization: getOrganizacao()?.id,
      },
    },
  });

  async function fetchLote() {
    if (!cliente?.id) return;

    const { data: dataLote } = await apiFetch<{ data: LoteType[] }>({
      url: config.apiUrl + "/batch/listBy",
      options: {
        method: "GET",
        params: {
          clientId: cliente.id,
          organizationId: getOrganizacao()?.id,
        },
      },
    });

    setDataLote(dataLote || []);
  }

  const fields: FormFields = {
    dataHora: form.dataHora,
    plantsCount: form.plantsCount,
    observation: form.observation,
  };

  if (action === "update") {
    fields.evaluatedPlantsCount = form.evaluatedPlantsCount;
    fields.attackedPlantsCount = form.attackedPlantsCount;
    fields.infestationPercentage = form.infestationPercentage;
  }

  const isFormValid = Object.values(fields).every((v) => !!v);

  async function onSave(e: any) {
    e.preventDefault();

    if (isFormValid && praga) {
      const { error } = await apiFetch({
        url: config.apiUrl + "/record/" + action,
        options: {
          method: action === "create" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          params: monitoramento
            ? { recordId: monitoramento.id, pragueId: praga.id }
            : { pragueId: praga.id },
          data: {
            userId: localStorage.getItem("safratechUserId"),
            clientId: cliente.id,
            batchId: lote.id,

            dataHora: form.dataHora.includes(":00")
              ? form.dataHora
              : form.dataHora + ":00",
            developmentStatus: developmentStatus.value.toUpperCase(),
            investmentLevel: 1,
            plantsCount: Number(form.plantsCount),
            evaluatedPlantsCount: Number(form.evaluatedPlantsCount),
            attackedPlantsCount: Number(form.attackedPlantsCount),
            infestationPercentage: Number(form.infestationPercentage),
            observation: form.observation,
          },
        },
      });

      if (error) {
        setError(true);
      } else {
        refetch();

        ui.hide("sidebar", `${action}-record`);
      }
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    fetchLote();
  }, [cliente]);

  useEffect(() => {
    if (dataCliente) {
      const cliente = dataCliente.find((c) => c.id == monitoramento?.client.id);

      setCliente(cliente ?? ({} as ClienteType));
    }
  }, [monitoramento, dataCliente]);

  useEffect(() => {
    if (dataLote) {
      const lote = dataLote.find((l) => l.id == monitoramento?.batch.id);

      setLote(lote ?? ({} as LoteType));
    }
  }, [monitoramento, dataLote]);

  useEffect(() => {
    if (dataPraga) {
      const praga = dataPraga.find((p) => p.id == monitoramento?.prague?.id);

      setPraga(praga ?? ({} as PragaType));
    }
  }, [monitoramento, dataPraga]);

  return (
    <form action="" className="flex flex-col gap-4 p-4">
      {tab === "monitoramento" && (
        <>
          <Input
            title="Data e Hora"
            field="dataHora"
            id="dataHora"
            required
            placeholder="Data e Hora"
            type="datetime-local"
            value={form.dataHora}
            onChange={handleChange}
          />

          {dataPraga && (
            <Select<PragaType>
              title="Selecionar Praga"
              field="comumName"
              id="selectPraga"
              value={praga.comumName}
              onChange={(opt) => setPraga(opt)}
              options={dataPraga}
            />
          )}

          <Select<SelectOptionType>
            title="Status do Desenvolvimento"
            field="name"
            id="developmentStatus"
            value={developmentStatus.name}
            onChange={(opt) => setDevelopmentStatus(opt)}
            options={optionsDevelopmentStatus}
          />

          <Input
            title="Quantidade de Plantas"
            field="plantsCount"
            id="plantsCount"
            required
            placeholder="Quantidade de Plantas"
            type="number"
            min={0}
            value={form.plantsCount}
            onChange={handleChange}
          />

          {action == "update" && (
            <>
              <Input
                title="Quantidade de Plantas Avaliadas"
                field="evaluatedPlantsCount"
                id="evaluatedPlantsCount"
                required
                placeholder="Quantidade de Plantas Avaliadas"
                type="number"
                min={0}
                value={form.evaluatedPlantsCount}
                onChange={handleChange}
              />

              <Input
                title="Quantidade de Plantas Atacadas"
                field="attackedPlantsCount"
                id="attackedPlantsCount"
                required
                placeholder="Quantidade de Plantas Atacadas"
                type="number"
                min={0}
                value={form.attackedPlantsCount}
                onChange={handleChange}
              />

              <Input
                title="Porcentual de Infestação"
                field="infestationPercentage"
                id="infestationPercentage"
                required
                placeholder="Porcentual de Infestação"
                type="number"
                min={0}
                value={form.infestationPercentage}
                onChange={handleChange}
              />
            </>
          )}

          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            id="observation"
            placeholder="Observação"
            name="observation"
            value={form.observation}
            onChange={handleChange}
          />
        </>
      )}

      {tab === "details" && (
        <>
          {dataCliente && (
            <Select<ClienteType>
              title="Selecionar Cliente"
              field="name"
              id="selectClient"
              value={cliente.name}
              onChange={(opt) => setCliente(opt)}
              options={dataCliente}
            />
          )}

          {dataLote.length > 0 && (
            <Select<LoteType>
              title="Selecionar Lote"
              field="name"
              id="selectLote"
              value={lote.name}
              onChange={(opt) => setLote(opt)}
              options={dataLote}
            />
          )}
        </>
      )}

      {error && (
        <p className="text-red-500">Não foi possível salvar o monitoramento.</p>
      )}

      <div className="flex justify-end gap-2">
        {tab === "monitoramento" && (
          <>
            <Button
              color="yellow"
              title="Cancelar"
              type="button"
              onClick={() => ui.hide("modal", `${action}-praga`)}
            />
            <Button
              color="blue"
              title="Próximo"
              type="submit"
              onClick={() => {
                setTab("details");
                setError(false);
              }}
              disable={!isFormValid || !praga.id}
            />
          </>
        )}

        {tab === "details" && (
          <>
            <Button
              color="yellow"
              title="Voltar"
              type="button"
              onClick={() => {
                setTab("monitoramento");
                setError(false);
              }}
            />
            <Button
              color="green"
              title="Salvar"
              type="submit"
              onClick={onSave}
              disable={!lote.id || !cliente.id}
            />
          </>
        )}
      </div>
    </form>
  );
};
