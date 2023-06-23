import { defineConfig, loadEnv } from "vite"
import react                     from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  console.log(env.SERVER_URL)

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.SERVER_URL,
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})
