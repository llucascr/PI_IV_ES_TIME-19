export type SelectProps<T> = {
  title: string;
  id: string;
  placeholder?: string;
  field: keyof T & string;
  value: string;
  options: T[];
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  error?: string;
  required?: boolean;
  onChange?: (value: T) => void;
  selected?: T;
  isClearable?: boolean;
  searchable?: boolean;
};
