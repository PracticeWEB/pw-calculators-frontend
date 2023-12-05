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
          fileName: 'propertytaxes'
      }
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes('pwcalculator-propertytaxes'),
                }
            }
        }),
    ],
    define: {
        'process.env': {}
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
