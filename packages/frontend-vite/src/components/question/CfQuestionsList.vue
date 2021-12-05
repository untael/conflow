<template>
  <cf-container>
    <template #title>
      Questions list
    </template>
    <cf-spinner class="mx-auto" v-if="isLoading"/>
    <cf-question-form
        v-else
        class="py-2"
        v-for="(question, index) in questions" :key="`${index}-${question.id}`" :question="question"
    />
  </cf-container>
</template>

<script lang="ts">
import { useQuestion } from '@/composables/useQuestion'
import { onMounted, ref } from 'vue'
import CfQuestionForm from '@/components/question/CfQuestionItem.vue'
import CfContainer from '@/components/layout/CfContainer.vue'
import CfSpinner from '@/components/CfSpinner.vue'

export default {
  name: 'CfQuestionsList',
  components: { CfSpinner, CfContainer, CfQuestionForm },
  setup () {

    const questions = ref([])
    const { getQuestions } = useQuestion()
    const isLoading = ref(false)
    onMounted(async () => {
      isLoading.value = true
      //@ts-ignore
      questions.value = await getQuestions()
      isLoading.value = false
    })
    return {
      isLoading,
      questions,
    }
  },

}
</script>

<style lang="scss">

</style>
