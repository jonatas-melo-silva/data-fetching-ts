import { useQuery } from 'react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'

export type Repository = {
  full_name: string
  description: string
}

export function Repositories() {
  const { data: repositories, isFetching } = useQuery<Repository[]>(
    'repositories',
    async () => {
      const response = await axios.get(
        'https://api.github.com/users/jonatas-melo-silva/repos'
      )
      return response.data
    }, {
      staleTime: 1000 * 60 // 1 min
    }
  )

  return (
    <ul>
      {isFetching && <strong>Loading...</strong>}
      {repositories?.map(repository => (
        <li key={repository.full_name}>
          <Link to={`repository/${repository.full_name}`}>
            {repository.full_name}
          </Link>
          <p>{repository.description}</p>
        </li>
      ))}
    </ul>
  )
}
