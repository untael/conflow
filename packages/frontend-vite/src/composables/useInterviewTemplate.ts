import { ref } from 'vue'
import InterviewTemplate from '@/api/InterviewTemplate/InterviewTemplate'
import { useApiHandlers } from '@/composables/useApiHandlers'

export const useInterviewTemplate = () => {
  const { create, update } = useApiHandlers()
  const interviewTemplate = ref(new InterviewTemplate())
  const interviewTemplateAPIHandlers = {
    getOne: async (id: string) => {

    },
    getMany: async () => {

    },
    create: async (interviewTemplate: InterviewTemplate) => {
      await create(interviewTemplate as any)
    },
    update: async (interviewTemplate: InterviewTemplate) => {
      await update(interviewTemplate as any)
    },
    delete: (interviewTemplate: InterviewTemplate) => {

    },
  }
  return {
    interviewTemplate,
    interviewTemplateAPIHandlers,
  }
}
