import { classnames } from "config";
import { COLORS } from "./colors";
import type { ButtonProps } from "./types/button";

export function Button({
  title,
  icon,
  positionIcon,
  color = "green",
  variant = "solid",
  disable = false,
  className,
  type = "button",
  onClick = () => {},
}: ButtonProps) {
  const colorSet = COLORS[color][variant];

  const classes = classnames(
    "cursor-pointer flex items-center justify-center gap-2 text-md font-bold rounded-lg p-2.5 w-auto border transition-colors duration-150",
    colorSet.bg,
    colorSet.hover,
    colorSet.text,
    colorSet.border,
    {
      "opacity-50 cursor-not-allowed": disable,
    },
    className
  );

  return (
    <button
      type={type}
      onClick={(e) => !disable && onClick?.(e)}
      disabled={disable}
      className={classes}
    >
      {positionIcon === "left" && icon}
      {title}
      {positionIcon === "right" && icon}
    </button>
  );
}
