import type { SearchHeaderBtnType } from "../types/dataTable";

export const SearchHeaderBtn = ({ item }: { item: SearchHeaderBtnType[] }) => {
  return (
    <div className="flex gap-4 items-center max-lg:flex-wrap">
      {item.map((btn, index) => {
        if (btn.itemJsx) {
          return <div key={index}>{btn.itemJsx}</div>;
        } else {
          return (
            <button
              key={index}
              onClick={() => btn.onClick!()}
              className="cursor-pointer flex items-center gap-2 bg-transparent hover:bg-blue-600 border hover:border-blue-600 border-blue-500 text-blue-600 hover:text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 w-auto"
            >
              {btn.title}
              {btn.icon}
            </button>
          );
        }
      })}
    </div>
  );
};
