<template>
  <cf-container>
    <template #default>
      <va-card-title class="justify--center px-0 text-lg">
        {{ interview.title }}
      </va-card-title>

      <CfInfoLine
          title="Candidate"
          :description="interview.candidate.full_name"
          divided
      />

      <CfInfoLine
          title="Company"
          :description="interview.business.name"
          divided
      />

      <CfInfoLine
          title="Recruiters"
          divided
      >
        <template #default>
          <div v-for="(recruiter, key) in interview.recruiters" :key="key">
            <div class="text-right">{{ recruiter.full_name }}</div>
          </div>
        </template>
      </CfInfoLine>

      <CfInfoLine
          title="Interviewers"
          divided
      >
        <template #default>
          <div v-for="(interviewer, key) in interview.interviewers" :key="key">
            <div class="text-right">{{ interviewer.full_name }}</div>
          </div>
        </template>
      </CfInfoLine>

      <CfInfoLine
          title="Date"
          :description="interview.date"
          dense
      />

      <CfInfoLine
          title="Duration"
          :description="interview.duration"
          dense
      />

      <div class="d-flex justify--center">
        <va-button size="large" class="my-4" @click="$router.push({name: 'Interview Process'})">Start interview</va-button>
      </div>
    </template>
  </cf-container>
</template>

<script lang="ts">
import { useInterview } from '@/api/Event/Interview/composables/interview'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CfInfoLine from '@/components/layout/CfInfoLine.vue'
import CfContainer from '@/components/layout/CfContainer.vue'

export default {
  name: 'InterviewDisplayPage',
  components: { CfContainer, CfInfoLine },
  setup () {
    const route = useRoute()
    const {
      interview,
      getInterview,
      updateInterview,
      deleteInterview,
    } = useInterview()

    onMounted(async () => {
      interview.value = await getInterview(route.params.id)
    })
    return {
      interview,
    }
  },
}
</script>
<style lang="scss">
.interview-display-page {
  --va-collapse-solid-box-shadow: none;

  .va-collapse__body {
    border: 1px solid var(--va-collapse-solid-header-content-background-color);
  }
}
</style>
