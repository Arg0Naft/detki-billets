import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "node-server",
    noExternals: true,
  },
  tanstackStart: {
    server: { entry: "server" },
  },
});
