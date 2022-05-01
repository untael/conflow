<template>
  <cf-container :loading="isLoading">
    <template #title>
      Interview Edit Panel
    </template>
    <template #default>
      <div>
        <cf-container-row>
          Interview name:
          <va-input v-model="interview.name"/>
        </cf-container-row>

        <cf-container-row class="flex">
          <div class="mr-1 flex-grow basis-1/2	">
            Candidate:
            <va-input v-model="interview.candidate"/>
          </div>
          <div class="ml-1 flex-grow basis-1/2	">
            Candidate level:
            <va-select
                v-model="interview.candidate_levels"
                text-by="name"
                :options="candidateLevels"
                multiple
            />
          </div>
        </cf-container-row>

        <cf-container-row class="flex">
          <div class="mr-1 flex-grow basis-1/2">
            Type:
            <va-select
                v-model="interview.type"
                text-by="name"
                :options="interviewTypes"
            />
          </div>
          <div class="ml-1 flex-grow basis-1/2">
            Interviewers:
            <va-select
                v-model="interview.interviewers"
                text-by="full_name"
                track-by="id"
                :options="interviewers"
                multiple
            />
          </div>
        </cf-container-row>

        <cf-container-row>
          Note:
          <va-input type="textarea" min-rows="2" autosize v-model="interview.note"/>
        </cf-container-row>
        <cf-container-row class="flex">
          <div class="basis-1/2	">
            Date:
            <va-date-input
                v-model="interview.date"
                :returnRaw="false"
                mask="date"
            />
          </div>
          <div class="ml-2 basis-1/2	">
            Time:
            <va-time-input
                v-model="interview.time"
                :returnRaw="false"
                manual-input
            />
          </div>
        </cf-container-row>

        <cf-container-row>
          Questions:
          <div v-for="(interviewQuestion, index) in interview.questions" :key="`iq-${index}-${interviewQuestion.question.id}`">
            <cf-question-item
                can-be-removed
                :question="interviewQuestion.question"
                @remove="removeQuestion(interviewQuestion)"
                class="py-2 grow"
            />
          </div>
        </cf-container-row>

        <va-button class="flex-none" @click="initQuestionsPanel" color="primary">Add more</va-button>
      </div>
    </template>

    <template #control-buttons>
      <cf-control-buttons
          v-if="editable"
          @cancel="$router.back()"
          @save="onSave"
      >
        <template #customs>
          <va-button class="flex-none" :color="interview.interviewTemplate ? 'danger' : 'primary'" @click="handleToggleTemplate">
            {{ toggleTemplateText }} template
          </va-button>
        </template>
      </cf-control-buttons>
    </template>
  </cf-container>
</template>

<script lang="ts">
import CfContainer from '@/components/layout/CfContainer.vue'
import CfControlButtons from '@/components/layout/CfControlButtons.vue'
import CfContainerRow from '@/components/layout/CfContainerRow.vue'
import { useInterview } from '@/composables/useInterview'
import { computed, onMounted, Ref, ref, watch } from 'vue'
import InterviewTemplate from '@/api/InterviewTemplate/InterviewTemplate'
import { usePanel } from '@/composables/usePanel'
import { PanelNames } from '@/components/panels'
import { QuestionEvents } from '@/api/Question/events'
import Question from '@/api/Question/Question'
import { useEmitter } from '@/composables/useEmitter'
import { InterviewTemplateEvents } from '@/api/InterviewTemplate/events'
import CfQuestionItem from '@/components/question/CfQuestionItem.vue'
import InterviewType from '@/api/InterviewType/InterviewType'
import CandidateLevel from '@/api/CandidateLevel/CandidateLevel'
import { useInterviewTemplate } from '@/composables/useInterviewTemplate'
import { useRoute, useRouter } from 'vue-router'
import { useUser } from '@/composables/useUser'
import User from '@/api/User/User'
import InterviewQuestion from '@/api/InterviewQuestion/InterviewQuestion'


