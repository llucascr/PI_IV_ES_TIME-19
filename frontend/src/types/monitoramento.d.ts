export type RecordStatusType =
  | "seedling" // muda recém-plantada
  | "vegetative_growth" // crescimento vegetativo
  | "flowering" // floração
  | "fruiting" // frutificação
  | "ripening" // maturação dos frutos
  | "harvest" // colheita
  | "post_harvest" // pós-colheita
  | "scheduled" // monitoramento programado
  | "in_progress" // em andamento
  | "completed" // finalizado
  | "pending_review" // aguardando validação
  | "cancelled" // cancelado
  | "healthy" // cultivo saudável
  | "at_risk" // sob risco
  | "infested" // infestação confirmada
  | "under_treatment" // em tratamento
  | "recovered" // recuperado
  | "loss"; // perda total

export type RecordType = {
  id: string;
  dataHora: string; // ISO datetime
  developmentStatus: RecordStatusType;
  plantsCount: number;
  evaluatedPlantsCount: number;
  attackedPlantsCount: number;
  infestationPercentage: number;
  observation: string;
  createAt: string;

  user: {
    id: string;
    name: string;
    email: string;
  };

  client: {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
  };

  batch: {
    id: string;
    name: string;
    area: number;
  };

  organization: {
    id: string;
    name: string;
    cnpj: string;
  };

  prague: {
    id: string;
    comumName: string;
    cientificName: string;
  } | null;
};
