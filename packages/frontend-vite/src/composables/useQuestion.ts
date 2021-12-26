import Question from '@/api/Question/Question'
import { inject, Ref, ref } from 'vue'
import axios from 'axios'
import { plainToClass, classToPlain } from 'class-transformer'

export const useQuestion = () => {
  const $vaToast: any = inject('$vaToast')
  const questions: Ref<Question[]> = ref([])

  const getQuestion = async (id: string) => {
    try {
      const plainQuestion: any = (await axios.get(`${import.meta.env.VITE_API_URL}/questions/${id}`)).data
      const mappedQuestion = plainToClass(Question, plainQuestion, { excludeExtraneousValues: true })
      return mappedQuestion
    } catch (error) {
      throw new Error()
    }
  }


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
      $vaToast.init({
        message: 'Question was successfully created',
        color: 'success',
      })
    } catch (error) {
      $vaToast.init({
        message: 'Question was not created',
        color: 'danger',
      })
    }
  }

  const updateQuestion = async (question: Question) => {
    try {
      const transformedQuestion = classToPlain(question)
      await axios.put(`${import.meta.env.VITE_API_URL}/questions/${question.id}`, transformedQuestion)
      $vaToast.init({
        message: 'Question was successfully updated',
        color: 'success',
      })
    } catch (error) {
      $vaToast.init({
        message: 'Question was not updated',
        color: 'danger',
      })
    }
  }

  return {
    questions,
    getQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
  }
}
