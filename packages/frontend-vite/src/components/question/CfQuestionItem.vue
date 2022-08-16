<template>
  <va-collapse
      class="cf-question-item shadow-none"
      v-model="value"
      color-all
  >
    <template #header>
      <div class="va-collapse__header__content pl-0" :class="collapseHeaderClass">
        <va-icon class="va-collapse__header__icon" color="black" :name="questionIcon"></va-icon>
        <div class="va-collapse__header__text">{{ question.name }}</div>
        <va-button v-if="editable" size="small" class="mx-1" flat icon="edit" @click.stop="$emit('edit')"/>
        <va-button v-if="addable" size="small" class="mx-1" flat icon="add" @click.stop="$emit('add')"/>
        <va-button v-if="canBeRemoved" size="small" class="mx-1" flat icon="remove" @click.stop="$emit('remove')"/>
        <va-icon class="va-collapse__header__icon" color="black" :name="value ? 'expand_less' : 'expand_more'"/>
      </div>
    </template>
    <div class="pt-2 text-sm bg-gray-50">
      <div class="px-2 py-2">
        {{ question.description }}
      </div>

      <div class="px-2 py-2">
        <cf-code-block :read-only="true" :id="question.id" autoheight showCopyButton v-model="question.code"/>
      </div>

      <div class="px-2 py-2" v-if="question.answer">
        <va-checkbox label="Show answer" v-model="showAnswer"/>
      </div>

      <div class="px-2 py-2" v-if="showAnswer">
        <cf-code-block :read-only="true" :id="`${question.id}-answer`" autoheight showCopyButton v-model="question.answer"/>
      </div>

      <div>
        <div class="flex justify-between px-2 bg-gray-100">
          <div class="py-2 text-xs flex items-center flex-none">
            <va-chip
                v-for="(tag, index) in question.tags"
                :key="index"
                color="#d1d5db"
                size="small"
                square
                outline
                class="mr-2"
            >
              {{ tag.name }}
            </va-chip>
          </div>
          <div class="py-2 flex items-center flex-none" v-if="question.status === QuestionStatus.Pending && editable">
            <va-button class="cf-question-item__status-button--decline" rounded icon="close" color="danger" size="1.5rem" @click="onDecline"/>
            <va-button class="cf-question-item__status-button--approve" rounded icon="check" color="success" size="1.5rem" @click="onApprove"/>
          </div>
        </div>
        <div v-if="canBeStarted" class="py-2 flex items-center">
          <div v-if="!question.is_completed" class="flex px-2">
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
          <div v-else class="flex flex-col flex-none items-start justify-between text-xs">
            <div class="d-flex justify-between items-center">
              <div class="flex-none text-center test">
                Time spent: {{ question.formatted_time_spent }}
              </div>
              <div class="flex items-center flex-none test">
                <va-rating color="#86a17d" v-model="question.mark" size="small"/>
              </div>
            </div>
            <div>
              <va-chip
                  :outline="!comment.chosen"
                  v-for="(comment,index) in shortComments"
                  :key="index" @click="toggleShort(index)"
              >
                {{ comment.name }}
              </va-chip>
            </div>
            <va-input
                class="mb-4"
                type="textarea"
                placeholder="Comment"
            />
          </div>
        </div>
      </div>
    </div>
  </va-collapse>
</template>

<script lang="ts">
import Question, { QuestionStatus } from '@/api/Question/Question'
import { computed, onMounted, ref } from 'vue'
import CfCodeBlock from '@/components/CfCodeBlock.vue'

export default {
  name: 'CfQuestionItem',
  components: { CfCodeBlock },
  props: {
    question: {
      type: Object,
      required: true,
      validator: (value: any) => {
        return value instanceof Question
      },
    },
    canBeStarted: {
      type: Boolean,
      default: false,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    addable: {
      type: Boolean,
      default: false,
    },
    canBeRemoved: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      value: false,
    }
  },
  setup (props: any, { emit: any }) {
    const value = ref(false);
    const shortComments = ref([{ name: 'fast', chosen: false }, {
      name: 'clever',
      chosen: false,
    },
      { name: 'best practice', chosen: false },
      { name: 'slow', chosen: false },
      { name: 'mistakes', chosen: false }, { name: 'hints', chosen: false }])
    const showAnswer = ref(false)
    const questionIcon = ref('')
    let outlineChip = ref(true)
    const toggleShort = (index: number) => {
      shortComments.value[index].chosen = !shortComments.value[index].chosen
    }
    questionIcon.value = props.question.type === 'Verbal' ? 'hearing' : 'keyboard'

    const collapseHeaderClass = computed(() => {
      return {
        'cf-question-item--pending': props.question.status === QuestionStatus.Pending,
        'cf-question-item--approved': props.question.status === QuestionStatus.Approved,
        'cf-question-item--declined': props.question.status === QuestionStatus.Declined,
      }
    })

    const onDecline = () => {
      emit('decline');
    }
    const onApprove = () => {
      emit('approve');
    }
    return {
      questionIcon,
      showAnswer,
      shortComments,
      toggleShort,
      outlineChip,
      value,
      collapseHeaderClass,
      QuestionStatus,
      onDecline,
      onApprove
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

.cf-question-item {
  --va-collapse-header-content-icon-margin-right: 1rem;
  --va-collapse-header-content-icon-margin-left: 1rem;
  --va-collapse-header-content-border-radius: var(--cf-border-radius);
  --va-collapse-header-content-box-shadow: none;
  --va-button-outline-border: 1px;

  &__status-button {
    &--approve {
      border-top-right-radius: var(--va-button-square-border-radius);
      border-bottom-right-radius: var(--va-button-square-border-radius);
    }
    &--decline {
      border-top-left-radius: var(--va-button-square-border-radius);
      border-bottom-left-radius: var(--va-button-square-border-radius);
    }
  }
  &--pending {
    border-left: 0.25rem solid var(--va-info);
  }

  &--approved {
    border-left: 0.25rem solid var(--va-success);
  }

  &--declined {
    border-left: 0.25rem solid var(--va-danger);
  }

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
