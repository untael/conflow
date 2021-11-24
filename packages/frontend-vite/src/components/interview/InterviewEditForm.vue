<template>
  <cf-container>
    <template #title>
      Interview Edit Form
    </template>
    <template #default>
      <div class="py-2">
        Interview name:
        <va-input v-model="name"/>
      </div>
      <div class="py-2">
        Candidate:
        <va-select v-model="selectedCandidate" :options="candidates"/>
      </div>
      <div class="py-2">
        Interviewers:
        <va-select v-model="selectedInterviewers" :options="interviewers" multiple/>
      </div>
      <div class="py-2">
        Note:
        <va-input type="textarea" min-rows="2" autosize v-model="note"/>
      </div>
      <div class="py-2 d-flex">
        <div>
          Date:
          <va-date-input
              v-model="date"
              :returnRaw="false"
              mask="date"
          />
        </div>
        <div class="ml-2">
          Time:
          <va-time-input
              v-model="time"
              :returnRaw="false"
              manual-input
          />
        </div>
      </div>

      <div class="pt-4 d-flex justify-end">
        <va-button>Save</va-button>
      </div>
    </template>
  </cf-container>

</template>

<script lang="ts">
import {computed, ref} from 'vue'
import CfContainer from "@/components/layout/CfContainer.vue";


export default {
  name: 'InterviewEditForm',
  components: {CfContainer},

  setup() {
    const name = ref('')
    const computedName = computed(() => {
      return name.value ? name.value : ''
    })
    const candidates = ref(['Pavel', 'Valeria', 'Yauheni'])
    const selectedCandidate = ref('Pavel')
    const interviewers = ref(['Andrii', 'Maxim', 'Alexander'])
    const selectedInterviewers = ref(['Maxim', 'Alexander'])
    const note = ref('')
    const date = ref('')
    const time = ref(new Date())
    return {
      name,
      candidates,
      selectedCandidate,
      interviewers,
      selectedInterviewers,
      note,
      date,
      time,
    }
  },
}
</script>


