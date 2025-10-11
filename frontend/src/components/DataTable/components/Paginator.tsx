import React from "react";

interface PaginatorProps {
  paginatorBtn:
    | { proximo: string; anterior: string; pageOf: string }
    | undefined;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export const Paginator = ({
  paginatorBtn = {
    proximo: "Próximo",
    anterior: "Anterior",
    pageOf: "Pagina {currentPage} de {totalPages}",
  },
  currentPage,
  setCurrentPage,
  totalPages,
}: PaginatorProps) => {
  const pageOf = paginatorBtn.pageOf
    .replace("{currentPage}", currentPage.toString())
    .replace("{totalPages}", totalPages.toString());

  return (
    <div className="flex gap-4 items-center">
      <button
        className="flex items-center justify-center px-3 h-8 text-sm font-medium bg-popover border border-border rounded-lg hover:bg-accent hover:text-accent-foreground"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        {paginatorBtn.anterior}
      </button>
      <span className="text-sm">{pageOf}</span>
      <button
        className="flex items-center justify-center px-3 h-8 text-sm font-medium bg-popover border border-border rounded-lg hover:bg-accent hover:text-accent-foreground"
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        {paginatorBtn.proximo}
      </button>
    </div>
  );
};
