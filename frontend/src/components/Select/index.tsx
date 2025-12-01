import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import { BroomIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import type { SelectProps } from "./types/select";
import { classnames } from "config";
import { Button, Input } from "components";

function getNested(obj: any, path: string) {
  return path.split(".").reduce((o, key) => (o ? o[key] : undefined), obj);
}

export function Select<T>({
  field,
  title,
  id,
  placeholder,
  value,
  options,
  icon,
  iconPosition = "right",
  error,
  required,
  onChange,
  selected,
  isClearable,
  searchable = false,
}: SelectProps<T>) {
  const [search, setSearch] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string>("");

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: T) => {
    onChange?.(val);
    setOpen(false);
  };

  useEffect(() => {
    setLabel(value);
  }, [value]);

  return (
    <div className="flex flex-col gap-2 w-full relative" ref={containerRef}>
      {title && (
        <label
          htmlFor={id}
          className={classnames("block text-md font-medium text-foreground", {
            "text-red-700": error,
          })}
        >
          {required && <span className="text-red-500">*</span>}{" "}
          {title ? `${title}:` : ""}
        </label>
      )}

      <div
        className={classnames(
          "cursor-pointer flex items-center justify-between bg-input border border-border text-foreground text-sm rounded-lg w-full p-2.5 pr-8",
          { "border-red-500": error }
        )}
        onClick={() => setOpen(!open)}
      >
        {iconPosition === "left" && icon}
        <span
          className={`flex-1 first-letter:uppercase ${
            iconPosition === "left" && "ml-3"
          }`}
        >
          {label ? label : placeholder || "Selecione..."}
        </span>
        {iconPosition === "right" && icon}
      </div>

      {open && (
        <ul className="absolute top-full left-0  w-[600px] max-h-72 overflow-y-auto border border-border rounded-lg bg-card z-10 shadow-lg mt-1">
          <li
            key={v4()}
            className="p-3 cursor-pointer text-foreground first-letter:uppercase"
            onClick={() => isClearable && handleSelect({} as T)}
          >
            {placeholder || "Selecione..."}
          </li>
          {searchable && (
            <li className="px-2 cursor-pointer text-foreground flex gap-2 items-center justify-start">
              <div className="flex-1">
                <Input
                  field=""
                  title=""
                  placeholder="Buscar"
                  icon={<MagnifyingGlassIcon />}
                  iconPosition="left"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                />
              </div>
              <Button
                color="blue"
                title=""
                icon={<BroomIcon />}
                positionIcon="left"
                onClick={() => handleSelect({} as T)}
                className="m-0"
              />
            </li>
          )}
          {options
            .filter((opt) => {
              const fieldValue = getNested(opt, field);
              return String(fieldValue)
                .toLowerCase()
                .includes(search.toLowerCase());
            })
            .map((opt) => (
              <li
                key={v4()}
                className={classnames(
                  "p-2 hover:bg-primary cursor-pointer first-letter:uppercase",
                  {
                    "bg-primary":
                      getNested(opt, field) === value ||
                      selected?.[field] === opt[field],
                  }
                )}
                onClick={() => handleSelect(opt)}
              >
                {getNested(opt, field)}
              </li>
            ))}
        </ul>
      )}

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
