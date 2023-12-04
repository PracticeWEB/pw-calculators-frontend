import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
      outDir: "elements/propertytaxes",
      lib: {
          entry: './src/elements/PropertyTaxesElement.ts',
          name:  'PropertyTaxes',
          fileName: 'property-taxes'
      }
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes('pwcalculator-property-taxes'),
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
