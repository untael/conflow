import { classToPlain } from 'class-transformer'
import axios from 'axios'
import { useToast } from '@/composables/useToast'

export const useApiHandlers = () => {
  const { $toast } = useToast()

  //ToDo: types
  const getClassName = <T> (classObject: { new (): T }): string => {
    const className: string = classObject.constructor.name.trim()
    return className.split(/(?=[A-Z])/).join('-').toLowerCase() + 's'
  }

  const create = async <T> (classValue: { new (): T }) => {
    const className = getClassName(classValue)
    try {
      const plainValue = classToPlain(classValue)
      await axios.post(`${import.meta.env.VITE_API_URL}/${className}`, plainValue)
      $toast.init({
        message: `${className} was successfully created`,
        color: 'success',
      })
    } catch (error) {
      $toast.init({
        message: `${className} was not created`,
        color: 'danger',
      })
    }

  }
  const update = async <T> (classValue: { new (): T }) => {
    const className = getClassName(classValue)
    try {
      const plainValue = classToPlain(classValue)
      await axios.put(`${import.meta.env.VITE_API_URL}/${className}/${plainValue.id}`, plainValue)
      $toast.init({
        message: `${className} was successfully updated`,
        color: 'success',
      })
    } catch (error) {
      $toast.init({
        message: `${className} was not updated`,
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
  }
}
