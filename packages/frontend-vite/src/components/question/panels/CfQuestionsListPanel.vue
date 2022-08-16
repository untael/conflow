<template>
  <cf-container :loading="isLoading">
    <template #title>
      Questions list
    </template>
    <template #default>
      <cf-spinner class="mx-auto" v-if="isLoading"/>
      <cf-question-item
          v-else
          v-for="(question, index) in questions"
          :key="`${index}-${question.id}`"
          :question="question"
          class="py-2"
          :editable="editable"
          :addable="addable"
          @edit="editQuestion(question)"
          @add="addQuestion(question)"
          @approve="approveQuestion(question)"
          @decline="declineQuestion(question)"
      />
    </template>
  </cf-container>
</template>

<script lang="ts">
import { useQuestion } from '@/composables/useQuestion'
import { onMounted, Ref, ref } from 'vue'
import { QuestionEvents } from '@/api/Question/events'
import { useEmitter } from '@/composables/useEmitter'
import { usePanel } from '@/composables/usePanel'
import { PanelNames } from '@/components/panels'
import CfQuestionItem from '@/components/question/CfQuestionItem.vue'
import CfContainer from '@/components/layout/CfContainer.vue'
import CfSpinner from '@/components/CfSpinner.vue'
import Question from '@/api/Question/Question'


export default {
  name: 'CfQuestionsListPanel',
  components: { CfSpinner, CfContainer, CfQuestionItem },
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    addable: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    const { $emitter } = useEmitter()
    const { $panel } = usePanel()
    const { getQuestions, updateQuestion } = useQuestion()
    const questions: Ref<Question[]> = ref([])
    const isLoading = ref(false)
    onMounted(async () => {
      isLoading.value = true
      questions.value = await getQuestions()
      isLoading.value = false
    })
    const addQuestion = (question: Question) => {
      $emitter.emit(QuestionEvents.Add, question)
    }
    const editQuestion = (question: Question) => {
      $panel.init(PanelNames.QuestionsEditPanel, {
        id: question.id,
      })
    }
    const approveQuestion = async (question: Question) => {
      await updateQuestion(new Question({...question, status: 'approved'}))
      questions.value = await getQuestions()
    }
    const declineQuestion = async (question: Question) => {
      await updateQuestion(new Question({...question, status: 'declined'}))
      questions.value = await getQuestions()
    }
    return {
      addQuestion,
      editQuestion,
      isLoading,
      questions,
      approveQuestion,
      declineQuestion
    }
  },

}
</script>

<style lang="scss">

</style>
