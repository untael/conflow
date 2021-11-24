<template>

  <va-collapse
      class="cf-answer-form shadow-none"
      v-model="openCollapse"
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
          <div class="test">
            <div>{{ 'Time spent: ' + question.time_spent_description }}</div>
            <div class=" flex items-center flex-none">
              <div>
                Mark:
              </div>
              <va-rating color="#86a17d" v-model="question.mark" size="small" disabled/>
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
    <div class="flex  items-start justify-between text-sm bg-gray-50">
      <div class="px-2 py-2 flex-basis-50">
        {{ question.description }}
      </div>
      <div class="px-2 py-2 flex-basis-50">
        {{ question.answer }}
      </div>

    </div>
  </va-collapse>


</template>

<script lang="ts">
import Question from '@/api/Question/Question'
import CfContainer from "@/components/layout/CfContainer.vue";

export default {

  name: 'CfAnswerForm',
  components: {CfContainer},
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

      openCollapse: false,
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

.cf-answer-form {
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

}

.flex-basis-50 {
  flex-basis: 50% !important;
}

</style>
