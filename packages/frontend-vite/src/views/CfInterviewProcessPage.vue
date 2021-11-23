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
import {onMounted, ref} from 'vue'
import useInterview from '@/composables/useInterview'
import questionsJson from '../technicalQuestions.json'
import questionsJson2 from '../questions.json'
import {useQuestion} from "@/composables/useQuestion";

export default {
  name: 'CfInterviewProcessPage',
  components: {CfQuestionForm, CfContainer},
  setup() {

    const {fetchQuestions, getQuestions} = useQuestion()
    const questions = ref([])
    onMounted(async () => {
      questions.value = await getQuestions()
    })

    return {
      questions,
      // endInterview,
    }
  },

}
</script>

<style lang="scss">

</style>
