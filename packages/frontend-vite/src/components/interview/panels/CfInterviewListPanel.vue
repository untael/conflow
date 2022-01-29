<template>
  <cf-container :loading="isLoading" class="cf-interview-template-edit-form">
    <template #title>
      Interview list panel
    </template>

    <template #default>
      <cf-interview-list-item
          class="py-2"
          v-for="(interview, index) in interviews"
          :key="`${index}-${interview.id}`"
          :interview="interview"
      />
    </template>
  </cf-container>
</template>

<script lang="ts">
import { useInterview } from '@/composables/useInterview'
import { onMounted, Ref, ref } from 'vue'
import Interview from '@/api/Interview/Interview'
import CfContainer from '@/components/layout/CfContainer.vue'
import CfInterviewListItem
  from '@/components/interview/panels/CfInterviewListItem.vue'

export default {
  name: 'CfInterviewListPanel',
  components: { CfInterviewListItem, CfContainer },
  setup () {
    const { interviewAPIHandlers } = useInterview()
    const interviews: Ref<Interview[]> = ref([])
    const isLoading = ref(false)
    onMounted(async () => {
      isLoading.value = true
      interviews.value = await interviewAPIHandlers.getMany()
      isLoading.value = false
    })
    return {
      interviews,
      isLoading,
    }
  },

}
</script>

<style lang="scss">

</style>
