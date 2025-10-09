import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    preview: {
      host: true,
      port: Number(env.VITE_PORT) || 3000,
      cors: false,
    },
    server: {
      host: true,
      port: Number(env.VITE_PORT) || 3000,
      cors: false,
      watch: {
        usePolling: true,
      },
    },
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src/components/index"),
        config: path.resolve(__dirname, "src/config/index"),
        context: path.resolve(__dirname, "src/context/index"),
        hooks: path.resolve(__dirname, "./src/hooks/index"),
        types: path.resolve(__dirname, "src/types/index"),
        utils: path.resolve(__dirname, "src/utils/index"),
        pages: path.resolve(__dirname, "src/pages/index"),
        "@": path.resolve(__dirname, "src/"),
      },
    },
  });
};
