import type { APIGatewayProxyHandler } from 'aws-lambda'
import { headers } from './headers'

export const handler: APIGatewayProxyHandler = async event => {
  if (!event.body)
    return { statusCode: 400, body: JSON.stringify({ error: 'null body' }) }

  const body: { message: string } = JSON.parse(event.body)

  console.log(body)

  return {
    headers,
    statusCode: 200,
    body: event.body,
  }
}
