<template>
  <cf-container class="cf-interview-template-edit-form">
    <template #title>
      Interview template list panel
    </template>

    <template #default>
      <cf-spinner class="mx-auto" v-if="isLoading"/>
      <cf-interview-template-list-item
          v-else
          v-for="(interviewTemplate, index) in interviewTemplateList"
          :key="`${index}-${interviewTemplate.id}`"
          class="py-2"
          :editable="editable"
          :addable="addable"
          @edit="initInterviewTemplateEditPanel(interviewTemplate)"
          @display-question="initQuestionDisplayPanel"
          :interview-template="interviewTemplate"
      />
    </template>
  </cf-container>
</template>

<script lang="ts">
import CfContainer from '@/components/layout/CfContainer.vue'
import { onMounted, Ref, ref } from 'vue'
import { useInterviewTemplate } from '@/composables/useInterviewTemplate'
import CfInterviewTemplateListItem
  from '@/components/interview/template/panels/CfInterviewTemplateListItem.vue'
import InterviewTemplate from '@/api/InterviewTemplate/InterviewTemplate'
import { PanelNames } from '@/components/panels'
import Question from '@/api/Question/Question'
import { usePanel } from '@/composables/usePanel'
export default {
  name: 'CfInterviewTemplateListPanel',
  components: { CfInterviewTemplateListItem, CfContainer },
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
    const { $panel } = usePanel()
    const interviewTemplateList: Ref<InterviewTemplate[]> = ref([])
    const isLoading = ref(false)
    const { interviewTemplateAPIHandlers } = useInterviewTemplate()

    onMounted(async() => {
      isLoading.value = true
      interviewTemplateList.value = await interviewTemplateAPIHandlers.getMany()
      isLoading.value = false
    })
    const initInterviewTemplateEditPanel = (interviewTemplate: InterviewTemplate) => {
      $panel.init(PanelNames.InterviewTemplateEditPanel, {
        id: interviewTemplate.id,
      })
    }
    const initQuestionDisplayPanel = (question: Question) => {
      $panel.init(PanelNames.QuestionsEditPanel, {
        id: question.id,
        editable: false,
      })
    }
    return {
      interviewTemplateList,
      isLoading,
      initInterviewTemplateEditPanel,
      initQuestionDisplayPanel,
    }
  },

}
</script>

<style lang="scss">

</style>