export default {
  name: 'CfInterviewEditPanel',
  components: { CfQuestionItem, CfContainerRow, CfContainer, CfControlButtons },
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
    const router = useRouter()
    const { $panel } = usePanel()
    const { $emitter } = useEmitter()
    const { interview, interviewAPIHandlers } = useInterview()
    const { userAPIHandlers } = useUser()
    const { interviewTemplateAPIHandlers } = useInterviewTemplate()
    const interviewTypes: Ref<InterviewType[]> = ref([])
    const candidateLevels: Ref<CandidateLevel[]> = ref([])
    const interviewers: Ref<User[]> = ref([])
    const isLoading = ref(false)
    const onSave = async () => {
      if (!props.id) {
        await interviewAPIHandlers.create(interview.value)
      } else {
        await interviewAPIHandlers.update(interview.value)

      }
    }
    const toggleTemplateText = computed(() => interview.value.interviewTemplate ? 'Discard' : 'Apply')

    onMounted(async () => {
      const interviewId = route.params.id as string
      isLoading.value = true
      if (interviewId || props.id) {
        interview.value = await interviewAPIHandlers.getOne(interviewId || props.id)
      }
      await Promise.all([
        await interviewTemplateAPIHandlers.getTypes(),
        await interviewTemplateAPIHandlers.getCandidateLevels(),
        await userAPIHandlers.getMany(),
      ]).then(([fetchedTypes, fetchedLevels, fetchedInterviewers]) => {
        interviewTypes.value = fetchedTypes
        candidateLevels.value = fetchedLevels
        interviewers.value = fetchedInterviewers
      })
      isLoading.value = false
    })
    const handleToggleTemplate = () => {
      if (interview.value.interviewTemplate) {
        interview.value.discardInterviewTemplate()
      } else {
        initInterviewTemplatePanel()
      }
    }
    const removeQuestion = (interviewQuestion: InterviewQuestion) => {
      // if (interview.value.interviewTemplate) {
      //   const isTemplateQuestion = interview.value.interviewTemplate.questions.find((existingQuestion: Question) => existingQuestion.id === interviewQuestion.question.id)
      //   if (isTemplateQuestion) {
      //     interview.value.interviewTemplate.questions = interview.value.interviewTemplate.questions.filter((existingQuestion: Question) => existingQuestion.id !== question.id)
      //   }
      //   return
      // }
      interview.value.questions = interview.value.questions.filter((existingQuestion: InterviewQuestion) => existingQuestion.question.id !== interviewQuestion.question.id)
    }
    const initInterviewTemplatePanel = () => {
      $panel.init(PanelNames.InterviewTemplateListPanel, {
        addable: true,
      })
    }

    $emitter.on(InterviewTemplateEvents.Add, (interviewTemplate: InterviewTemplate) => {
      interview.value.applyInterviewTemplate(interviewTemplate)
    })

    $emitter.on(QuestionEvents.Add, (question: Question) => {
      const isInList = interview.value.questions.find((interviewQuestion: InterviewQuestion) => interviewQuestion.question.id === question.id)
      if (!isInList) {
        const questionToAdd = new InterviewQuestion()
        questionToAdd.question = question
        interview.value.questions.push(questionToAdd)
      }
    })

    const initQuestionsPanel = () => {
      $panel.init(PanelNames.QuestionsListPanel, {
        addable: true,
      })
    }
    const fetchInterview = async () => {
      const interviewId = route.params.id as string
      if (interviewId || props.id) {
        try {
          isLoading.value = true
          interview.value = await interviewAPIHandlers.getOne(interviewId || props.id)
          isLoading.value = false
        } catch {
          await router.push({ name: 'Not found' })
        }
      }
    }

    watch(props, async () => {
      await fetchInterview()
    })

    return {
      isLoading,
      PanelNames,
      onSave,
      interview,
      initInterviewTemplatePanel,
      removeQuestion,
      initQuestionsPanel,
      interviewTypes,
      candidateLevels,
      interviewers,
      toggleTemplateText,
      handleToggleTemplate,
    }
  },
}
</script>


