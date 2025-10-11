import React, { useEffect, useMemo, useState } from "react";
import {
  Paginator,
  SearchHeader,
  CaretDown,
  CaretRight,
  Check,
  type DataTableProps,
  type SortConfig,
  type Column,
} from "./index";
import moment from "moment";
import { classnames } from "config";
import { SortAscending, SortDescending } from "@phosphor-icons/react";

/**
 * Componente DataTable<T>
 *
 * Exibe uma tabela genérica com suporte a:
 * - Ordenação (por coluna)
 * - Paginação
 * - Seleção de linhas (única ou múltipla)
 * - Expansão de linhas
 * - Filtro global
 *
 * Propriedades principais:
 * - `value`: Dados a serem exibidos (array de objetos).
 * - `columns`: Definição das colunas da tabela (incluindo cabeçalhos, campos e se são ordenáveis).
 * - `globalFilterFields`: Campos a serem filtrados no filtro global.
 * - `globalFilterValue`: Valor de filtro global.
 * - `paginator`: Ativa a paginação (se true).
 * - `rows`: Número de linhas por página (quando paginator é true).
 * - `selectionMode`: Define o modo de seleção ("single" ou "multiple").
 * - `onSelectionChange`: Callback para seleção de uma linha.
 * - `onMultSelectionsChange`: Callback para seleção de múltiplas linhas.
 * - `expandedRows`: Linhas expandidas (para exibir mais detalhes).
 * - `onRowToggle`: Callback para alternar expansão de uma linha.
 * - `rowExpansionTemplate`: Função para conteúdo expandido.
 * - `RowExpansionTemplate`: Componente para o conteúdo expandido
 *
 *  Exemplo de uso:
 * ```js
 * <DataTable
 *   value={data}
 *   columns={columns}
 *   sortField="name"
 *   sortOrder={1}
 *   paginator={true}
 *   rows={10}
 * />
 * ```

 */
