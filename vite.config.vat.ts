import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
      outDir: "elements/vat",
      lib: {
          entry: './src/elements/VatElement.ts',
          name:  'Vat',
          fileName: 'vat'
      }
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes('pwcalculator-vat'),
                }
            }
        }),
    ],
    define: {
        'process.env': process.env// TODO protect thi more.
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
