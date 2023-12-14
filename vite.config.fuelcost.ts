import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
      outDir: "elements/fuelcost",
      lib: {
          entry: './src/elements/FuelCostElement.ts',
          name:  'FuelCost',
          fileName: 'fuelcost',
      },
      rollupOptions: {
          output: {
              plugins:[
                  copy({
                      hook: "writeBundle",
                      targets: [
                          {src:'elements/fuelcost/fuelcost.umd.cjs', dest:'elements/fuelcost', rename:'fuelcost.umd.js'}
                      ]
                  })
              ],
          }
      }
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes('pwcalculator-fuelcost'),
                }
            }
        }),
    ],
    define: {
        'process.env': {
            "NODE_ENV" : process.env.NODE_ENV
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
