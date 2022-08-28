<template>
  <va-collapse
      class="cf-interview-template-list-item cf-question-item shadow-none"
      v-model="value"
      color-all
  >
    <template #header>
      <div class="va-collapse__header">
        <div class="va-collapse__header__text">{{ interviewTemplate.name }}</div>
        <va-button v-if="editable" size="small" class="mx-1" flat icon="edit" @click.stop="$emit('edit')"/>
        <va-button v-if="addable" size="small" class="mx-1" flat icon="add" @click.stop="$emit('add')"/>
        <!--        <va-button v-if="canBeRemoved" size="small" class="mx-1" flat icon="remove" @click.stop="$emit('remove')"/>-->
        <va-icon class="va-collapse__header__icon" color="black" :name="value ? 'expand_less' : 'expand_more'"/>
      </div>
    </template>
    <div class="pt-2 text-sm bg-gray-50">
      <div class="flex justify-start items-start px-2">
        <div class="py-2 flex-none basis-1/3">
          Name:
        </div>
        <div class="py-2 text-xs flex items-center flex-none basis-2/3">
          {{ interviewTemplate.name }}
          </div>
      </div>
      <div class="flex justify-start items-start px-2">
        <div class="py-2 flex-none basis-1/3">
          Type:
        </div>
        <div class="py-2 text-xs flex items-center flex-none basis-2/3">
          <div class="flex-none" v-if="interviewTemplate.type.icon">
            <va-icon class="mr-2" color="black" :name="interviewTemplate.type.icon"></va-icon>
          </div>
          <div class="flex-none">{{ interviewTemplate.type.name }}</div>
        </div>
      </div>
      <div class="flex justify-start items-start px-2">
        <div class="py-2 flex-none basis-1/3">
          Candidate levels:
        </div>
        <div class="py-2 text-xs flex items-center flex-none basis-2/3">
          <va-chip
              v-for="(candidate_level, index) in interviewTemplate.candidate_levels"
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

      <div class="flex justify-start items-start px-2">
        <div class="py-2 flex-none basis-1/3">
          Questions:
        </div>
        <div class="py-2 text-xs flex items-center flex-wrap basis-2/3">
          <va-chip
              v-for="(question, index) in interviewTemplate.questions"
              :key="index"
              color="#d1d5db"
              size="small"
              square
              outline
              class="mr-2 my-1 cursor-pointer flex-none"
              @click="$emit('display-question', question)"
          >
            {{ question.name }}
          </va-chip>
        </div>
      </div>
    </div>
  </va-collapse>
</template>

<script lang="ts">
import { ref } from 'vue'
import InterviewTemplate from '@/api/InterviewTemplate/InterviewTemplate'

export default {
  name: 'CfInterviewTemplateListItem',
  props: {
    interviewTemplate: {
      type: InterviewTemplate,
      required: true,
    },
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
    const value = ref(false)
    return {
      value,
    }
  },

}
</script>

<style lang="scss">

</style>
