import { useApiHandlers } from '@/composables/useApiHandlers'
import InterviewType from '@/api/InterviewType/InterviewType'
import { ref } from 'vue'

export const useInterviewType = () => {
  const { create, update } = useApiHandlers()
  const interviewType = ref(new InterviewType())
  const interviewTypeAPIHandlers = {
    getOne: async (id: string) => {

    },
    getMany: async () => {

    },
    create: async (interviewType: InterviewType) => {
      await create(interviewType as any)
    },
    update: async (interviewType: InterviewType) => {
      await update(interviewType as any)
    },
    delete: (interviewType: InterviewType) => {

    },
  }
  return {
    interviewType,
    interviewTypeAPIHandlers,
  }
}
