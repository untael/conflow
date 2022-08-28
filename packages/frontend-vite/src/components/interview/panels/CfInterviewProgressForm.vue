<template>
  <cf-container class="cf-interview-progress-form" :loading="isLoading">
    <template #title>
      {{ interview.name }} Interview
    </template>
    <template #default>
      <cf-container-row title="Interview summary:">

        <div class="flex justify-start items-center text-xs">
          <div class="py-2 flex-none basis-1/3">
            Type:
          </div>
          <div class="py-2 flex items-center flex-none basis-2/3">
            <div class="flex-none" v-if="interview?.type?.icon">
              <va-icon class="mr-2" color="black" :name="interview?.type?.icon"></va-icon>
            </div>
            <div class="flex-none">{{ interview?.type?.name }}</div>
          </div>
        </div>

        <div class="flex justify-start items-center text-xs" v-if="interview.note">
          <div class="py-2 flex-none basis-1/3">
            Note:
          </div>
          <div class="py-2 flex items-center flex-none basis-2/3">
            {{ interview.note }}
          </div>
        </div>
      </cf-container-row>

      <cf-container-row title="Candidate summary:">
        <div class="flex justify-start items-center text-xs">
          <div class="py-2 flex-none basis-1/3">
            Name:
          </div>
          <div class="py-2 flex items-center flex-none basis-2/3">
            {{ interview.candidate }}
          </div>
        </div>

        <div class="flex justify-start items-center text-xs">
          <div class="py-2 flex-none basis-1/3">
            Estimated level:
          </div>
          <div class="py-2 flex items-center flex-none basis-2/3">
            <va-chip
                v-for="(candidate_level, index) in interview.candidate_levels"
                :key="index"
                color="#d1d5db"
                size="small"
                square
                outline
                class="mr-2 flex-none"
            >
              {{ candidate_level.name }}
            </va-chip>
          </div>
        </div>
      </cf-container-row>
      <cf-container-row title="Questions:">
        <div v-for="(question, index) in interview.questions" :key="`iq-${index}-${question.id}`">
          <cf-interview-question-item
              can-be-started
              :question="question"
              class="py-2 grow"
          />
        </div>
      </cf-container-row>
      <cf-container-row title="Results:">
        <div
            v-for="(topic, index) in topicReport"
            :key="`${topic.name}-${index}`"
        >
          <va-slider
              class="mb-3"
              v-model="topic.mark"
              pins
              :min="0"
              :max="10"
              :label="topic.name"
              track-label-visible
          >
            <template #append>
              <va-input v-model="topic.note" placeholder="Note" type="textarea"></va-input>
            </template>
          </va-slider>
        </div>
        <div>
          <va-switch label="Is candidate good for us?" left-label v-model="opinionCheck"/>
        </div>
      </cf-container-row>
    </template>


    <template #control-buttons>
      <cf-control-buttons
          saveButtonText="End"
          cancelButtonText="Abort"
          @cancel="cancelInterview"
          @save="onSave"
      />
    </template>
  </cf-container>
</template>

<script lang="ts">
import Interview, { InterviewStatusEnum } from '@/api/Interview/Interview'
import CfContainer from '@/components/layout/CfContainer.vue'
import CfContainerRow from '@/components/layout/CfContainerRow.vue'
import CfControlButtons from '@/components/layout/CfControlButtons.vue'
import { useInterview } from '@/composables/useInterview'
import CfInterviewQuestionItem
  from '@/components/interview/panels/CfInterviewQuestionItem.vue'
import { ref } from 'vue'
import InterviewQuestion from '@/api/InterviewQuestion/InterviewQuestion'
import {
  InterviewUserReport,
  TopicReport,
} from '@/api/Interview/InterviewUserReport'
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'CfInterviewProgressForm',
  components: { CfInterviewQuestionItem, CfControlButtons, CfContainerRow, CfContainer },
  props: {
    interview: {
      type: Interview,
      required: true,
    },
    isLoading: {
      type: Boolean,
    },
  },
  setup (props: any, { emit }: any) {
    const { interview, interviewAPIHandlers } = useInterview()
    const { currentUser } = useAuth()
    const onSave = () => {
      if(!props.interview.user_reports.some((report: InterviewUserReport) => report.user.id === currentUser.value.id))
        props.interview.user_reports.push(
            new InterviewUserReport({
              user: currentUser.value,
              topic_report: topicReport.value,
              opinion_check: opinionCheck.value,
            })
        )
      props.interview.status = InterviewStatusEnum.Finished
    }
    const cancelInterview = () => {
      // emit('cancel')
      console.log('cancel changes')
    }

    const uniqueTopics = new Set()
    props.interview.questions.forEach((question: InterviewQuestion) => {
      question.data.tags.forEach(tag => {
        uniqueTopics.add(tag.name)
      })
    })
    const extractedTopics: TopicReport[] = Array.from(uniqueTopics).reduce((acc: any, item) => {
      acc.push({
        name: item,
        mark: 0,
        note: ''
      })
      return acc
    }, []) as TopicReport[]
    extractedTopics.push({
      name: 'Total',
      mark: 0,
      note: ''
    })

    const topicReport = ref(extractedTopics)
    const opinionCheck = ref(false)
    return {
      onSave,
      cancelInterview,
      topicReport,
      opinionCheck,
    }
  },

}
</script>

<style lang="scss">
.cf-interview-progress-form {
  .va-slider {
    display: grid;
    grid-template-columns: 20% 40% 40%;
  }
}
</style>
