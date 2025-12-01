import type { JSX } from "react";

export interface Column<T> {
  header: React.ReactNode;
  field: keyof T | "" | "button";
  body?: (row: T) => React.ReactNode;
  sortable?: boolean;
  format?: (value: keyof T | string) => React.ReactNode;
  type?: "text" | "date";
}

export type RowExpansionTemplate<T> = (row: T) => JSX.Element;
export interface SvgProps extends React.SVGProps<SVGSVGElement> {}

export interface DataTableProps<T> {
  value: T[];
  dataKey: keyof T;
  columns: Column<T>[];
  globalFilterFields?: (keyof T)[] | string[];
  globalFilterValue?: string;
  emptyMessage?: string;
  header?: SearchHeaderType;
  paginator?: boolean;
  rows?: number;
  paginatorLeft?: React.ReactNode;
  paginatorRight?: React.ReactNode;
  paginatorBtn?: { proximo: string; anterior: string; pageOf: string };
  scrollable?: boolean;
  sortField?: keyof T;
  sortOrder?: number;

  selectionMode?: "single" | "multiple";

  multSelections?: T[];
  onMultSelectionsChange?: (selection: T[]) => void;

  selection?: T;
  onSelectionChange?: (selection: T | undefined) => void;

  expandedRows?: T[];
  onRowToggle?: (e: T[]) => void;
  rowExpansionTemplate?: RowExpansionTemplate<T>;
  RowExpansionTemplate?: React.FC<{ data: T }>;
}

export interface SortConfig<T> {
  key: keyof T | string;
  direction: "asc" | "desc";
}

export type SearchHeaderBtnType = {
  onClick?: () => void;
  title?: string;
  icon?: JSX.Element;
  itemJsx?: JSX.Element;
};

export type SearchHeaderType = {
  inputSearch?: {
    placeholder?: string;
    globalFilterValue: string;
    onGlobalFilterChange: React.Dispatch<React.SetStateAction<string>>;
    btn?: SearchHeaderBtnType[];
  };
  btnLeft?: SearchHeaderBtnType[];
  btnRight?: SearchHeaderBtnType[];
};
