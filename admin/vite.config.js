import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = dotenv.config({ path: `./.env.${mode}` }).parsed;

  return {
    plugins: [react()],
    define: {
      "process.env": JSON.stringify(env),
    },
  };
});
