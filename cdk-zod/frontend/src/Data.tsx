import reactLogo from './assets/react.svg'
import './App.css'
import { trpc } from './trpc'

export function Data() {
  const todos = trpc.todos.useQuery({
    name: 'deploy to prod on Friday',
    status: true,
  })

  if (todos.isLoading) return <p>Loading...</p>
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {/* <button
        onClick={() =>
          todos.mutate({
            name: 'deploy to prod on Friday',
            status: false,
          })
        }
      >
        put data
      </button> */}
      {todos.data?.map(({ name, status }) => (
        <div className="card">
          <p>
            Name: <code>{name}</code>
          </p>
          <p>
            Status: <code>{status ? 'done' : 'to-do'}</code>
          </p>
        </div>
      ))}
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  )
}
