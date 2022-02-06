import axios from 'axios'
import qs from 'qs'
import { plainToInstance } from 'class-transformer'
import User from '@/api/User/User'
import { computed, reactive } from 'vue'

type AuthStorage = {
  user: {
    value: User | null,
    isLoading: boolean
  }
}

const authStorage: AuthStorage = {
  user: reactive({
    isLoading: false,
    value: null,
  }),
}

export const useAuth = () => {
  const currentUser = computed(() => authStorage.user)

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
    try {
      authStorage.user.isLoading = true
      const user: any = (await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })).data
      const mappedUser = plainToInstance(User, user as User, { excludeExtraneousValues: true })
      authStorage.user.value = mappedUser
      authStorage.user.isLoading = false
      return mappedUser
    } catch (err) {
      throw err
    }
  }

  const signOut = () => {
    localStorage.removeItem('token')
    authStorage.user.value = null
  }

  return {
    currentUser,
    signUpByProviders,
    getMe,
    signOut,
  }
}
