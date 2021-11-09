import Question from '@/api/Question/Question'
import { Ref, ref } from 'vue'

export const useQuestion = () => {
  const questions: Ref<Question[]> = ref([])

  const fetchQuestions = (count: number) => {
    for (let i = 0; i < count; i++) {
      questions.value.push(new Question({
          id: i,
          name: 'Lorem ipsum dolor, sit amet consectetur...',
          description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, consectetur! Asperiores excepturi, fugiat sed tempora impedit facere consequuntur labore eligendi',
          answer: '',
          mark: 0,
          rating: 5,
          code: null,
          date_start: 0,
          date_end: 0,
          time_spent: 0,
          type: i % 3===0 ? 'hearing' : 'edit',
          tags: [
            'fundamentals',
            'advanced',
            'arrays',
            'fetch',
            'objects'
          ],
        }),
      )
    }
  }

  return {
    fetchQuestions,
    questions,
  }
}
