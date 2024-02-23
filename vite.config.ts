import { resolve } from "path"

import type { UserConfig } from "vite"

const config: UserConfig = {
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "bg-squircle",
            fileName: "index"
        },
        outDir: "dist",
        minify: true
    }
}

export default config
