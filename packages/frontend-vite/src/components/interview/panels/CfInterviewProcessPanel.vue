<template>
    <cf-interview-process-incoming-form
        v-if="interview.status === 'incoming'"
        :interview="interview"
        :loading="isLoading"
        @cancel="cancel"
    />
</template>

<script lang="ts">
import { onMounted, ref, watch } from 'vue'
import CfContainer from '@/components/layout/CfContainer.vue'
import CfControlButtons from '@/components/layout/CfControlButtons.vue'
import { useRoute, useRouter } from 'vue-router'
import { useInterview } from '@/composables/useInterview'
import CfContainerRow from '@/components/layout/CfContainerRow.vue'
import CfInterviewProcessIncomingForm
  from '@/components/interview/panels/CfInterviewProcessIncomingForm.vue'

export default {
  name: 'CfInterviewProcessPanel',
  components: {
    CfInterviewProcessIncomingForm,
    CfContainerRow,
    CfControlButtons,
    CfContainer,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup (props: any) {
    const route = useRoute()
    const router = useRouter()
    const isLoading = ref(false)
    const { interview, interviewAPIHandlers } = useInterview()

    onMounted(async () => {
      const interviewId = route.params.id as string
      isLoading.value = true
      if (interviewId || props.id) {
        interview.value = await interviewAPIHandlers.getOne(interviewId || props.id)
      }
      isLoading.value = false
    })

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

    const cancel = async () => {
      interview.value = await interviewAPIHandlers.cancel()
    }
    return {
      isLoading,
      interview,
      cancel,
    }
  },

}
</script>

<style lang="scss">

</style>
