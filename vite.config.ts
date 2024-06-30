import wasm from 'vite-plugin-wasm'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import Components from 'unplugin-vue-components/vite'
import topLevelAwait from 'vite-plugin-top-level-await'

import { defineConfig } from 'vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import * as path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({

  plugins: [
    vue(),
    wasm(),
    topLevelAwait(),
    nodePolyfills(),

    ElementPlus({
      // 引入的样式的类型，可以是css、sass、less等，
      useSource: true
    }),

    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),

    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  server: { proxy: {"/api": "http://localhost:3000"} },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },

  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  }
})