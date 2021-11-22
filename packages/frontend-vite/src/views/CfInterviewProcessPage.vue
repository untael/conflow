<template>
  <cf-container>
    <template #title>
      Interview process page
    </template>


    <div v-for="(qs,i) in questions" :key="i">
      {{ qs.category }}
      <cf-question-form
          class="py-2"
          v-for="(q, i) in qs.questions"
          :key="i"
          :question="q"
      />
    </div>
    <va-button color="danger" class="mr-4" @click="endInterview()">End interview</va-button>
  </cf-container>
</template>

<script lang="ts">
import Question from "@/api/Question/Question";
import CfContainer from '@/components/layout/CfContainer.vue'
import CfQuestionForm from '@/components/question/CfQuestionForm.vue'
import {onMounted} from 'vue'
import useInterview from '@/composables/useInterview'
import questionsJson from '../technicalQuestions.json'

export default {
  name: 'CfInterviewProcessPage',
  components: {CfQuestionForm, CfContainer},
  setup() {

    // const {questions, fetchQuestions} = useQuestion()
    const questions = questionsJson.map(cQs => {
      return {
        category: cQs.category,
        questions: cQs.questions.map(q => new Question({id: '1', name: q.slice(0, 20) + '...', description: q}))
      }
    })
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
