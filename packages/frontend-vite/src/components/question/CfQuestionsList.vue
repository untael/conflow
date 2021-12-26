<template>
  <cf-container>
    <template #title>
      Questions list
    </template>
    <cf-spinner class="mx-auto" v-if="isLoading"/>
    <cf-question-item
        v-else
        class="py-2"
        v-for="(question, index) in questions" :key="`${index}-${question.id}`" :question="question"
        :canBeEdited="editable"
        @edit="$router.push({name: 'Question edit', params: { id: question.id}})"
    />
  </cf-container>
</template>

<script lang="ts">
import { useQuestion } from '@/composables/useQuestion'
import { onMounted, Ref, ref } from 'vue'
import CfQuestionItem from '@/components/question/CfQuestionItem.vue'
import CfContainer from '@/components/layout/CfContainer.vue'
import CfSpinner from '@/components/CfSpinner.vue'
import Question from '@/api/Question/Question'

export default {
  name: 'CfQuestionsList',
  components: { CfSpinner, CfContainer, CfQuestionItem },
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
  },
  setup () {

    const questions: Ref<Question[]> = ref([])
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
