import { useFetch } from './hooks/useFetch'

type Repository = {
  fullName: string
  description: string
}

function App() {
  const { data: repositories, isFetching } = useFetch<Repository[]>(
    'users/jonatas-melo-silva/repos'
  )

  return (
    <ul>
      {isFetching && <li>Loading...</li>}
      {repositories?.map(repository => (
        <li key={repository.fullName}>
          <strong>{repository.fullName}</strong> - {repository.description}
        </li>
      ))}
    </ul>
  )
}

export default App
