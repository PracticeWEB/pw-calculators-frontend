import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
      outDir: "elements/propertytaxes",
      lib: {
          entry: './src/elements/PropertyTaxesElement.ts',
          name:  'PropertyTaxes',
          fileName: 'propertytaxes'
      },
        rollupOptions: {
            output: {
                plugins:[
                    copy({
                        hook: "writeBundle",
                        targets: [
                            {src:'elements/propertytaxes/propertytaxes.umd.cjs', dest:'elements/propertytaxes', rename:'propertytaxes.umd.js'}
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
                    isCustomElement: (tag) => tag.includes('pwcalculator-propertytaxes'),
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
