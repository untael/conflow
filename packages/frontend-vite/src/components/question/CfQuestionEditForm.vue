<template>
  <cf-container class="cf-question-create-form">
    <template #title>
      {{ formLabel }}
    </template>
    <template #default>
      <va-form ref="questionCreateForm">
        <div class="py-2">
          Name:
          <va-input
              v-model="question.name"
              :rules="[validationRules]"
          />
        </div>

        <div class="py-2">
          Description:
          <va-input
              v-model="question.description"
              type="textarea"
              autosize
              :rules="[validationRules]"
          />
        </div>

        <div class="py-2">
          <div v-if="isCodemirrorLoading">
            <cf-spinner
                class="mx-auto"
                :animation-duration="1200"
                :size="300"
                color="rgb(44, 130, 224)"
            />
          </div>
          <cf-code-block label="Question code" :id="question.id" v-model="question.code" @loaded="isCodemirrorLoading=$event" :showCopyButton="false"/>
        </div>

        <div class="py-2">
          <va-checkbox @update:modelValue="handleAddAnswer" :modelValue="showAddAnswer" :label="answerCheckboxLabel"/>
        </div>

        <div class="py-2" v-if="showAddAnswer || question.answer">
          <div v-if="isCodemirrorLoading">
            <cf-spinner
                class="mx-auto"
                :animation-duration="1200"
                :size="300"
                color="rgb(44, 130, 224)"
            />
          </div>
          <cf-code-block label="Answer code" :id="`${question.id}-answer`" v-model="question.answer" @loaded="isCodemirrorLoading=$event" :showCopyButton="false"/>
        </div>

        <div class="py-2">
          Question type:

          <va-select
              :options="types"
              v-model="question.type"
              :rules="[typeSelectRules]"
          />
        </div>

        <div class="py-2">
          Tags:
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
        </div>
        <div class="pt-4 d-flex justify-end">
          <va-button color="secondary" @click="$router.back()">
            Cancel
          </va-button>
          <va-button color="primary" class="ml-2" :loading="isQuestionCreateInProgress"
                     @click="handleSaveQuestion(question)">
            Save
          </va-button>
        </div>
      </va-form>
    </template>
  </cf-container>
</template>

<script lang="ts">
import CfContainer from '@/components/layout/CfContainer.vue'
import Question from '@/api/Question/Question'
import { computed, inject, onMounted, Ref, ref } from 'vue'
import { useQuestion } from '@/composables/useQuestion'
import { useTag } from '@/composables/useTag'
import Tag from '@/api/Question/Tag'

import CfSpinner from '@/components/CfSpinner.vue'
import CfCodeBlock from '@/components/CfCodeBlock.vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'CfAddQuestionEditForm',
  components: { CfCodeBlock, CfSpinner, CfContainer },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const showAddAnswer = ref(false)
    const isCodemirrorLoading = ref(true)
    const questionCreateForm = ref(null)
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
    onMounted(async () => {
      const questionId = route.params.id as string
      if (questionId) {
        try {
          question.value = await getQuestion(questionId)
        } catch {
          await router.push({name: 'Not found'})
        }
        showAddAnswer.value = true
      }
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
          await updateQuestion(data)
        }
      } catch (error) {
      } finally {
        isQuestionCreateInProgress.value = false
      }
      // }
    }

    return {
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
.cf-question-create-form {
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
