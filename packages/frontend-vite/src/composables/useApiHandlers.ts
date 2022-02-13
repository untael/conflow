import { classToPlain, plainToClass, plainToInstance } from 'class-transformer'
import axios from 'axios'
import { useToast } from '@/composables/useToast'
import { Ref, ref } from 'vue'

export const useApiHandlers = () => {
  const { $toast } = useToast()
  const token: Ref<string> = ref('')
  console.log('token.value', token.value)

  const getToken = () => {
    return localStorage.getItem('token') || ''
  }

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL as string || 'https://conflow.herokuapp.com/',
    headers: {
      'Authorization': `Bearer ${getToken()}`
    }
  })

  const getClassInstance = <T> (classObject: { new (): T }) => {
    return Object.getPrototypeOf(classObject).constructor
  }

  const getOne = async (classValue: any, id: string): Promise<any> => {
    const classInstance = getClassInstance(classValue)
    try {
      const plainEntity: any = (await axiosInstance.get(`/${classValue.endpoint}/${id}`)).data
      const mappedEntity = plainToInstance(classInstance, plainEntity, { excludeExtraneousValues: true })
      return mappedEntity
    } catch (error) {
      console.log('error', error)
      throw new Error()
    }
  }

  const getMany = async (classValue: any): Promise<any[]> => {
    const classInstance = getClassInstance(classValue)
    try {
      const plainList: any[] = (await axiosInstance.get(`/${classValue.endpoint}`)).data
      const mappedList = plainToClass(classInstance, plainList, { excludeExtraneousValues: true })
      return mappedList
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const create = async (classValue: any) => {
    try {
      const plainValue = classToPlain(classValue)
      await axiosInstance.post(`/${classValue.endpoint}`, plainValue)
      $toast.init({
        message: `${classValue.endpoint} was successfully created`,
        color: 'success',
      })
    } catch (error) {
      console.log('error', error)
      $toast.init({
        message: `${classValue.endpoint} was not created`,
        color: 'danger',
      })
    }

  }
  const update = async (classValue: any) => {
    try {
      const plainValue = classToPlain(classValue)
      await axiosInstance.put(`/${classValue.endpoint}/${plainValue.id}`, plainValue)
      $toast.init({
        message: `${classValue.endpoint} was successfully updated`,
        color: 'success',
      })
    } catch (error) {
      $toast.init({
        message: `${classValue.endpoint} was not updated`,
        color: 'danger',
      })
    }

  }

  // const delete = (interviewTemplate: InterviewTemplate) => {
  //
  // }
  return {
    create,
    update,
    // delete,
    getMany,
    getOne,
  }
}
