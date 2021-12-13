import Question from '@/api/Question/Question'
import { Ref, ref } from 'vue'
import axios from 'axios'
import { plainToClass, classToPlain } from 'class-transformer'

export const useQuestion = () => {
  const questions: Ref<Question[]> = ref([])

  const getQuestions = async (filters?: any) => {
    try {
      // ToDo refactor
      let query = `?`
      if(filters) {
        filters.tags.forEach((tag: string, i: number, arr: any[]) => {
          query += `${filters.fieldName}=${tag}`
          if (i !== arr.length - 1) {
            query += '&'
          }
        })
      }
      const plainQuestions: any[] = (await axios.get(`${import.meta.env.VITE_API_URL}/questions${query}`)).data
      const mappedQuestions = plainToClass(Question, plainQuestions, { excludeExtraneousValues: true })
      return mappedQuestions
    } catch (error) {
      console.log(error)
      return []
    }
  }
  const createQuestion = async (question: Question) => {
    try {
      const transformedQuestion = classToPlain(question)
      await axios.post(`${import.meta.env.VITE_API_URL}/questions`, transformedQuestion)
    } catch (error) {
      throw new Error()
    }
  }
  return {
    questions,
    getQuestions,
    createQuestion,
  }
}
