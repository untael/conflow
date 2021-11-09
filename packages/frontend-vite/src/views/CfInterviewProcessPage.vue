<template>
  <cf-container>
    <template #title>
      Interview process page
    </template>

    <div>
      <cf-question-form
          class="py-2"
          v-for="(q, i) in questions"
          :key="i"
          :question="q"
      />
    </div>
  </cf-container>
</template>

<script lang="ts">
import CfContainer from '@/components/layout/CfContainer.vue'
import CfQuestionForm from '@/components/question/CfQuestionForm.vue'
import { onMounted } from 'vue'
import { useQuestion } from '@/composables/useQuestion'

export default {
  name: 'CfInterviewProcessPage',
  components: { CfQuestionForm, CfContainer },
  setup () {
    const { questions, fetchQuestions } = useQuestion()

    onMounted(() => {
      fetchQuestions(6)
    })

    return {
      questions,
    }
  },

}
</script>

<style lang="scss">

</style>
