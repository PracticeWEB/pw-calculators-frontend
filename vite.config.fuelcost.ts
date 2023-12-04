import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
      outDir: "elements/fuelcost",
      lib: {
          entry: './src/elements/FuelCostElement.ts',
          name:  'FuelCost',
          fileName: 'fuelcost'
      }
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes('pwcalculator-fuel-cost'),
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
