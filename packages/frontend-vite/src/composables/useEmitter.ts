import { inject } from 'vue'
import { Emitter } from 'mitt'
import { Events } from '@/api/emitter'

export const useEmitter = () => {
  const $emitter = inject('$emitter') as Emitter<Events>

  return {
    $emitter,
  }
}
