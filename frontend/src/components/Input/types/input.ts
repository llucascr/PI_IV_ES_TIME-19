export type inputElementsType<T> = {
  mask?: string;
  field: keyof T;
  title: string;
  iconPosition?: "left" | "right";
  icon?: React.JSX.Element;
} & React.InputHTMLAttributes<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export type InputProps<T> = {
  error?: string;
} & inputElementsType<T>;
