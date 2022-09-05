<template>
  <cf-container :loading="isLoading" class="cf-question-edit-panel">
    <template #title>
      {{ formLabel }}
    </template>
    <template #default>
      <va-form ref="questionCreateForm">
        <cf-container-row title="Name:">

          <va-input
              class="w-1/2"
              v-model="question.name"
              :rules="[validationRules]"
          />
        </cf-container-row>

        <cf-container-row title="Description:">

          <va-input
              class="w-full"
              v-model="question.description"
              type="textarea"
              autosize
              :rules="[validationRules]"
          />
        </cf-container-row>

        <cf-container-row>
          <div v-if="isCodemirrorLoading">
            <cf-spinner
                class="mx-auto"
                :animation-duration="1200"
                :size="300"
                color="rgb(44, 130, 224)"
            />
          </div>
          <cf-code-block
              label="Question code"
              :id="id ? `${question.id}-edit` : `${question.id}-create`"
              v-model="question.code"
              @loaded="setCodemirrorLoading"
              :showCopyButton="false"
          />
        </cf-container-row>

        <cf-container-row>
          <va-checkbox @update:modelValue="handleAddAnswer" :modelValue="showAddAnswer"
                       :label="answerCheckboxLabel"/>
        </cf-container-row>

        <cf-container-row v-if="showAddAnswer || question.answer">
          <div v-if="isCodemirrorLoading">
            <cf-spinner
                class="mx-auto"
                :animation-duration="1200"
                :size="300"
                color="rgb(44, 130, 224)"
            />
          </div>
          <cf-code-block label="Answer code" :id="id ? `${question.id}-answer-edit` : `${question.id}-answer`"
                         v-model="question.answer" @loaded="setCodemirrorLoading" :showCopyButton="false"/>
        </cf-container-row>

        <cf-container-row title="Question type:">


          <va-select
              :options="types"
              v-model="question.type"
              :rules="[typeSelectRules]"
          />
        </cf-container-row>

        <cf-container-row title="Tags:">

          <va-select
              :options="tags"
              v-model="question.tags"
              track-by="id"
              text-by="name"
              multiple
              searchable
              allow-create
              :rules="[tagsSelectRules]"
          />
        </cf-container-row>
        <cf-control-buttons
            v-if="editable"
            @cancel="$router.back()" @save="handleSaveQuestion(question)"
            :loading="isQuestionCreateInProgress"
        />
      </va-form>
    </template>
  </cf-container>
</template>

<script lang="ts">
import CfContainer from '@/components/layout/CfContainer.vue'
import Question, { QuestionStatus } from '@/api/Question/Question'
import { computed, onMounted, Ref, ref, watch } from 'vue'
import { useQuestion } from '@/composables/useQuestion'
import { useTag } from '@/composables/useTag'
import Tag from '@/api/Question/Tag'

import CfSpinner from '@/components/CfSpinner.vue'
import CfCodeBlock from '@/components/CfCodeBlock.vue'
import { useRoute, useRouter } from 'vue-router'
import CfControlButtons from '@/components/layout/CfControlButtons.vue'
import CfContainerRow from '@/components/layout/CfContainerRow.vue'
import { QuestionEvents } from '@/api/Question/events'
import { useEmitter } from '@/composables/useEmitter'

export default {
  name: 'CfQuestionEditPanel',
  components: {
    CfContainerRow,
    CfCodeBlock,
    CfSpinner,
    CfContainer,
    CfControlButtons,
  },
  props: {
    id: {
      type: String,
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  setup (props: any) {
    const { $emitter } = useEmitter()
    const route = useRoute()
    const router = useRouter()
    const showAddAnswer = ref(false)
    const isCodemirrorLoading = ref(true)
    const questionCreateForm = ref(null)
    const isLoading = ref(false)
    const validationRules = (value: string) => value && value.length || 'Field is required'
    const tagsSelectRules = (v: any[]) => v && v.length || 'Field is required'
    const typeSelectRules = (v: string) => v && v.length || 'Field is required'
    //ToDo: issue to vuestic ui about exposing toast type/interface
    const isQuestionCreateInProgress = ref(false)
    const question: Ref<Question> = ref(new Question({}))
    const tags: Ref<Tag[]> = ref([])
    const { createQuestion, updateQuestion, getQuestion } = useQuestion()
    const { getTags } = useTag()
    const formLabel = computed(() => {
      return question.value.id ? 'Edit question form' : 'Add question form'
    })
    const fetchQuestion = async () => {
      showAddAnswer.value = false
      const questionId = route.params.id as string
      if (questionId || props.id) {
        try {
          isCodemirrorLoading.value = true
          isLoading.value = true
          question.value = await getQuestion(questionId || props.id)
          isLoading.value = false
        } catch {
          await router.push({ name: 'Not found' })
        }
        if (question.value.answer) {
          showAddAnswer.value = true
        }
      }
    }
    onMounted(async () => {
      await fetchQuestion()
      tags.value = await getTags()
    })

    const handleAddAnswer = (value: boolean) => {
      if (!value) {
        question.value.answer = ''
      }
      showAddAnswer.value = value
    }

    const answerCheckboxLabel = computed(() => {
      return showAddAnswer.value ? 'Remove answer' : 'Add answer'
    })

    const handleSaveQuestion = async (data: Question) => {
      //@ts-ignore
      // if ((questionCreateForm.value as any).validate()) {
      try {
        isQuestionCreateInProgress.value = true
        if (!data.id) {
          await createQuestion(data)
          question.value = new Question({})
        } else {
          if (data.decision_maker) {
            data.status = QuestionStatus.Pending
            data.decision_maker = null
          }
          await updateQuestion(data)
        }
        $emitter.emit(QuestionEvents.Update, question.value)
      } catch (error) {
      } finally {
        isQuestionCreateInProgress.value = false
      }
    }

    watch(props, async () => {
      await fetchQuestion()
    })

    const setCodemirrorLoading = (value: boolean) => {
      isCodemirrorLoading.value = value
    }
    return {
      setCodemirrorLoading,
      validationRules,
      tagsSelectRules,
      typeSelectRules,
      questionCreateForm,
      isQuestionCreateInProgress,
      tags,
      question,
      handleSaveQuestion,
      isCodemirrorLoading,
      formLabel,
      showAddAnswer,
      handleAddAnswer,
      answerCheckboxLabel,
      isLoading,
    }
  },
  data () {
    return {
      types: ['Verbal', 'Practice'],
    }
  },
}
</script>

<style lang="scss">
.cf-question-edit-panel {
  .va-input-wrapper__message-list-wrapper {
    padding: 0;
  }

  textarea {
    width: 0px;
    height: 0px;
  }

  &--codemirror-hidden {
    visibility: hidden;
  }

  .CodeMirror {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    background-color: var(--va-input-color);
  }
}
</style>
