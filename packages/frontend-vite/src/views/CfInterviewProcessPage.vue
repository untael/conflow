<template>
  <cf-container>
    <template #title>
      Interview process page
    </template>


    <div v-for="(question, i) in questions" :key="i">
      <cf-question-form
          class="py-2"
          :question="question"
      />
    </div>
    <va-button color="danger" class="mr-4" @click="endInterview()">End interview</va-button>
  </cf-container>
</template>

<script lang="ts">
import Question from "@/api/Question/Question";
import CfContainer from '@/components/layout/CfContainer.vue'
import CfQuestionForm from '@/components/question/CfQuestionForm.vue'
import { onMounted, ref } from 'vue'
import useInterview from '@/composables/useInterview'
import questionsJson from '../technicalQuestions.json'
import questionsJson2 from '../questions.json'

export default {
  name: 'CfInterviewProcessPage',
  components: {CfQuestionForm, CfContainer},
  setup() {

    // const {questions, fetchQuestions} = useQuestion()
    // const questions = questionsJson.map(cQs => {
    //   return {
    //     category: cQs.category,
    //     questions: cQs.questions.map(q => new Question({id: '1', name: q.slice(0, 20) + '...', description: q}))
    //   }
    // })
    const questions = ref([...questionsJson2.map(question => new Question(question))])
    const endInterview = useInterview
    onMounted(() => {
      // fetchQuestions(6)
    })

    return {
      questions,
      endInterview,
    }
  },

}
</script>

<style lang="scss">

</style>
