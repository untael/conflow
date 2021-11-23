<template>
  <va-collapse
      class="cf-question-form shadow-none"
      v-model="value"
      color-all
      :icon="question.type"
      :header="question.name"
  >
    <div class="pt-2 text-sm bg-gray-50">
      <div class="px-2 py-2">
        {{ question.description }}
      </div>

      <div class="px-2 py-2">
        <cf-prism-wrapper :code="question.code"/>
      </div>

      <div>
        <div class="flex justify-between px-2 bg-gray-100">
          <div class="py-2 text-xs flex items-center flex-none">
            <va-chip
                v-for="(tag, index) in question.tags"
                :key="index"
                color="rgba(209, 213, 219)"
                size="small"
                square
                outline
                class="mr-2"
            >
              {{ tag.name }}
            </va-chip>
          </div>
          <div class="py-2 flex items-center">
            <div v-if="!question.is_completed" class="flex justify-end">
              <va-button
                  v-if="!question.is_in_progress"
                  @click="question.start()"
                  color="#86a17d"
                  size="small"
                  class="flex-none"
                  :rounded="false"
                  outline
                  icon="play_arrow"
              />
              <va-button
                  v-if="question.is_in_progress"
                  @click="question.end()"
                  color="#c31020"
                  size="small"
                  class="flex-none"
                  :rounded="false"
                  outline
                  icon="stop"
              />
            </div>

            <div v-else class="flex flex-col flex-none ml-auto items-start justify-between text-xs">
              <div class="flex-none text-center test">
                Time spent: {{ question.formatted_time_spent }}
              </div>
              <div class="flex items-center flex-none test">
                <!--                <div>-->
                <!--                  Mark:-->
                <!--                </div>-->
                <va-rating color="#86a17d" v-model="question.mark" size="small"/>
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
import CfPrismWrapper from '@/components/CfPrismWrapper.vue'

export default {
  name: 'CfQuestionForm',
  components: {CfPrismWrapper},
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
    }
  },
}
</script>

<style lang="scss">
.test {
  font-size: .625rem;
  font-weight: 700;
  letter-spacing: .6px;
  line-height: 1.2;
  text-transform: uppercase;
}

.cf-question-form {
  --va-collapse-header-content-icon-margin-right: 1rem;
  --va-collapse-header-content-icon-margin-left: 1rem;
  --va-collapse-header-content-border-radius: var(--cf-border-radius);
  --va-collapse-header-content-box-shadow: none;

  --va-button-outline-border: 1px;

  .va-collapse__header {
    position: relative;
  }

  .va-collapse__header__content {
    @apply bg-gray-200
  }

  .va-collapse__body {
    border-radius: 0 0 var(--cf-border-radius) var(--cf-border-radius);
    border: 0;
    margin: -4px 0 0 0;
  }

  .va-chip {
    --va-chip-square-border-radius: 0;
    --va-chip-border: 1px solid;
    --va-chip-square-border-radius: var(--cf-border-radius);
    color: var(--va-card-color) !important;
    @apply bg-gray-100
  }
}

hr {
  margin: 10px 0px;
}
</style>
