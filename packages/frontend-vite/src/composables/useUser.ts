import { useApiHandlers } from '@/composables/useApiHandlers'
import User from '@/api/User/User'
import { ref } from 'vue'
import { useAuth } from '@/composables/useAuth'

export const useUser = () => {
  const {
    create,
    update,
    getMany,
    getOne,
  } = useApiHandlers()
  const { getMe } = useAuth()
  const user = ref(new User())
  const userAPIHandlers = {
    getOne: async (id: string) => {
      return await getOne(user.value as any, id)
    },
    getMany: async () => {
      return await getMany(user.value as any)
    },
    create: async (user: User) => {
      await create(user as any)
    },
    update: async (user: User) => {
      await update(user as any)
      await getMe()
    },
    delete: (user: User) => {

    },
  }

  return {
    user,
    userAPIHandlers,
  }
}
