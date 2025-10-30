import { classnames } from "config";
import type { InputProps } from "./types/input";

export function Input<T>({
  field,
  title,
  id,
  type,
  placeholder,
  className,
  value,
  iconPosition,
  icon,
  error,
  ...rest
}: InputProps<T>) {
  return (
    <div className="flex flex-col gap-2">
      {title && (
        <label
          htmlFor={id}
          className={classnames(
            "block mb-2 text-md font-medium text-foreground",
            {
              "text-red-700": error,
            }
          )}
        >
          {rest.required && <span className="text-red-500">* </span>}
          {title}:
        </label>
      )}
      <div
        className={classnames(
          "flex items-center justify-between border border-border text-foreground text-sm rounded-lg w-full",
          {
            "text-red-500 placeholder-red-500 border-red-500 focus:ring-red-500 focus:border-red-500":
              error,
            "p-2.5": icon,
            "bg-input cursor-pointer": !rest.disabled,
            "bg-gray-400/40 cursor-not-allowed": rest.disabled,
          }
        )}
      >
        {iconPosition === "left" && icon}
        <input
          type={type}
          id={id}
          name={String(field)}
          value={value}
          placeholder={placeholder}
          className={classnames(
            "bg-transparent border-none text-foreground text-sm focus:outline-none w-full",
            {
              "ml-3": iconPosition === "left",
              "p-2.5": !icon,
              "cursor-pointer": !rest.disabled,
              "cursor-not-allowed": rest.disabled,
              className: className,
            }
          )}
          // className={`bg-transparent border-none text-foreground text-sm focus:outline-none w-full p-2.5 cursor-not-allowed ${
          //   iconPosition === "left" && "ml-3"
          // } ${className}`}
          onChange={rest.onChange}
          {...rest}
        />
        {iconPosition === "right" && icon}
      </div>
      {error && (
        <div className="mt-2">
          <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
