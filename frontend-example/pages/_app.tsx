import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { envSchema, vars } from '../lib/env'

const validation = envSchema.safeParse(vars)
if (!validation.success) throw new Error(validation.error.message)

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
