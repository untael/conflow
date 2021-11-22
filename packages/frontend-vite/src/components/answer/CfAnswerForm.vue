<template>
  <va-collapse
      class="cf-answer-form"
      v-model="value1"
      color-all
  >
    <template v-slot:header>
      <div class="va-collapse__header__content">
        <!--v-if-->
        <div
            class="va-collapse__header__text d-flex justify-between items-center"
        >
          <div class="d-flex justify-start items-center">
            <va-icon class="material-icons">{{ question.type }}</va-icon>
            <div class="px-2 py-2">{{ question.name }}</div>
          </div>
          <div>
            <div>{{ 'Time spent: ' + question.time_spent_description }}</div>
            <div class=" flex items-center flex-none">
              <div>
                Mark:
              </div>
              <va-rating v-model="question.mark" size="small"/>
            </div>
          </div>
        </div>
        <i
            class="
            va-collapse__header__icon
            va-icon
            material-icons
            va-collapse__header__icon
          "
            aria-hidden="true"
            notranslate=""
            style="color: rgb(0, 0, 0); font-size: 24px"
        >expand_more</i
        >
      </div>
    </template>
    <div class="flex  items-start justify-between text-s">
      <div class="px-2 py-2">
        {{ question.description }}
      </div>
      <div class="px-2 py-2">
        {{
          question.answer
        }}
      </div>

    </div>
  </va-collapse>

</template>

<script lang="ts">
import Question from '@/api/Question/Question'
import {computed} from 'vue'

export default {

  name: 'CfAnswerForm',
  props: {
    question: {
      type: Object,
      required: true,
      validator: (value: any) => {
        return value instanceof Question
      },
    },
  },
  data() {
    return {
      value: false,
      value1: false,
    }
  },

}
</script>
