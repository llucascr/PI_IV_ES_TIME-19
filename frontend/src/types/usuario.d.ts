export type UsuarioType = {
  id: React.Key;
  name: string;
  email: string;
  cpf: string;
  createAt: string;
  updateAt: string | null;
  active: boolean;
};

export type OrganizacaoByIdType = {
  id: React.Key;
  cnpj: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  createdAt: string;
  updatedAt: string | null;
  active: boolean;
  users: UsuarioType[];
};
