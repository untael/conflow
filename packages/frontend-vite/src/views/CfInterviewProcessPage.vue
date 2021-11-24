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
    <va-button color="danger" class="mr-4">End interview</va-button>
  </cf-container>
</template>

<script lang="ts">
import CfContainer from '@/components/layout/CfContainer.vue'
import CfQuestionForm from '@/components/question/CfQuestionForm.vue'
import {onMounted, ref} from 'vue'
import {useQuestion} from "@/composables/useQuestion";

export default {
  name: 'CfInterviewProcessPage',
  components: {CfQuestionForm, CfContainer},
  setup() {

    const { getQuestions} = useQuestion()
    const questions = ref([])
    onMounted(async () => {
      //@ts-ignore
      questions.value = await getQuestions()
    })
    return {
      questions,
    }
  },

}
</script>

<style lang="scss">

</style>
