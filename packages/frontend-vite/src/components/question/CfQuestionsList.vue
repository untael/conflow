<template>
  <cf-container>
    <template #title>
      Questions list
    </template>
    <intersecting-circles-spinner
        v-if="isLoading"
        class="mx-auto"
        :animation-duration="1200"
        :size="300"
        color="rgb(44, 130, 224)"
    />
    <cf-question-form
        class="py-2"
        v-for="(question, index) in questions" :key="index" :question="question"
    />
  </cf-container>
</template>

<script lang="ts">
import { useQuestion } from '@/composables/useQuestion'
import { onMounted, ref } from 'vue'
import CfQuestionForm from '@/components/question/CfQuestionItem.vue'
import CfContainer from '@/components/layout/CfContainer.vue'
import { IntersectingCirclesSpinner } from 'epic-spinners'

export default {
  name: 'CfQuestionsList',
  components: { CfContainer, CfQuestionForm, IntersectingCirclesSpinner },
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