export function DataTable<T>({
  value,
  columns,
  globalFilterFields = [],
  globalFilterValue = "",
  emptyMessage = "Nenhum registro encontrado.",
  header,
  paginator = false,
  rows = 5,
  paginatorRight,
  paginatorLeft,
  paginatorBtn,
  scrollable = true,
  sortField,
  sortOrder = 1,
  dataKey,
  multSelections = [],
  selection,
  onSelectionChange,
  onMultSelectionsChange,
  selectionMode,
  expandedRows,
  onRowToggle,
  rowExpansionTemplate,
  RowExpansionTemplate,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: sortField || "",
    direction: sortOrder === 1 ? "asc" : "desc",
  });

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return value;

    return [...value].sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [value, sortConfig]);

  // Global Filtering
  const filteredData = useMemo(() => {
    if (!globalFilterValue || globalFilterFields.length === 0)
      return sortedData;

    return sortedData.filter((row) =>
      globalFilterFields.some((field) => {
        // const value = row[field as keyof typeof row];
        const value = getNestedValue(row, field);

        return value
          ?.toString()
          .toLowerCase()
          .includes(globalFilterValue.toLowerCase());
      })
    );
  }, [sortedData, globalFilterFields, globalFilterValue]);

  // Pagination
  const totalPages = Math.ceil(
    filteredData.length / (paginator ? rows : filteredData.length)
  );
  const paginatedData = filteredData.slice(
    (currentPage - 1) * (paginator ? rows : filteredData.length),
    currentPage * (paginator ? rows : filteredData.length)
  );

  const requestSort = (key: keyof T | string) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction: newDirection });
  };

  const toggleRowSelection = (row: T) => {
    let newSelection: T[] = [];
    if (selectionMode == "multiple") {
      const isSelected = multSelections.some(
        (item) => item[dataKey] === row[dataKey]
      );

      newSelection = isSelected
        ? multSelections.filter((item) => item[dataKey] !== row[dataKey])
        : [...multSelections, row];
    } else if (selectionMode === "single") {
      const isSelected = selection && selection[dataKey] === row[dataKey];
      onSelectionChange?.(isSelected ? undefined : row); // Permite apenas um item
    }

    onMultSelectionsChange?.(newSelection);
  };

  const toggleAllRows = () => {
    const allSelected = paginatedData.every((row) =>
      multSelections.some((item) => item[dataKey] === row[dataKey])
    );
    const newSelection = allSelected
      ? multSelections.filter((item) =>
          paginatedData.every((row) => item[dataKey] !== row[dataKey])
        )
      : [
          ...multSelections,
          ...paginatedData.filter((row) =>
            multSelections.every((item) => item[dataKey] !== row[dataKey])
          ),
        ];
    onMultSelectionsChange?.(newSelection);
  };

  // expanded Row
  const onRowExpand = (row: T) => {
    const isExpandedRow =
      expandedRows?.some((item) => item[dataKey] === row[dataKey]) || false;

    const newExpandedRows = isExpandedRow
      ? expandedRows?.filter((item) => item[dataKey] !== row[dataKey]) || []
      : [...(expandedRows || []), row];

    onRowToggle?.(newExpandedRows);
  };

  // Verifica se a página atual é maior que o total de páginas
  // Se for, ajusta a página atual para a última página disponível
  // ou para a primeira página se não houver páginas
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [totalPages]);

  return (
    <div className="p-4 bg-card rounded-lg shadow-md w-full">
      {/* Header */}
      {header && (
        <SearchHeader
          inputSearch={header.inputSearch}
          btnLeft={header.btnLeft}
          btnRight={header.btnRight}
        />
      )}

      {/* Table */}
      <div className={classnames({ "overflow-x-auto": scrollable })}>
        <table className="w-full border-collapse bg-card text-left text-sm">
          <thead className="bg-accent border-b border-border">
            <tr>
              {selectionMode == "multiple" ? (
                <th className="p-3 flex items-center justify-center">
                  <div className="inline-flex items-center">
                    <label className="flex items-center cursor-pointer relative">
                      <input
                        type="checkbox"
                        className="peer h-6 w-6 cursor-pointer transition-all appearance-none rounded-full bg-card shadow hover:shadow-md border border-secondary-foreground checked:bg-card-foreground checked:border-card-foreground"
                        id="check-custom-style"
                        onChange={toggleAllRows}
                        checked={paginatedData.every((row) =>
                          multSelections.some(
                            (item) => item[dataKey] === row[dataKey]
                          )
                        )}
                      />
                      <span className="absolute text-popover opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <Check />
                      </span>
                    </label>
                  </div>
                </th>
              ) : (
                selectionMode && <th className="py-3"></th>
              )}
              {expandedRows && <th className="py-3"></th>}

              {columns.map((column: Column<T>, index) => (
                <th
                  key={index}
                  className={classnames(
                    "px-4 py-3 font-medium",
                    column.sortable && "cursor-pointer hover:bg-accent-hover",
                    column.field &&
                      sortConfig.key === column.field &&
                      "bg-accent-hover"
                  )}
                  onClick={() => {
                    if (column.sortable && column.field) {
                      requestSort(column.field);
                    }
                  }}
                >
                  <div className="flex items-center">
                    {column.header}
                    {sortConfig.key &&
                      column.field &&
                      sortConfig.key === column.field && (
                        <span className="ml-1 text-sm">
                          {sortConfig.direction === "asc" ? (
                            <SortAscending />
                          ) : (
                            <SortDescending />
                          )}
                        </span>
                      )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/20">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <tr
                    className="hover:bg-accent"
                    // onClick={(e) => {
                    //   e.isPropagationStopped();

                    //   toggleRowSelection(row);
                    // }}
                  >
                    {selectionMode && (
                      <td className="p-4 max-w-4 m-0">
                        <div className="inline-flex items-center">
                          <label className="flex items-center cursor-pointer relative m-0">
                            <input
                              type="checkbox"
                              className="m-0 peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-secondary-foreground checked:bg-card-foreground checked:border-card-foreground"
                              id="check"
                              checked={
                                selection
                                  ? selection[dataKey] === row[dataKey]
                                  : multSelections.some(
                                      (item) => item[dataKey] === row[dataKey]
                                    )
                              }
                              onChange={() => {
                                toggleRowSelection(row);
                              }}
                            />
                            <span className="absolute m-0 text-popover opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                              <Check />
                            </span>
                          </label>
                        </div>
                      </td>
                    )}
                    {expandedRows && (
                      <>
                        <td className="py-3">
                          <button
                            className="flex items-center justify-center text-foreground"
                            onClick={(e) => {
                              // Previne que o clique no botão ative a seleção da linha
                              e.stopPropagation();
                              onRowExpand(row);
                            }}
                          >
                            {expandedRows.some(
                              (expandedRow) =>
                                expandedRow[dataKey] === row[dataKey]
                            ) ? (
                              <CaretDown width={20} height={20} className="" />
                            ) : (
                              <CaretRight width={20} height={20} />
                            )}
                          </button>
                        </td>
                      </>
                    )}

                    {columns.map((column: Column<T>) => {
                      const value = getNestedValue(row, column.field);
                      const date =
                        column.type === "date"
                          ? moment(value).format("DD/MM/YYYY")
                          : column.format
                          ? column.format(value)
                          : value
                          ? value
                          : "-";

                      return (
                        <td
                          key={column.field as string}
                          className="px-4 py-3"
                          onClick={(e) => {
                            if (column.field != "button") {
                              e.isPropagationStopped();
                              toggleRowSelection(row);
                            }
                          }}
                        >
                          {column.body ? column.body(row) : value ? date : "-"}
                        </td>
                      );
                    })}
                  </tr>

                  {/* Renderiza a linha expandida, fora do loop principal */}
                  {expandedRows?.some(
                    (expandedRow) => expandedRow[dataKey] === row[dataKey]
                  ) && (
                    <tr>
                      <td colSpan={columns.length + 2} className="bg-card">
                        {rowExpansionTemplate && rowExpansionTemplate!(row)}
                        {RowExpansionTemplate && (
                          <RowExpansionTemplate data={row} />
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 2} className="text-center py-4">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex gap-4 justify-between items-center max-sm:flex-col">
        {paginatorLeft && <div className="">{paginatorLeft}</div>}

        {/* Paginator */}
        {paginator && (
          <Paginator
            paginatorBtn={paginatorBtn}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}

        {paginatorRight && <div className="">{paginatorRight}</div>}
      </div>
    </div>
  );
}

function getNestedValue<T>(
  obj: T,
  path: Column<T> | string | number | symbol,
  defaultValue: string = "-"
) {
  return path
    .toString()
    .split(".")
    .reduce(
      (acc: any, key: any) =>
        acc && acc[key] !== undefined ? acc[key] : defaultValue,
      obj
    );
}
