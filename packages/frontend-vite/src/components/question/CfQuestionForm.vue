<template>
  <va-collapse
      class="cf-question-form"
      v-model="value"
      color-all
      :icon="question.type"
      :header="question.name"
  >
    <div class="pt-2 text-sm bg-gray-100">
      <div class="px-2 py-2">
        {{ question.description }}
      </div>

      <div>
        <div class="flex justify-between px-2 bg-gray-200">
          <div class="py-2 text-xs">
            <va-chip
                v-for="(tag, index) in question.tags"
                :key="index"
                color="#000000"
                size="small"
                square
                outline
                class="mr-2 mt-1"
            >
              {{ tag }}
            </va-chip>
          </div>
          <div class="py-2 flex items-center">
            <div v-if="!question.is_completed" class="flex justify-end">
              <va-button
                  v-if="!question.is_in_progress"
                  @click="question.start()"
                  color="success"
                  size="small"
                  class="mr-4 flex-none"
              >
                Start
              </va-button>
              <va-button
                  v-if="question.is_in_progress"
                  @click="question.end()"
                  color="danger"
                  size="small"
                  class="mr-4 flex-none"
              >End
              </va-button
              >
            </div>

            <div v-else class="flex flex-col items-end justify-between text-xs">
              <div class="flex-none text-center">
                {{
                  time_spent_description
                }}
              </div>
              <div class="flex items-center flex-none">
                <div>
                  Mark:
                </div>
                <va-rating v-model="question.mark" size="small"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </va-collapse>
</template>

<script lang="ts">
import Question from '@/api/Question/Question'
import { computed } from 'vue'

export default {
  name: 'CfQuestionForm',
  props: {
    question: {
      type: Object,
      required: true,
      validator: (value: any) => {
        return value instanceof Question
      },
    },
  },
  data () {
    return {
      value: false,
    }
  },
  setup (props) {
    const time_spent_description = computed(() => {
      if (!props.question) {
        return ''
      }
      return ` Time spent: ${Math.round(props.question.time_spent / 60000)} min ${Math.round(
          (props.question.time_spent % 60000) / 1000,
      )} s`
    })
    return {
      time_spent_description
    }
  },
}
</script>

<style lang="scss">
.cf-question-form {
  --va-collapse-header-content-icon-margin-right: 1rem;
  --va-collapse-header-content-icon-margin-left: 1rem;

  .va-collapse__header {
    position: relative;
  }

  .va-collapse__header__content {
    @apply bg-gray-300
  }

  .va-collapse__body {
    border-radius: 0 0 var(--va-collapse-header-content-border-radius) var(--va-collapse-header-content-border-radius);
    border: 0;
    margin: -4px 0 0 0;
  }
}

hr {
  margin: 10px 0px;
}
</style>
