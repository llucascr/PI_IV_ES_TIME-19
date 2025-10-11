import { MagnifyingGlass } from "@phosphor-icons/react";
import { SearchHeaderBtn, type SearchHeaderType } from "./index";

export const SearchHeader = ({
  inputSearch,
  btnLeft,
  btnRight,
}: SearchHeaderType) => {
  return (
    <>
      <div className="flex items-center justify-between w-full max-lg:gap-2 max-lg:flex-col-reverse">
        {btnLeft && <SearchHeaderBtn item={btnLeft} />}

        {inputSearch && (
          <div className="flex gap-2">
            <div className="max-sm:w-full cursor-pointer flex items-center  bg-input border border-border text-sm rounded-lg p-2.5 w-auto">
              <input
                type="text"
                id="search"
                name="search"
                value={inputSearch.globalFilterValue}
                onChange={(e) =>
                  inputSearch.onGlobalFilterChange(e.target.value)
                }
                className="bg-transparent border-none text-sm focus:outline-none w-full"
                placeholder={
                  inputSearch.placeholder ? inputSearch.placeholder : "Search"
                }
                required
              />
              <span className="flex justify-around items-center">
                <MagnifyingGlass size={24} />
              </span>
            </div>

            {inputSearch.btn && <SearchHeaderBtn item={inputSearch.btn} />}
          </div>
        )}

        {btnRight && <SearchHeaderBtn item={btnRight} />}
      </div>

      <hr className="mt-4" />
    </>
  );
};
