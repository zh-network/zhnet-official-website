import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from '~pages'

import 'virtual:windi.css'
import "./styles/index.less"

export const createApp = ViteSSG(App, { routes })
