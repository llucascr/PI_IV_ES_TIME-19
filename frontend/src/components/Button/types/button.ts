import { COLORS } from "../colors";

export interface ButtonProps {
  onClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title: string;
  icon?: JSX.Element;
  positionIcon?: "left" | "right";
  disable?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  color: Color;
  variant?: "solid" | "outline" | "ghost";
}

export type Color = keyof typeof COLORS;
