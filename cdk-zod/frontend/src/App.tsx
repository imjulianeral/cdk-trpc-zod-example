import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/react-query'
import { useState } from 'react'
import { Data } from './Data'
import { trpc } from './trpc'

function App() {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'https://o6hp186qjh.execute-api.us-east-1.amazonaws.com/prod/with-trpc',
        }),
      ],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Data />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default App
