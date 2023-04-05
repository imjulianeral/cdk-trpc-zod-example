import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '../../lambda/with-trpc/src/index'

export const trpc = createTRPCReact<AppRouter>()
