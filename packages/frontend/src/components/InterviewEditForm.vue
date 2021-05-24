<template>
  <va-card square outlined class="container px-4 py-4 border-0">
    <va-card-title>
      Interview Edit Form
    </va-card-title>
    <va-card-content>
      <div class="py-2">
        Interview name:
        <va-input v-model="name"/>
      </div>
      <div class="py-2">
        Candidate:
        <va-select v-model="candidates"/>
      </div>
      <div class="py-2">
        Interviewers:
        <va-select v-model="interviewers"/>
      </div>
      <div class="py-2">
        Note:
        <va-input type="textarea" min-rows="2" autosize v-model="note"/>
      </div>
      <div class="py-2 d-flex">
        <div class="w-full">
          Date:
          <va-input
              v-model="date"
              :returnRaw="false"
              mask="date"
          />
        </div>
        <div class="w-full ml-2">
          Time:
          <va-input
              v-model="time"
              :returnRaw="false"
              :mask="{blocks: [2, 2]}"
          />
        </div>
      </div>

      <div class="pt-4 d-flex justify--end">
        <va-button>Save</va-button>
      </div>
    </va-card-content>
  </va-card>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'InterviewEditForm',

  setup () {
    const name = ref('')
    const candidates = ref([])
    const interviewers = ref([])
    const note = ref('')
    const date = ref('')
    const time = ref('')
    return {
      name,
      candidates,
      interviewers,
      note,
      date,
      time,
    }
  },
}
</script>


