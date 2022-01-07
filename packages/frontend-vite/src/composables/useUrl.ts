import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useUrl = () => {
  const id = ref('')
  const route = useRoute()

  if (route.params) {
    id.value = route.params.id as string || ''
  }
  return {
    id,
  }
}
