<template>
  <cf-interview-incoming-form
      v-if="interview.status === 'incoming'"
      :interview="interview"
      :loading="isLoading"
      @cancel="cancel"
      :preview="isPreview"
  />
  <cf-interview-progress-form
      v-if="interview.status === 'in_progress'"
      :interview="interview"
      :loading="isLoading"
      @cancel="cancel"
      :preview="isPreview"
      @refreshInterview="refreshInterview"
  />
  <cf-interview-cancelled-form
      v-if="interview.status === 'cancelled'"
      :interview="interview"
      :loading="isLoading"
      @cancel="cancel"
      :preview="isPreview"
  />
  <cf-interview-finished-form
      v-if="interview.status === 'finished'"
      :interview="interview"
      :loading="isLoading"
      @cancel="cancel"
      :preview="isPreview"
  />
</template>

<script lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import CfContainer from '@/components/layout/CfContainer.vue'
import CfControlButtons from '@/components/layout/CfControlButtons.vue'
import { useRoute, useRouter } from 'vue-router'
import { useInterview } from '@/composables/useInterview'
import CfContainerRow from '@/components/layout/CfContainerRow.vue'
import CfInterviewProgressForm
  from '@/components/interview/panels/CfInterviewProgressForm.vue'
import CfInterviewIncomingForm
  from '@/components/interview/panels/CfInterviewIncomingForm.vue'
import CfInterviewCancelledForm
  from '@/components/interview/panels/CfInterviewCancelledForm.vue'
import CfInterviewFinishedForm
  from '@/components/interview/panels/CfInterviewFinishedForm.vue'

export default {
  name: 'CfInterviewPreviewPanel',
  components: {
    CfInterviewIncomingForm,
    CfContainerRow,
    CfControlButtons,
    CfContainer,
    CfInterviewProgressForm,
    CfInterviewCancelledForm,
    CfInterviewFinishedForm,
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
          router.push({ name: 'Not found' })
        }
      }
    }

    watch(props, async () => {
      await fetchInterview()
    })

    const cancel = async () => {
      interview.value = await interviewAPIHandlers.cancel()
    }

    const refreshInterview = async () => {
      await fetchInterview()
    }

    const isPreview = computed(() => {
      return route.name === 'Interviews list'
    })

    return {
      isLoading,
      interview,
      cancel,
      isPreview,
      refreshInterview,
    }
  },

}
</script>

<style lang="scss">

</style>
