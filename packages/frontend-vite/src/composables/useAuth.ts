import axios from 'axios'
import qs from 'qs'
import { plainToInstance } from 'class-transformer'
import User from '@/api/User/User'
import { computed, ref, Ref, reactive, isRef } from 'vue'

type AuthStorage = {
  user: any | null
  isLoading: boolean
}

const authStorage = reactive<AuthStorage>({
  user: null,
  isLoading: false,
})


export const useAuth = () => {
  const currentUser = computed(() => {
    return authStorage.user
  })
  const isUserLoading = computed(() => authStorage.isLoading)

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
      authStorage.isLoading = true
      const user: any = (await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })).data
      const mappedUser = plainToInstance(User, user as User, { excludeExtraneousValues: true })
      authStorage.user = mappedUser
      // authStorage.user = { id: '123' }
      authStorage.isLoading = false
      return mappedUser
    } catch (err) {
      throw err
    }
  }

  const signOut = () => {
    localStorage.removeItem('token')
    authStorage.user = null
  }

  return {
    currentUser,
    isUserLoading,
    signUpByProviders,
    getMe,
    signOut,
  }
}
