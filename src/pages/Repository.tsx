import { useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { Repository } from './Repositories'

export function Repo() {
  const params = useParams()
  const currentRepository = params['*'] as string

  const queryClient = useQueryClient()

  async function handleChangeRepositoryDescription() {
    const previousRepository = await queryClient.getQueryData<Repository[]>(
      'repositories'
    )

    if (previousRepository) {
      const nextRepository = previousRepository.map(repository => {
        if (repository.full_name === currentRepository) {
          return {
            ...repository,
            description: 'New description'
          }
        } else {
          return repository
        }
      })

      queryClient.setQueryData('repositories', nextRepository)
    }
  }

  return (
    <div>
      <h1>{currentRepository}</h1>
      <button onClick={handleChangeRepositoryDescription}>
        alterar descrição
      </button>
    </div>
  )
}
