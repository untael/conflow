<template>
  <va-collapse
      class="cf-interview-list-item cf-question-item shadow-none"
      v-model="value"
      color-all
  >
    <template #header>
      <div class="va-collapse__header__content">
        <div class="va-collapse__header__text">{{ interview.name }}</div>
        <va-button  size="small" class="mx-1" flat icon="preview" @click.stop="$emit('preview')"/>
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
          {{ interview.name }}
        </div>
      </div>

      <div class="flex justify-start items-start px-2">
        <div class="py-2 flex-none basis-1/3">
          Date:
        </div>
        <div class="py-2 text-xs flex items-center flex-none basis-2/3">
          {{ interview.full_date }}
        </div>
      </div>

      <div class="flex justify-start items-start px-2">
        <div class="py-2 flex-none basis-1/3">
          Type:
        </div>
        <div class="py-2 text-xs flex items-center flex-none basis-2/3">
          <div class="flex-none" v-if="interview?.type?.icon">
            <va-icon class="mr-2" color="black" :name="interview?.type?.icon"></va-icon>
          </div>
          <div class="flex-none">{{ interview?.type?.name }}</div>
        </div>
      </div>

      <div class="flex justify-start items-start px-2">
        <div class="py-2 flex-none basis-1/3">
          Candidate:
        </div>
        <div class="py-2 text-xs flex items-center flex-none basis-2/3">
          <div class="flex-none">{{ interview.candidate }}</div>
        </div>
      </div>

      <div class="flex justify-start items-start px-2">
        <div class="py-2 flex-none basis-1/3">
          Candidate level:
        </div>
        <div class="py-2 text-xs flex items-center flex-none basis-2/3">
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

      <div class="flex justify-start items-start px-2">
        <div class="py-2 flex-none basis-1/3">
          Interviewers:
        </div>
        <div class="py-2 text-xs flex items-center flex-none basis-2/3">
          <va-chip
              v-for="(interviewer, index) in interview.interviewers"
              :key="index"
              color="#d1d5db"
              size="small"
              square
              outline
              class="mr-2 flex-none"
          >
            {{ interviewer.full_name }}
          </va-chip>
        </div>
      </div>


      <div class="flex justify-start items-start px-2">
        <div class="py-2 flex-none basis-1/3">
          Note:
        </div>
        <div class="py-2 text-xs flex items-center flex-none basis-2/3">
          {{ interview.note }}
        </div>
      </div>

      <div class="flex justify-start items-start px-2">
        <div class="py-2 flex-none basis-1/3">
          Questions:
        </div>
        <div class="py-2 text-xs flex items-center flex-wrap basis-2/3">
          <va-chip
              v-for="(question, index) in interview.questions"
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
import Interview from '@/api/Interview/Interview'
import { ref } from 'vue'

export default {
  name: 'CfInterviewListItem',
  props: {
    interview: {
      type: Interview,
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
      value
    }
  },

}
</script>

<style lang="scss">

</style>
