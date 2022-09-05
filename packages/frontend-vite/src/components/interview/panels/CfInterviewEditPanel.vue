<template>
  <cf-container :loading="isLoading">
    <template #title>
      Interview Edit Panel
    </template>
    <template #default>
      <div>
        <div class="w-1/2 pr-2">
        <cf-container-row title="Interview name:">
          <va-input class="w-full" v-model="interview.name"/>
        </cf-container-row></div>
        <div class="flex">
        <div class="mr-3">
          <cf-container-row title="Candidate:">
            <div>
              <va-input v-model="interview.candidate" class="w-full"/>
            </div>
          </cf-container-row>
          <cf-container-row title="Type:">
            <div>
              <va-select
                  class="w-full"
                  v-model="interview.type"
                  text-by="name"
                  :options="interviewTypes"
              />
            </div>
          </cf-container-row>
        </div>
        <div >
          <cf-container-row  title="Candidate level:">
          <div >
            <va-select
                class="w-full"
                v-model="interview.candidate_levels"
                text-by="name"
                :options="candidateLevels"
                multiple
            />
          </div>
          </cf-container-row>
          <cf-container-row  title="Interviewers:">
            <div>
              <va-select
                  class="w-full"
                  v-model="interview.interviewers"
                  text-by="full_name"
                  track-by="id"
                  :options="interviewers"
                  multiple
              />
            </div>
          </cf-container-row>
        </div>
      </div>
        <cf-container-row  title="Note:">
          <va-input type="textarea" min-rows="2" autosize v-model="interview.note" class="w-full"/>
        </cf-container-row>
        <div class="flex">
          <cf-container-row title="Date:">
          <div>
            <va-date-input
                class="w-full"
                v-model="interview.date"
                :returnRaw="false"
                mask="date"
            />
          </div>
        </cf-container-row>
          <cf-container-row title="Time:">
            <div class="ml-3">
              <va-time-input
                  class="w-full"
                  v-model="interview.time"
                  :returnRaw="false"
                  manual-input
              />
            </div></cf-container-row>
        </div>

        <cf-container-row title="Questions:">
          <div v-for="(interviewQuestion, index) in interview.questions" :key="`iq-${index}-${interviewQuestion.data.id}`">
            <cf-question-item
                can-be-removed
                :question="interviewQuestion.data"
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
      interview.value.questions = interview.value.questions.filter((existingQuestion: InterviewQuestion) => existingQuestion.data.id !== interviewQuestion.data.id)
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
      const isInList = interview.value.questions.find((interviewQuestion: InterviewQuestion) => interviewQuestion.data.id === question.id)
      if (!isInList) {
        const questionToAdd = new InterviewQuestion()
        questionToAdd.data = question
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



