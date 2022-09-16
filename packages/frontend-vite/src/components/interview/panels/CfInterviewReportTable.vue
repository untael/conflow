<template>
  <div class="va-table-responsive w-full">
    <table class="va-table va-table--striped w-full">
      <thead>
      <tr>
        <th>Subject</th>
        <th>Mark</th>
        <th>Description</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(topic, index) in finalReport" :key="index">
        <td class="w-1/5">{{ topic.name }}</td>
        <td class="w-1/5">{{ topic.avgMark }} ({{ getAllMarks(topic.data) }})
        </td>
        <td>
          <div class="note" v-for="(data, i) in topic.data" :key="i">
            <div v-if="data.note">
              <span class="text-gray-500">{{ getUserName(data.userId) }}:</span> {{ data.note }}
            </div>
          </div>
        </td>

      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Interview from '@/api/Interview/Interview'
import TopicReport from '@/api/Interview/TopicReport'
import { InterviewUserReport } from '@/api/Interview/InterviewUserReport'
import User from '@/api/User/User'
import { computed } from 'vue'

export default {
  name: 'CfInterviewReportTable',
  props: {
    interview: {
      type: Interview,
      required: true,
    },
  },
  setup (props: any) {
    type ReportData = {
      userId: string,
      mark: number,
      note: string
    }
    type UnifiedTopicReport = {
      name: string,
      data: ReportData[],
      avgMark: number,
    }

    const emptyTopicReport = computed(() => {
      return props.interview.user_reports[0].topic_reports.map((topic: TopicReport) => {
        return { name: topic.name, data: [], avgMark: 0 }
      })
    })
    const finalReport = computed(() => {
      return emptyTopicReport.value.map((currTopic: UnifiedTopicReport) => {
        props.interview.user_reports.forEach((userReport: InterviewUserReport) => {
          const currentTopicData = userReport.topic_reports.find((topicReport) => {
            return topicReport.name === currTopic.name
          })
          currTopic.data.push({
            userId: userReport.user,
            mark: currentTopicData ? currentTopicData.mark : 0,
            note: currentTopicData ? currentTopicData.note : '',
          })
        })
        currTopic.avgMark = Math.round(currTopic.data.reduce((sum: number, curr: ReportData) => {
          return sum + curr.mark
        }, 0) / currTopic.data.length)

        return currTopic
      })
    })

    const getUserName = (userId: string) => {
      return props.interview.interviewers.find((interviewer: User) => interviewer.id === userId).full_name
    }
    const getAllMarks = (data: ReportData[]) => {
      return data.map((item) => item.mark).join(', ')
    }
    return {
      finalReport,
      getUserName,
      getAllMarks,
    }
  },
}
</script>

<style scoped>

</style>