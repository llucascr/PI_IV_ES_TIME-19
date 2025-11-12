import type { RecordStatusType } from "types";
import statusDescriptions from "../assets/recordStatus.json";

/**
 * Retorna a descrição legível de um developmentStatus
 * @param {string} status - Valor do enum (ex: "fruiting")
 * @returns {string} - Descrição correspondente
 */
export function getRecordStatusDescription(status: string): string {
  return (
    statusDescriptions[status.toLocaleLowerCase() as RecordStatusType] ||
    "Status desconhecido"
  );
}
