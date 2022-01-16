import { classToPlain, plainToClass } from 'class-transformer'
import axios from 'axios'
import { useToast } from '@/composables/useToast'

export const useApiHandlers = () => {
  const { $toast } = useToast()

  //ToDo: types
  const getClassName = <T> (classObject: { new (): T }): string => {
    const entityName: string = classObject.constructor.name.trim()
    return entityName.split(/(?=[A-Z])/).join('-').toLowerCase() + 's'
  }

  const getClassInstance = <T> (classObject: { new (): T }) => {
    return Object.getPrototypeOf(classObject).constructor
  }

  const getOne = async <T> (classValue: { new (): T }, id: string): Promise<any> => {
    const entityName = getClassName(classValue)
    const classInstance = getClassInstance(classValue)
    try {
      const plainEntity: any = (await axios.get(`${import.meta.env.VITE_API_URL}/${entityName}/${id}`)).data
      const mappedEntity = plainToClass(classInstance, plainEntity, { excludeExtraneousValues: true })
      return mappedEntity
    } catch (error) {
      throw new Error()
    }
  }

  const getMany = async <T> (classValue: { new (): T }): Promise<any[]> => {
    const entityName = getClassName(classValue)
    const classInstance = getClassInstance(classValue)
    try {
      const plainList: any[] = (await axios.get(`${import.meta.env.VITE_API_URL}/${entityName}`)).data
      const mappedList = plainToClass(classInstance, plainList, { excludeExtraneousValues: true })
      return mappedList
    } catch (error) {
      console.log(error)
      return []
    }

  }
  const create = async <T> (classValue: { new (): T }) => {
    const entityName = getClassName(classValue)
    try {
      const plainValue = classToPlain(classValue)
      await axios.post(`${import.meta.env.VITE_API_URL}/${entityName}`, plainValue)
      $toast.init({
        message: `${entityName} was successfully created`,
        color: 'success',
      })
    } catch (error) {
      console.log('error', error)
      $toast.init({
        message: `${entityName} was not created`,
        color: 'danger',
      })
    }

  }
  const update = async <T> (classValue: { new (): T }) => {
    const entityName = getClassName(classValue)
    try {
      const plainValue = classToPlain(classValue)
      await axios.put(`${import.meta.env.VITE_API_URL}/${entityName}/${plainValue.id}`, plainValue)
      $toast.init({
        message: `${entityName} was successfully updated`,
        color: 'success',
      })
    } catch (error) {
      $toast.init({
        message: `${entityName} was not updated`,
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
