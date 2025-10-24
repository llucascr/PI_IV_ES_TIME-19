import { NavLink, Outlet } from "react-router-dom";
import { UIProvider } from "context";
import { House, BugBeetle, Users, ClipboardText, Globe, Farm} from "@phosphor-icons/react";


interface LayoutProps {
  children?: React.ReactNode;
}

export const LayoutPage = ({ children }: LayoutProps) => {
  const navItemStyle = ({isActive}:any) =>
  `rounded-lg px-3 py-1.5 text-lg text-gray-700 hover:bg-[#ffc6c6] flex items-center gap-2
  ${isActive ? "bg-[#ffc6c6]  " : "bg-white"}`;
  
  //foto de perfil do usuario
  const fotoPerfil = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAuwMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xAA7EAABBAEDAgMGBQEGBwEAAAABAAIDBBEFEiEGMRNBUSIyYXGBkQcUFSOhUjNyssHR4SRCQ1OSsfEl/8QAGgEAAwEBAQEAAAAAAAAAAAAAAQIDBAAFBv/EACcRAAMAAgEDBAICAwAAAAAAAAABAgMRIQQSMRMiMkFRYSOBBTNx/9oADAMBAAIRAxEAPwDjWERCcwiwo7PUcDZCLySyEMcI7JuBdKB09hrWA4yCT8Fc3HbSQPJDQozHUkmyNpOOyjXHOc7OOFWUY8j2xD5nBvCIWAW4I5SGRSvHMbsfJE6pOACY3j6Jtk9EqOw2KrJ/U4pmIB4c7IBceT6KP4Mvo5DEjAQGn4oMGi8Zfq0YgyHDnY5cobtSknf7ZIZlV3hOxktcnGNI8ly0Fpk2vJiQjPBPmrSPa6tIx3uv4KpWAhwJB4PorGOwxzWtI5xgrmkDZnb1J9Sd7HAbc+yfUKKtV1BUc/SmztH9iBk/A4CyqDWh5fAEEEMIBCQRlEuOAggguOCKJGUSIhZokAjWY9rQkhERjnGfglo2DL2j1cAihangvJAK1BkLRtaAHY9SmdIqP1C7g8MHc47qZqMDvZceSBwFadLRbGSuI5zjKvT1J5Urd8lrHUjiYAyNoGPRNzV2ke6PqFM3YSHyDHKzujVMJlUakeeY2/ZA1ID/ANJv2U5xDhwkGNym8jLrDJBFGH/thOsowHvE37KYGHKX7IHxRm2LeJIi/otSwCHAtz6LP6ppn6dba3duY4ZC2EMmCOVWdXxCWpFMPfacAq009mXJC0VTo/G0O6MbiYSB9lhAt/pQMkUkYxjBDm54KwLm7HOafeacFWb2Z5AgiQQKAKJGguAEgjRLjgiiSsIsIi6LEI0EFmPaAlwjM0Q9Xgfykqx0qgLle3NuIfWDXtZ2Du5P8BFC3xLNvFpLLlN1rnh20k/IIVIWVdwjOADj5hXnTDvzXTtuNp/ca7c3zzwFSSNLJXGTDRncUMrejDhSbbHz7SM1XubkZ+yq7OpXme1S06WSId39yVCb1xPSmEOpaa4M9WHB/lS9O2W9WJfJeCIsPKdDMhDTta0vWGf8I/Eg58Nww5THxASAevZRpUnyaZqaW0QXtI7JsRSuOcKxmfXqt8Sw4N+apLvWWjVXFsQkleP6G8JoVV4FyXE+SaIywglC3X/OV3RHz7Kkg6vhtS7jTlEWcbmjK0lAstMbJXfvY49/RXSpeUZqctcFbR0iXTqk0koByNwPw/8Ai5bZO61MR5yOP8rvfV8bafRckrc+IORt78crhN6jZ0+YQ3InRvLQ8A+YPYrRJjaIyNBBEbQERRoFEASJGiXAAjRILjixRhDKCznshrQ9HAvuGAN3eLJE0t9Rkg/wVnwrrpGYQa02Q/8ALE93/iNw/wAKWvAWto6z0rpoqRWooHh1V7fYcPJvA/hUWpyQR2PCJH7ZOSPNXHQs0z6Wob2gMhZujx6O/wBx/KylwOnnkPqVO6fajHjnV0Oy65E3MYxge8BgbfmVUWNThvPfC6Nkzc4PLXhP6bpza2qNvNZHO+E7hDaG5j/p5H4qHQsQaTrVi/qOmUbEDiSICxrdvBA9vHbnnAyThPEy/L5Bd5E+FwPaLV0tuoRur4gmHlnAK2O6MnHiA481ymkZZ9QfaYXNa13sjfu49M45W1hfO2NuXeXop5Vp+SuDdfWiZrdWtMzxLkrmsxxtOOFnY4dFrOMw0+NzBj9yd2c/dJ1108sAG84YSfghK+O/0zFptahH+dEhLrMm1+9pGPmHDyx8U+NceSWXh+DVafq2nPpNZ4bGsHGQ0ED6jgK06bq122XhnuSkDjt81m4NIldo1cCvS0+cSPkfZhJ3EE8RtZ2DfnnueyldOPsVb1eEyh7BIBkLtqaWmBS6l8aNd1vQM2n0qzsitE98sxH9DG7j9yFwzq+w+zqzXuc44rxgBxzgEZx/JXoHraYRXacOD4bq0rnc4xlu3P3K856u4yanYPkx2wfTj/JaE/cRU7x/2QMIEJZGAkFMK0EgggiKEiwlIIg0JwglIlxxYIwkhGFnPXQpT9DONVrjvvJYR8CCD/7VeE/TnNW3DYaMuieHAHzwgM3pHYOhW2YaXUNOQh4hiBhdny5VNUbmxzjk+av/AMMtR0/UbWpsqvyZKuZGuHuknzVTJE2vacGngFRyLUozY3u6Q9aojwfEPIWe/S4L9vww1jT6kLV35s0f2++3lZyqCy3v88pN6LqUxv8ATq0E4ZHgiM98dyrCNoIJzlFBVs2LDnsj/azjdjhXH6a+F7I8sLXDggjB+qlTbZZdqWkZsxt8XBHB8kiTTYon7owGg87VcanpNqNzX1mNdgkkNIcoNh/9mC3G4Zx5Jk2ibUtjlOm+XHOQPVWOm1DFqMGByHg5StK9mDJV7oVL81aY4jgOHKeVtpkslKZZUfihddH1E2Z2BWoVBI8Z95zs4b9TtXEQC5xc45J5J9V1z8aZYGSW2hw/MTWIm7QeSxsYP+YXJgtS42yGNJpCHNTTmkKSkkJ0w1iRGwhhOuCbITpmeo0JKJAokxJgRI0FwCclZSUFnPVTFoHsiCUuHXJ0D8F3llzXmj3jSBb9HH/VWFqV4mcD3z2Wf/CSyK/W0MDjgXIJIMHsTjcP8K1OswGC9Mx3cEgBJn+KZmxLtyNDUMvjMEfqnqleJj+3+5VW+2yhWmsvbkRMyB6qig1LU9Y3+DM2MNGTl4aB8MqEQ6Wyt5FD0aLWJfADBFqDoIslzowcZPzCcoa+xtctFhkkbAQJXyDOfLPCoJ+mXWmB93U/GkHO6PgY+aiN6XqFzomGU5I9lrzz9FZTOuSX8je0i6pa3BJdc1l+w5zfecXZ3/DHkp13wLEYMXvM90KJS6EqmJnhVb75nZwYWOPbv5Kp1muOnntMd2Te7a4V5mOa/afMArnjVPgCyVPy0aitPiBrfXGFudEcWR1oWe9I4E/ALn+mu8fTq7nNDXukycLf9Jlpsy2JvZZEAA4+WBypwtM7M9ycY/FZ3ifiLrIzlrJGNHPbEbAsuArDqK+dW6j1PUScizakkb/dLjj+MKEAtLZTBj9gnCJwTm1EWobLOBhwTZClFvCZc1OmZ8mMYIRYTpakEJ9mZzobQSiEWESTRMQRFGFE9L7FBKCIBKASsrKJWlXpdL1WnqEAzJVmbK0f1YPI+vb6rrfVFmC/+W1Kmd0U8Yc0j0+PxXHMLqXS1OO10DUfu2yxPl79iN5Qa7lolllS1RU22/mKk0R7OCR0xv6Utm/XrssxSNxNDIMg88Eeiuhp58MkEE4yiqtbyxzcjzBUlufAntp8mppddVXwhtvR2siMLI90Y3Akd/p6K3k606ebMyxHC8vDCPZg5+651qMzabctjeGk87Of4VYNYh3hu2X4eyn73+Aehh+9nRbX4gyiN76GjkRjfiSV2OT2P+q55e02z1Dqk2r6zkzSOHhsHDWNGMYHpwtBpk4sRh0jHuA7eJ2H0SpzvmDQO58kHdfTB6eOXwhmOuIzHGwYa0cAJPWXUn6LoL9Nquxeugg7Tyxh7n69gr6rVG5ucbjgLk3WkMkfVeoh297GS4a488YCMT9gnWS+0oo24AS8JQx5I8ItnpzGlwIwhhKwiXB0JcE04J1wSCEyZHIhkhILU65IcnTMdyhstRbU4iT7JOEKJTjBwmzyVIjb7Km+Eaca3QAEaPCchryTSBrGklLpsvtIQF1npuF1foSBjwWkhziD5ZcVz2nXirvLrGHSj3fRpXR6dlj+loGh44YAfmqdnbOzHmzK6Uor6moOhcY5hmLtk+Scc5jXgsPBGcque3KiWWP2/tu2nKzbGa1yi+mex0JLgMKqa2r44Ja3Ko7V69GSHA7fgo352c/8p5+CftRKsn5R0KtNG+INYQAPNMG9BDZaCQSD6d1kabtRmG1u5jfUq2qVPCG57y557kpe1I5N0a6hqMT7DXSvDB8T2WK1izHL1Jd9toa9+WuxxnAU8khpDVltUOzUpAeQ4Aq2F7BX8bVFtYhYR+7Uik+IaquelReeGyQu9PIJypPbii3RnxY/6T3HyTn6pA44swFh+KO9PTR6WNTa3L1/0qbFExe5I2Rvw7qGWEHBGFo3Q07DT4MgB74yo/6a7scOaupRraHUZk+VtfoonBNlXcujv7t5UR2myhxB7pFJ1y/tFU5IKn2aUkXJbworoy3uE3gyXLGURSnDCQmIsnPo2IXDxYXtz6hSIoNo9rC6TrDIHadK3YHE+7wseNLaBmWTDUFU/ZXEsuR6hEGtAJXbY25PmfRTdraIJDt0zhgBJmuR1o/BpAbj5hCnVc3/AIq27sMgFJV74RuxdP2/tlbY8SOX9wnJ5Wi0Kyfyhj3EgHtlUFx0luVz42FwHmExVuy1ZsgnGcYWifdGjx+oj082/o25djukOGQoFG6y0wEO581PafIrDacmmGqQyQAeQCFJgjgdglrfskuYPJCNmDwUncynaiScN4HYowRhN847pJcuTZ3avoWSFkdefjUWj+oLUOJxkLGdQSf/AKjAPJaenfuMnVL2k+nZlhyGN3MPJCnCxTtt2vaA70KrKs/gOa53IwrQV6l5gkYA13ngps0+7Zv/AMflqsfYmMS6PA87opNp+BTRpX4h+1PkfNPP02zEcwSEhNk6jF6uHyU0v2btTL5hp/oZLtWZzvyPRD89eaP3INx9UJb9yMZdEcf3Ux+tSdnQn7I8iu8LfNMkDVH8B9PcE2+tVvNLqwMcnmwpLdaaD+5EfspEFupZeCPYf5Y4RbaQyjFk4VGesRmNxa7uOEwtLr1NhjbMxvPZxCzpbyjNJo8/qOnrHWjtEkTCCCMjC57rQP6jIwPcG7uwKJBQTE6ZvTRKo1YmM3BuTjuVZ6TSi1K34NguDOOGHCCCaOaN/WNxg9vAjqTTa+jWGx0g4NeOQ45WNsgOOSggtuNHh523hWwU5nxSgMdgLVU5XOY0koIKXUJaB0jZYsOQo9mRwdG0HAc4A/dBBY15NtfFi7EZr6g2Jr3uaYw72j5p0+SCC6uGLhe5HWMbtKwOt86vz6okFo6fyS6v4k4cwg+oSQ9zB7DiPkggvSaTR5U01S0yZXv2AAN+R8VZ1rMj/e2/ZBBefklJn0vQZbcrbJZwRy0fZRJooyTljfsggstM9qeVyVdmvCXf2beyprcTYLDPDyMo0Fon4nidT/vNC5ok04h+T7AKzbmDcUEFCHyz1OrSfbv8H//Z"; 

  //foto de perfil padrão quando sem foto no perfil do usuario
  const fotoUserDefault = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"; 

  //nome do usuário
  const  nomeUser = "Fillipe Faria";

  //nome da organização 
  const nomeOrg = "Faria's Farm";

  return (
    <UIProvider>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Menu */}
        <div className="w-80 flex flex-col border-r border-slate-200">
          <div className="flex items-center gap-4 bg-white p-4 shadow-sm">
            <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border border-gray-300 bg-gray-200">
              {fotoPerfil ? (
                <img
                  src={fotoPerfil}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={fotoUserDefault}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {/* Texto */}
            <div>
              <h1 className="text-xl font-semibold text-black leading-tight">{nomeUser}</h1>
              <h2 className="text-sm text-gray-600">{nomeOrg}</h2>
            </div>
          </div>

          <nav className="flex flex-col gap-4 mt-6  px-8">
            <NavLink to="" className={navItemStyle}><House size={28}/>Visão geral</NavLink>
            <NavLink to="" className={navItemStyle}><Users size={28}/>Lista de usuários</NavLink>
            <NavLink to="praga" className={navItemStyle}><BugBeetle size={28}/>Pragas</NavLink>
            <NavLink to="" className={navItemStyle}><ClipboardText size={28}/>Relatórios</NavLink>
            <NavLink to="" className={navItemStyle}><Globe size={28}/>Comunidade</NavLink>
            <NavLink to="cliente"className={navItemStyle}><Farm size={28}/>Clientes</NavLink>
          </nav>
        </div>

        <main className="flex-1 h-screen p-4 w-full bg-[#E0E0E0] overflow-auto">
          <div className="flex h-full w-full">
            <div className="flex-1 rounded-lg bg-white p-1 overflow-auto shadow-md">

              {children}
              <Outlet />

            </div>
          </div>
        </main>
      </div>
    </UIProvider>
  );
};
