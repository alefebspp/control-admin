import { api } from '../api'
import { HourRecord } from './interface'

export const getCollaboratorHourRecords = async (
  collaborator_id?: string,
  period?: string
): Promise<HourRecord> => {
  try {
    const { data } = await api.get(
      `/hour-record/${collaborator_id}?period=${period}`
    )
    return data
  } catch (error) {
    throw error
  }
}
