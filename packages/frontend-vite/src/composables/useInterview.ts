import { ref } from 'vue'
import Interview from '@/api/Interview/Interview'
import { useApiHandlers } from '@/composables/useApiHandlers'

export const useInterview = () => {
  const interview = ref(new Interview())
  const { create, update, getMany, getOne } = useApiHandlers()
  const interviewAPIHandlers = {
    getOne: async (id: string) => {
      return await getOne(interview.value as any, id)
    },
    getMany: async () => {
      return await getMany(interview.value as any)
    },
    create: async (interview: Interview) => {
      await create(interview as any)
    },
    update: async (interview: Interview) => {
      await update(interview as any)
    },
    delete: (interview: Interview) => {

    },
  }

  return {
    interview,
    interviewAPIHandlers,
  }

}
