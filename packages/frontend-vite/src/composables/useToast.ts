import { inject } from 'vue'

export const useToast = () => {
  const $toast: any = inject('$vaToast')
  return {
    $toast
  }
}
