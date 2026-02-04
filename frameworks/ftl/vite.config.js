import { defineConfig } from 'vite'
import path from 'node:path'

const src = path.resolve(__dirname, 'src')
console.log(`src: ${src}`)

export default defineConfig(({ mode }) => {
    const isDebug = mode === 'debug' || process.env.NODE_ENV === 'debug'
    
    return {
        define: {
            '__DEBUG__': JSON.stringify(isDebug)
        },
        build: {
            lib: {
                entry: path.resolve(__dirname, 'src/index.js'),
                name: 'CustomRenderer',
                fileName: (format) => `custom-renderer.${format}.js`,
                formats: ['es', 'umd']
            },
            outDir: 'dist',
            emptyOutDir: true,
            rollupOptions: {
                // Exclude dependencies from bundle (if any)
                external: [],
                output: {
                    globals: {}
                }
            }
        },
        resolve: {
            alias: {
                '@src': path.resolve(__dirname, 'src')
            }
        }
    }
})
