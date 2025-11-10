import { Button, Input } from "components";
import { config } from "config";
import { useCookie } from "hooks";
import { useState } from "react";

export const FormConfiguracao = () => {
  const { setCookie, getCookie } = useCookie();

  const [token, setToken] = useState<string>(
    getCookie(config.tokenCookieNome) || ""
  );

  const [organizacaoId, setOrganizacaoId] = useState<string>(
    getCookie(config.organizacaoCookieNome) || ""
  );

  return (
    <div className="p-4 flex flex-col gap-4">
      <form action="" className="flex flex-col gap-3">
        <Input
          placeholder="Token"
          field="token"
          title="Digite o token"
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />

        <Button
          color="blue"
          title="Adicionar Token"
          type="submit"
          onClick={() => {
            setCookie(config.tokenCookieNome, token, 5);
          }}
          disable={!token}
        />
      </form>

      <hr />

      <form action="" className="flex flex-col gap-3">
        <Input
          placeholder="Organização ID"
          field="organizacaoId"
          title="Digite o ID da Organização"
          type="text"
          value={organizacaoId}
          onChange={(e) => setOrganizacaoId(e.target.value)}
        />

        <Button
          color="blue"
          title="Adicionar Organização ID"
          type="submit"
          onClick={() => {
            setCookie(config.organizacaoCookieNome, organizacaoId, 5);
          }}
          disable={!organizacaoId}
        />
      </form>
    </div>
  );
};
