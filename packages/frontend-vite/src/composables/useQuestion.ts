import Question from '@/api/Question/Question'
import { Ref, ref } from 'vue'
import axios from 'axios'
import { plainToClass, classToPlain } from 'class-transformer'

export const useQuestion = () => {
  const questions: Ref<Question[]> = ref([])

  const getQuestions = async () => {
    try {
      const plainQuestions: any[] = (await axios.get(`${import.meta.env.VITE_API_URL}/questions`)).data
      const mappedQuestions = plainToClass(Question, plainQuestions, { excludeExtraneousValues: true })
      return mappedQuestions
    } catch (error) {
      console.log(error)
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
