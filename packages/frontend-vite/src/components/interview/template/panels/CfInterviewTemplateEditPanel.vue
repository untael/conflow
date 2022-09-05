<template>
  <cf-container :loading="isLoading" class="cf-interview-template-edit-panel">
    <template #title>
      Interview template edit panel
    </template>

    <template #default>
      <div>
        <div class="w-1/2 pr-2">
          <cf-container-row title="Name:">
            <va-input class="w-full" v-model="interviewTemplate.name"/>
          </cf-container-row>
        </div>

        <div class="flex">
        <cf-container-row  title="Type:">
          <div class="mr-3 flex-grow">
            <va-select
                class="w-full"
                v-model="interviewTemplate.type"
                text-by="name"
                :options="interviewTypes"
            />
          </div>
        </cf-container-row>
        <cf-container-row title="Candidate level:">
          <div >
            <va-select
                class="w-full"
                v-model="interviewTemplate.candidate_levels"
                text-by="name"
                :options="candidateLevels"
                multiple
            />
          </div>
        </cf-container-row>
        </div>
        <cf-container-row title="Questions:">

          <div v-for="(question, index) in interviewTemplate.questions" :key="`iq-${index}-${question.id}`">
            <cf-question-item
                can-be-removed
                @remove="removeTemplateQuestion(question)"
                :question="question"
                class="py-2 grow"
            />
          </div>
        </cf-container-row>

        <va-button @click="initQuestionsPanel" color="primary">Add more</va-button>
      </div>

    </template>
    <template #control-buttons>
      <cf-control-buttons
          v-if="editable"
          @cancel="$router.back()"
          @save="onSave"
      />
    </template>
  </cf-container>
</template>

<script lang="ts">
import CfContainer from '../../../layout/CfContainer.vue'
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
import CfControlButtons from '@/components/layout/CfControlButtons.vue'
import { useInterviewTemplate } from '@/composables/useInterviewTemplate'
import { useRoute } from 'vue-router'
import InterviewType from '@/api/InterviewType/InterviewType'
import CandidateLevel from '@/api/CandidateLevel/CandidateLevel'
import CfContainerRow from '@/components/layout/CfContainerRow.vue'

export default {
  name: 'CfInterviewTemplateEditPanel',
  components: { CfContainerRow, CfQuestionItem, CfContainer, CfControlButtons },
  props: {
    id: {
      type: String,
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  setup (props: any) {
    const route = useRoute()
    const {
      interviewTemplate,
      interviewTemplateAPIHandlers,
    } = useInterviewTemplate()
    const { $emitter } = useEmitter()
    const { $panel } = usePanel()
    const tags: Ref<Tag[]> = ref([])
    const tagsToFilter: Ref<Tag[]> = ref([])
    const questions: Ref<Question[]> = ref([])
    const interviewTypes: Ref<InterviewType[]> = ref([])
    const candidateLevels: Ref<CandidateLevel[]> = ref([])
    const { getTags } = useTag()
    const { getQuestions } = useQuestion()
    const showAddQuestionModal = ref(false)
    const isLoading = ref(false)
    $emitter.on(QuestionEvents.Add, (question: Question) => {
      addTemplateQuestion(question)
    })
    const onSave = async () => {
      await interviewTemplateAPIHandlers.create(interviewTemplate.value)
    }
    const addTemplateQuestion = (question: Question) => {
      const isInList = interviewTemplate.value.questions.find((existingQuestion: Question) => existingQuestion.id === question.id)
      if (!isInList) {
        interviewTemplate.value.questions.push(question)
      }
    }
    const removeTemplateQuestion = (question: Question) => {
      interviewTemplate.value.questions = interviewTemplate.value.questions.filter((existingQuestion: Question) => existingQuestion.id !== question.id)
    }
    onMounted(async () => {
      const interviewTemplateId = route.params.id as string
      isLoading.value = true
      if (interviewTemplateId || props.id) {
        interviewTemplate.value = await interviewTemplateAPIHandlers.getOne(interviewTemplateId || props.id)
      }
      //ToDo: refactor
      await Promise.all([
        await interviewTemplateAPIHandlers.getTypes(),
        await interviewTemplateAPIHandlers.getCandidateLevels(),
        await getTags(),
        await getQuestions(),
      ]).then((data) => {
        interviewTypes.value = data[0]
        candidateLevels.value = data[1]
        tags.value = data[2]
        questions.value = data[3]
      })
      isLoading.value = false
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
      onSave,
      initQuestionEditPanel,
      initQuestionsPanel,
      interviewTemplate,
      tags,
      tagsToFilter,
      showAddQuestionModal,
      questions,
      addTemplateQuestion,
      removeTemplateQuestion,
      interviewTypes,
      candidateLevels,
      isLoading,
    }
  },
}
</script>

<style lang="scss">
.cf-interview-template-edit-panel {
  --va-button-border-radius: 0.5rem;
}

.va-modal__inner {
  padding: 0 0 1rem 0 !important;
}
</style>
