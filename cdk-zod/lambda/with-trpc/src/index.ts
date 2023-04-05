import { initTRPC } from '@trpc/server'
import { z } from 'zod'
import { awsLambdaRequestHandler } from '@trpc/server/adapters/aws-lambda'
import { headers } from './headers'

const t = initTRPC.create()
const appRouter = t.router({
  todos: t.procedure
    .input(
      z.object({
        name: z.string().min(1),
        status: z.boolean(),
      })
    )
    .query(({ input }) => {
      return [input]
    }),
})

export type AppRouter = typeof appRouter

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  responseMeta() {
    return { headers }
  },
})
