/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import App from './App'
import { envSchema, vars } from './env'

envSchema.parse(vars)

render(() => <App />, document.getElementById('root') as HTMLElement)
