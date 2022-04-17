<template>
  <cf-container :loading="isLoading">
    <template #title>
      {{ interview.name }} Interview
    </template>
    <template #default>
      <cf-container-row title="Interview summary:">

        <div class="flex justify-start items-center text-xs">
          <div class="py-2 flex-none basis-1/3">
            Type:
          </div>
          <div class="py-2 flex items-center flex-none basis-2/3">
            <div class="flex-none" v-if="interview?.type?.icon">
              <va-icon class="mr-2" color="black" :name="interview?.type?.icon"></va-icon>
            </div>
            <div class="flex-none">{{ interview?.type?.name }}</div>
          </div>
        </div>

        <div class="flex justify-start items-center text-xs" v-if="interview.note">
          <div class="py-2 flex-none basis-1/3">
            Note:
          </div>
          <div class="py-2 flex items-center flex-none basis-2/3">
            {{ interview.note }}
          </div>
        </div>
      </cf-container-row>

      <cf-container-row title="Candidate summary:">
        <div class="flex justify-start items-center text-xs">
          <div class="py-2 flex-none basis-1/3">
            Name:
          </div>
          <div class="py-2 flex items-center flex-none basis-2/3">
            {{ interview.candidate }}
          </div>
        </div>

        <div class="flex justify-start items-center text-xs">
          <div class="py-2 flex-none basis-1/3">
            Estimated level:
          </div>
          <div class="py-2 flex items-center flex-none basis-2/3">
            <va-chip
                v-for="(candidate_level, index) in interview.candidate_levels"
                :key="index"
                color="#d1d5db"
                size="small"
                square
                outline
                class="mr-2 flex-none"
            >
              {{ candidate_level.name }}
            </va-chip>
          </div>
        </div>
      </cf-container-row>
      <cf-container-row>
        Questions:
        <div v-for="(question, index) in interview.questions" :key="`iq-${index}-${question.id}`">
          <cf-question-item
              canBeStarted="true"
              :question="question"
              class="py-2 grow"
          />


        </div>
      </cf-container-row>
    </template>


    <template #control-buttons>
      <cf-control-buttons
          saveButtonText="Save"
          cancelButtonText="Cancel"
          @cancel="cancelInterview"
          @save="onSave"
      />
    </template>
  </cf-container>
</template>

<script lang="ts">
import Interview from '@/api/Interview/Interview'
import CfContainer from '@/components/layout/CfContainer.vue'
import CfContainerRow from '@/components/layout/CfContainerRow.vue'
import CfControlButtons from '@/components/layout/CfControlButtons.vue'
import { useInterview } from '@/composables/useInterview'
import CfQuestionItem from '@/components/question/CfQuestionItem.vue'
import { ref } from 'vue'

export default {
  name: 'CfInterviewIncomingForm',
  components: { CfControlButtons, CfContainerRow, CfContainer, CfQuestionItem },
  props: {
    interview: {
      type: Interview,
      required: true,
    },
    isLoading: {
      type: Boolean,
    },
  },
  setup (props: any, { emit }: any) {
    const { interview, interviewAPIHandlers } = useInterview()
    const onSave = () => {
      console.log('save changes')
    }
    const cancelInterview = () => {
      // emit('cancel')
      console.log('cancel changes')
    }


    let ratingValue = 0
    return {
      onSave,
      cancelInterview,
      ratingValue,
    }
  },

}
</script>

<style lang="scss">

</style>
