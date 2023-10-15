import { useQuery } from '@tanstack/react-query'
import { getCollaboratorHourRecords } from '@/services/hour-record/hour-record.service'

export const useGetCollaboratorHourRecords = (
  collaborator_id: string | undefined,
  period: string
) => {
  const queryResult = useQuery({
    queryFn: () => getCollaboratorHourRecords(collaborator_id, period),
    queryKey: ['hourRecord', collaborator_id, period],
    enabled: collaborator_id != undefined
  })

  return queryResult
}
