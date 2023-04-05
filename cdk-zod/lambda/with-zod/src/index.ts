import type { APIGatewayProxyHandler } from 'aws-lambda'
import { z } from 'zod'
import { headers } from './headers'
import { envSchema, vars } from './env'

const inputSchema = z.object({
  message: z.string().min(1).max(10),
  age: z.number().gte(18).lte(80),
  email: z.string().email(),
  url: z.string().url(),
  id: z.string().uuid(),
})

export const handler: APIGatewayProxyHandler = async event => {
  const validation = envSchema.safeParse(vars)
  if (!validation.success)
    return {
      headers,
      statusCode: 400,
      body: validation.error.message,
    }
  const body = inputSchema.safeParse(JSON.parse(event.body || ''))
  if (!body.success)
    return {
      headers,
      statusCode: 400,
      body: body.error.message,
    }

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify(body.data),
  }
}
