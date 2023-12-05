import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
      outDir: "elements/payslip",
      lib: {
          entry: './src/elements/PayslipElement.ts',
          name:  'Payslip',
          fileName: 'payslip'
      }
    },
    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.includes('pwcalculator-payslip'),
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
