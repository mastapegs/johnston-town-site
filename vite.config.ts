import { defineConfig } from "vite";
import { execSync } from "child_process";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function getLastUpdatedDate(): string {
  try {
    const timestamp = execSync("git log -1 --format=%cI").toString().trim();
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
}

// https://vite.dev/config/
export default defineConfig({
  define: {
    __LAST_UPDATED__: JSON.stringify(getLastUpdatedDate()),
  },
  plugins: [react(), tailwindcss()],
});
