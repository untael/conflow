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
          :editable="editable"
          @preview="showInterviewPreview(interview)"
          @edit="editInterview(interview)"

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
import { PanelNames } from '@/components/panels'
import { usePanel } from '@/composables/usePanel'

export default {
  name: 'CfInterviewListPanel',
  components: { CfInterviewListItem, CfContainer },
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    addable: {
      type: Boolean,
      default: false,
    },
  },
  setup () {
    const { interviewAPIHandlers } = useInterview()
    const interviews: Ref<Interview[]> = ref([])
    const isLoading = ref(false)
    const { $panel } = usePanel()

    onMounted(async () => {
      isLoading.value = true
      interviews.value = await interviewAPIHandlers.getMany()
      isLoading.value = false
    })
    const showInterviewPreview = (interview: Interview) => {
      $panel.init(PanelNames.InterviewPreviewPanel, {
        id: interview.id,
        printable: true,
      })
    }
    const editInterview = (interview: Interview) => {
      $panel.init(PanelNames.InterviewEditPanel, {
        id: interview.id,
      })
    }
    return {
      interviews,
      isLoading,
      showInterviewPreview,
      editInterview,
    }
  },

}
</script>

<style lang="scss">

</style>
