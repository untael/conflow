<template>
  <cf-container>
    <template #title>
      Questions list
    </template>
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

export default {
  name: 'CfQuestionList',
  components: { CfContainer, CfQuestionForm },
  setup () {

    const questions = ref([])
    const { getQuestions } = useQuestion()
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
