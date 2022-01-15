import { useApiHandlers } from '@/composables/useApiHandlers'
import { ref } from 'vue'
import CandidateLevel from '@/api/CandidateLevel/CandidateLevel'

export const useCandidateLevel = () => {
  const { create, update } = useApiHandlers()
  const candidateLevel = ref(new CandidateLevel())
  const candidateLevelAPIHandlers = {
    getOne: async (id: string) => {

    },
    getMany: async () => {

    },
    create: async (candidateLevel: CandidateLevel) => {
      await create(candidateLevel as any)
    },
    update: async (candidateLevel: CandidateLevel) => {
      await update(candidateLevel as any)
    },
    delete: (candidateLevel: CandidateLevel) => {

    },
  }
  return {
    candidateLevel,
    candidateLevelAPIHandlers,
  }
}

