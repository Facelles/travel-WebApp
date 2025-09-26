import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  optimizeDeps: {
    include: ["@syncfusion/ej2-base"], // let Vite convert CJS → ESM
  },
  ssr: {
    noExternal: ["@syncfusion/ej2-base"], // keep only the package name, no leading slash
  },
});