import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useUrl = () => {
  const id = ref('')
  const route = useRoute()
  const APIUrl = import.meta.env.VITE_API_URL

  if (route.params) {
    id.value = route.params.id as string || ''
  }
  return {
    id,
    APIUrl,
  }
}
