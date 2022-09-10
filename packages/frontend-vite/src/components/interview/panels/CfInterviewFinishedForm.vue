<template>
  <cf-container class="cf-interview-progress-form" :loading="isLoading">
    <template #title>
      {{ interview.name }} Interview
    </template>
    <template #default>
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
      <cf-interview-report-table :interview="interview"/>
      <hr>
      <cf-container-row title="Opinion check:" class="mt-3">
        <div
            class="flex justify-start items-center text-xs"
             v-for="(interviewer,index) in interview.interviewers"
             :key="index"
        >
          <div class="py-2 flex-none basis-1/3">
            {{ interviewer.full_name }}
          </div>
          <div class="py-2 flex items-center flex-none basis-2/3">
            <va-icon size="small"
                :name="getOpinionCheck(interviewer.id).icon"
                :color="getOpinionCheck(interviewer.id).color"
            />
          </div>
        </div>
      </cf-container-row>
    </template>
  </cf-container>

</template>

<script lang="ts">
import Interview from '@/api/Interview/Interview'
import CfInterviewQuestionItem
  from '@/components/interview/panels/CfInterviewQuestionItem.vue'
import CfControlButtons from '@/components/layout/CfControlButtons.vue'
import CfContainerRow from '@/components/layout/CfContainerRow.vue'
import CfContainer from '@/components/layout/CfContainer.vue'
import { InterviewUserReport } from '@/api/Interview/InterviewUserReport'
import User from '@/api/User/User'
import TopicReport from '@/api/Interview/TopicReport'
import CfInterviewReportTable
  from '@/components/interview/panels/CfInterviewReportTable.vue'

export default {
  name: 'CfInterviewFinishedForm.vue',
  components: {
    CfInterviewReportTable,
    CfInterviewQuestionItem,
    CfControlButtons,
    CfContainerRow,
    CfContainer,
  },
  props: {
    interview: {
      type: Interview,
      required: true,
    },
    isLoading: {
      type: Boolean,
    },
    preview: {
      type: Boolean,
      default: false,
    },
  },

  setup (props: any) {
    const getOpinionCheck = (interviewerId: string) => {
      const currentInterviewerReport = props.interview.user_reports.find((report: InterviewUserReport) => {
        return report.user === interviewerId
      })
      if (currentInterviewerReport) {
        return currentInterviewerReport.opinion_check ? {
          icon: 'done',
          color: 'success',
        } : { icon: 'cancel', color: 'danger' }
      } else {
        return { icon: 'search', color: 'gray' }
      }
    }

    return {
      getOpinionCheck,
    }
  },

}
</script>

<style lang="scss">

</style>