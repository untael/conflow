import { ref } from 'vue'
import Interview, { InterviewStatusEnum } from '@/api/Interview/Interview'
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
    //ToDo: Move this to backend separate method
    cancel: async () => {
      const interviewToCancel = await getOne(interview.value as any, interview.value.id)
      switch (interviewToCancel.status) {
        case InterviewStatusEnum.Cancelled:
          return interviewToCancel
          break
        case InterviewStatusEnum.Incoming:
          interviewToCancel.status = InterviewStatusEnum.Cancelled
          return await update(interviewToCancel)
          break
      }
    },
  }

  return {
    interview,
    interviewAPIHandlers,
  }

}
