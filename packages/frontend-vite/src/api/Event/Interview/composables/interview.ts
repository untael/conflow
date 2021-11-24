import { AxiosRequestConfig } from 'axios'
import { executeApiRequest } from '@/middleware/axios'
import { reactive, ref } from 'vue'
import Interview from '@/api/Event/Interview/Interview'
import { plainToClass } from 'class-transformer'
import plainInterview from '../../../../interview.json'

export const useInterview = () => {
  let interview = ref(new Interview())

  const getInterview = (id: string | string[]): Interview => {
    const request: AxiosRequestConfig = {
      method: 'get',
      url: `/interviews/${id}?include=interviewers`,
    }
    // const plainInterview = await executeApiRequest(request)
    const result = plainToClass(Interview, plainInterview as {}, { excludeExtraneousValues: true })
    return result
  }

  const updateInterview = async (interview: Interview) => {
    const request: AxiosRequestConfig = {
      method: 'put',
      url: `/interviews/${interview.id}`,
      data: interview,
    }
    return await executeApiRequest(request)
  }

  const deleteInterview = async (interview: Interview) => {
    const request: AxiosRequestConfig = {
      method: 'delete',
      url: `/interviews/${interview.id}`,
    }
    return await executeApiRequest(request)
  }

  return {
    interview,
    getInterview,
    updateInterview,
    deleteInterview,
  }
}
