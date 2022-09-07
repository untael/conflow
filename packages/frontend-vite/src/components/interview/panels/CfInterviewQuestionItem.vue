<template>
  <va-collapse
      class="cf-interview-question-item shadow-none"
      v-model="value"
      color-all
  >
    <template #header>
      <div class="va-collapse__header pl-0">
        <va-icon class="va-collapse__header__icon" color="black" :name="questionIcon"></va-icon>
        <div class="va-collapse__header__text">{{ question.data.name }}</div>
        <va-button v-if="editable" size="small" class="mx-1" flat icon="edit" @click.stop="$emit('edit')"/>
        <va-button v-if="addable" size="small" class="mx-1" flat icon="add" @click.stop="$emit('add')"/>
        <va-button v-if="canBeRemoved" size="small" class="mx-1" flat icon="remove" @click.stop="$emit('remove')"/>
        <va-icon class="va-collapse__header__icon" color="black" :name="value ? 'expand_less' : 'expand_more'"/>
      </div>
    </template>
    <div class="pt-2 text-sm bg-gray-50">
      <div class="px-2 py-2">
        {{ question.data.description }}
      </div>

      <div class="px-2 py-2">
        <cf-code-block :read-only="true" :id="question.data.id" autoheight showCopyButton v-model="question.data.code"/>
      </div>

      <div class="px-2 py-2" v-if="question.data.answer">
        <va-checkbox label="Show answer" v-model="showAnswer"/>
      </div>

      <div class="px-2 py-2" v-if="showAnswer">
        <cf-code-block :read-only="true" :id="`${question.data.id}-answer`" autoheight showCopyButton v-model="question.data.answer"/>
      </div>

      <div>
        <div class="flex justify-between px-2 bg-gray-100">
          <div class="py-2 text-xs flex items-center flex-none">
            <va-chip
                v-for="(tag, index) in question.data.tags"
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
        </div>
<!--        <div v-if="canBeStarted" class="py-2 flex items-center">-->
<!--          <div v-if="!question.is_completed" class="flex px-2">-->
<!--            <va-button-->
<!--                v-if="!question.is_in_progress"-->
<!--                @click="startQuestion"-->
<!--                color="#86a17d"-->
<!--                size="small"-->
<!--                class="flex-none"-->
<!--                :rounded="false"-->
<!--                outline-->
<!--                icon="play_arrow"-->
<!--            />-->

<!--            <va-button-->
<!--                v-if="question.is_in_progress"-->
<!--                @click="endQuestion"-->
<!--                color="#c31020"-->
<!--                size="small"-->
<!--                class="flex-none"-->
<!--                :rounded="false"-->
<!--                outline-->
<!--                icon="stop"-->
<!--            />-->
<!--            <span class="ml-2">{{ formattedTimer }}</span>-->
<!--          </div>-->
<!--          <div v-else class="flex flex-col flex-none items-start justify-between text-xs">-->
<!--            <div class="d-flex justify-between items-center mx-2">-->
<!--              <div class="flex-none text-center test mr-2">-->
<!--                Time spent: {{ question.formatted_time_spent }}-->
<!--              </div>-->
<!--              <div class="flex items-center flex-none test">-->
<!--                <va-rating color="#2C82E0" v-model="question.mark" size="small"/>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="ma-2">-->
<!--              <span v-for="(comment,index) in shortComments"-->
<!--                    :key="index" class="mr-1">-->
<!--              <va-chip-->
<!--                  :outline="!comment.chosen"-->
<!--                  @click="toggleShort(index)"-->
<!--              >-->
<!--                {{ comment.name }}-->
<!--              </va-chip></span>-->
<!--            </div>-->
<!--            <div class="w-full ma-2">-->
<!--              <va-input-->
<!--                  class="mb-4 w-full"-->
<!--                  type="textarea"-->
<!--                  placeholder="Comment"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </va-collapse>
</template>

<script lang="ts">
import { onMounted, ref, reactive } from 'vue'
import CfCodeBlock from '@/components/CfCodeBlock.vue'
import InterviewQuestion from '@/api/InterviewQuestion/InterviewQuestion'

export default {
  name: 'CfInterviewQuestionItem',
  components: { CfCodeBlock },
  props: {
    question: {
      type: Object,
      required: true,
      validator: (value: any) => {
        return value instanceof InterviewQuestion
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
  setup (props: any) {
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
    questionIcon.value = props.question.data.type === 'Verbal' ? 'hearing' : 'keyboard'
    const timer = ref(0)
    const formattedTimer = ref('')
    const timerId = ref(0)
    const startTimer = () => {
      timerId.value = setInterval(() => {
        timer.value++
        const minutes = Math.floor(timer.value / 60)
        const seconds = Math.floor(timer.value % 60)
        formattedTimer.value = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
      }, 1000)
    }
    const startQuestion = () => {
      timer.value = 0
      formattedTimer.value = '0:00'
      props.question.start()
      startTimer()
    }
    const endQuestion = () => {
      clearInterval(timerId.value)
      props.question.end()
    }
    return {
      questionIcon,
      showAnswer,
      shortComments,
      toggleShort,
      outlineChip,
      startQuestion,
      timer,
      timerId,
      endQuestion,
      formattedTimer,
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

.cf-interview-question-item {
  --va-collapse-header-content-icon-margin-right: 1rem;
  --va-collapse-header-content-icon-margin-left: 1rem;
  --va-collapse-header-content-border-radius: var(--cf-border-radius);
  --va-collapse-header-content-box-shadow: none;

  --va-button-outline-border: 1px;

  .va-collapse__header {
    position: relative;
  }

  .va-collapse__header {
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
