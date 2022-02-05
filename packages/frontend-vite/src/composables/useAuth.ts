import axios from 'axios'
import qs from 'qs'
import { plainToClass } from 'class-transformer'
import User from '@/api/User/User'
import { Ref, ref } from 'vue'

export const useAuth = () => {
  const user: Ref<User | null> = ref(new User())

  const signUpByProviders = async (provider: string, query: any) => {
    const stringifiedQuery = qs.stringify(query)
    const result: any = (await axios.get(`${import.meta.env.VITE_API_URL}/auth/${provider}/callback/?${stringifiedQuery}`)).data
    localStorage.setItem('token', result.jwt)
    return result
  }

  const getMe = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return null
    }
    const user: any = (await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })).data
    const mappedUser = plainToClass(User, user, { excludeExtraneousValues: true })
    return mappedUser
  }

  return {
    user,
    signUpByProviders,
    getMe,
  }
}
