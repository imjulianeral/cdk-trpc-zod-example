import { z } from 'zod'

export const envSchema = z.object({
  EXAMPLE: z.string().min(1),
  API_URL: z.string().url(),
})

export const vars: z.infer<typeof envSchema> = {
  API_URL: process.env.API_URL,
  EXAMPLE: process.env.EXAMPLE,
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
