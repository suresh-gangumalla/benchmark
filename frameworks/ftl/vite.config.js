import { defineConfig } from 'vite'
import path from 'node:path'
import { viteStaticCopy } from "vite-plugin-static-copy";

const src = path.resolve(__dirname, 'src')
console.log(`src: ${src}`)

const target = "esnext";

export default defineConfig({
  base: "./",
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'assets/**/*',
          dest: 'assets'
        }
      ]
    })
  ],
  server: {
    hmr: true,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  esbuild: {
    target: target,
  },
  optimizeDeps: {
    esbuildOptions: {
      target: target,
    },
  },
  build: {
    target: target,
    minify: true,
    sourcemap: false,
    outDir: path.resolve(__dirname, 'dist'),
  },
});

