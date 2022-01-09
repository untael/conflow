<template>
  <cf-container class="cf-interview-template-edit-form">
    <template #title>
      Interview template edit form
    </template>

    <template #default>
      <div class="flex-col justify-between">
        <div>
          <div class="py-2">
            Name:
            <va-input v-model="interview.name"/>
          </div>

          <div class="py-2 d-flex">
            <div class="mr-1 flex-grow">
              Type:
              <va-select
                  v-model="interview.type"
                  text-by="name"
                  :options="interviewTypes"
              />
            </div>
            <div class="ml-1 flex-grow">
              Candidate level:
              <va-select
                  v-model="interview.candidate_level"
                  text-by="name"
                  :options="candidateLevels"
                  multiple
              />
            </div>
          </div>

          <div class="py-2">
            Questions:
            <div v-for="(question, index) in interview.questions" :key="`iq-${index}-${question.id}`">
              <cf-question-item
                  can-be-removed
                  @remove="removeTemplateQuestion(question)"
                  :question="question"
                  class="py-2 grow"
              />
            </div>
          </div>

          <va-button @click="initQuestionsPanel" color="primary">Add more</va-button>
        </div>

        <div class="pt-4 flex justify-end mt-auto">
          <va-button class="flex-none" color="secondary" @click="$router.back()">
            Cancel
          </va-button>
          <va-button color="primary" class="flex-none ml-2">
            Save
          </va-button>
        </div>
      </div>
    </template>
  </cf-container>
</template>

<script lang="ts">
import CfContainer from '../../../layout/CfContainer.vue'
import Interview, {
  candidateLevelIterator,
  interviewTypesIterator,
} from '@/api/Event/Interview/Interview'
import { onMounted, Ref, ref, watch } from 'vue'
import { useTag } from '@/composables/useTag'
import Tag from '@/api/Question/Tag'
import CfQuestionItem from '@/components/question/CfQuestionItem.vue'
import Question from '@/api/Question/Question'
import { useQuestion } from '@/composables/useQuestion'
import { PanelNames } from '@/components/panels'
import { QuestionEvents } from '@/api/Question/events'
import { useEmitter } from '@/composables/useEmitter'
import { usePanel } from '@/composables/usePanel'

export default {
  name: 'CfInterviewTemplateEditPanel',
  components: { CfQuestionItem, CfContainer },
  setup () {
    const { $emitter } = useEmitter()
    const { $panel } = usePanel()
    const tags: Ref<Tag[]> = ref([])
    const tagsToFilter: Ref<Tag[]> = ref([])
    const templateQuestions: Ref<Question[]> = ref([])
    const questions: Ref<Question[]> = ref([])
    const interviewTypes = ref(interviewTypesIterator)
    const candidateLevels = ref(candidateLevelIterator)
    const { getTags } = useTag()
    const { getQuestions } = useQuestion()
    const interview = ref(new Interview())
    const showAddQuestionModal = ref(false)
    $emitter.on(QuestionEvents.Add, (question: Question) => {
      addTemplateQuestion(question)
    })
    const addTemplateQuestion = (question: Question) => {
      const isInList = interview.value.questions.find((existingQuestion: Question) => existingQuestion.id === question.id)
      if (!isInList) {
        interview.value.questions.push(question)
      }
    }
    const removeTemplateQuestion = (question: Question) => {
      interview.value.questions = interview.value.questions.filter((existingQuestion: Question) => existingQuestion.id !== question.id)
    }
    onMounted(async () => {
      tags.value = await getTags()
      questions.value = await getQuestions()
    })
    watch(tagsToFilter, async (tags) => {
      const filters = {
        fieldName: 'tags.name',
        tags: tags.map(tag => tag.name),
      }
      questions.value = await getQuestions(filters)
    })

    const initQuestionsPanel = () => {
      $panel.init(PanelNames.QuestionsListPanel, {
        addable: true,
      })
    }
    const initQuestionEditPanel = () => {
      $panel.init(PanelNames.QuestionsEditPanel)
    }

    return {
      initQuestionEditPanel,
      initQuestionsPanel,
      interview,
      tags,
      tagsToFilter,
      showAddQuestionModal,
      questions,
      templateQuestions,
      addTemplateQuestion,
      removeTemplateQuestion,
      interviewTypes,
      candidateLevels,
    }
  },
}
</script>

<style lang="scss">
.cf-interview-template-edit-form {
  --va-button-border-radius: 0.5rem;

  //.va-badge__text-wrapper {
  //  left: 95% !important;
  //  top: 2.5% !important;
  //}
}

.va-modal__inner {
  padding: 0 0 1rem 0 !important;
}
</style>
