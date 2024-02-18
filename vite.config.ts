import { resolve } from "path"

import type { UserConfig } from "vite"

const config: UserConfig = {
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "bg-squircle",
            fileName: "index"
        },
        rollupOptions: {
            external: ["eslint-config-terser-no-domprops/vars"]
        },
        outDir: "dist",
        minify: false
    }
}

export default config
