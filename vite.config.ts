/// <reference types="node" />
import type { UserConfig } from 'vite';
import { resolve } from 'path';
import Markdown from 'vite-plugin-vue-markdown';
import Pages from 'vite-plugin-pages';
import Components from 'unplugin-vue-components/vite';
import Vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import Icons from 'unplugin-icons/vite';
import { ViteSSGOptions } from 'vite-ssg';

const config: UserConfig & { ssgOptions?: ViteSSGOptions } = {
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
    Pages({
      extensions: ['vue', 'md'],
    }),
    Markdown({
      headEnabled: true,
    }),
    Components({
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    WindiCSS(),
    Icons(),
  ],
  ssgOptions: {
    script: 'async',
    formatting: 'prettify',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
};

export default config;
