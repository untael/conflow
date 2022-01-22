import { ref } from 'vue'
import InterviewTemplate from '@/api/InterviewTemplate/InterviewTemplate'
import { useApiHandlers } from '@/composables/useApiHandlers'
import axios from 'axios'
import { plainToClass } from 'class-transformer'
import CandidateLevel from '@/api/CandidateLevel/CandidateLevel'
import InterviewType from '@/api/InterviewType/InterviewType'

export const useInterviewTemplate = () => {
  const { create, update, getMany, getOne } = useApiHandlers()
  const interviewTemplate = ref(new InterviewTemplate())
  const interviewTemplateAPIHandlers = {
    //ToDo move to different composable
    getTypes: async () => {
      try {
        const plainList: any[] = (await axios.get(`${import.meta.env.VITE_API_URL}/interview-types`)).data
        const mappedList = plainToClass(InterviewType, plainList, { excludeExtraneousValues: true })
        return mappedList
      } catch (error) {
        console.log(error)
        return []
      }
    },
    //ToDo move to different composable
    getCandidateLevels: async () => {
      try {
        const plainList: any[] = (await axios.get(`${import.meta.env.VITE_API_URL}/candidate-levels`)).data
        const mappedList = plainToClass(CandidateLevel, plainList, { excludeExtraneousValues: true })
        return mappedList
      } catch (error) {
        console.log(error)
        return []
      }
    },
    getOne: async (id: string) => {
      return await getOne(interviewTemplate.value as any, id)
    },
    getMany: async () => {
      return await getMany(interviewTemplate.value as any)
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
