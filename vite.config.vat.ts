import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
      outDir: "elements/vat",
      lib: {
          entry: './src/elements/VatElement.ts',
          name:  'Vat',
          fileName: 'vat'
      },
        rollupOptions: {
            output: {
                plugins:[
                    copy({
                        hook: "writeBundle",
                        targets: [
                            {src:'elements/vat/vat.umd.cjs', dest:'elements/vat', rename:'vat.umd.js'}
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
                    isCustomElement: (tag) => tag.includes('pwcalculator-vat'),
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
