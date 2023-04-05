import { z } from 'zod'

export const envSchema = z.object({
  MODE: z.string().min(1),
  VITE_PUBLIC_APP_TITLE: z.string().min(1),
  VITE_PUBLIC_API_URL: z.string().url(),
})

export const vars: z.infer<typeof envSchema> = {
  MODE: import.meta.env.MODE,
  VITE_PUBLIC_API_URL: import.meta.env.VITE_PUBLIC_API_URL,
  VITE_PUBLIC_APP_TITLE: import.meta.env.VITE_PUBLIC_APP_TITLE,
}
