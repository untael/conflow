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

      <cf-control-buttons @cancel="$router.back()" @save="onSave"/>
    </template>
  </cf-container>

</template>

<script lang="ts">
import { computed, ref } from 'vue'
import CfContainer from '@/components/layout/CfContainer.vue'
import CfControlButtons from '@/components/layout/CfControlButtons.vue'


export default {
  name: 'CfInterviewEditPanel',
  components: { CfContainer, CfControlButtons },

  setup () {
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
    const onSave = () => {
      console.log('save button clicked')
    }
    return {
      onSave,
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


