import React from "react";
import type { SvgProps } from "../types/dataTable";

export const CaretDown: React.FC<SvgProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 256 256"
    fill="currentColor"
    stroke="currentColor"
    {...props}
  >
    <path d="m213.66 101.66-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32"></path>
  </svg>
);
