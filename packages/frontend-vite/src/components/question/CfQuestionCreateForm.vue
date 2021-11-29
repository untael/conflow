<template>
  <cf-container class="cf-question-create-form">
    <template #title>
      Add question form
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
          <div :class="{'cf-question-create-form--codemirror-hidden': isCodemirrorLoading}">
            Code:
            <textarea v-model="question.code" id="editor"/>
          </div>
        </div>

        <div class="py-2">
          Question type:

          <va-select
              :options="types"
              v-model="question.type"
              searchable
              :rules="[validationRules]"
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
              :rules="[validationRules]"
          />
        </div>
        <div class="pt-4 d-flex justify-end">
          <va-button color="secondary" @click="$router.back()">
            Cancel
          </va-button>
          <va-button class="ml-2" :loading="isQuestionCreateInProgress" @click="handleCreateQuestion(question)">
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
import { inject, onMounted, Ref, ref } from 'vue'
import { useQuestion } from '@/composables/useQuestion'
import { useTag } from '@/composables/useTag'
import Tag from '@/api/Question/Tag'
import * as Codemirror from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror-editor-vue3/dist/style.css'
import 'codemirror/lib/codemirror.css'
import CfSpinner from '@/components/CfSpinner.vue'

export default {
  name: 'CfAddQuestionCreateForm',
  components: { CfSpinner, CfContainer },
  setup () {
    const questionCreateForm = ref(null)
    const validationRules = (value: string) => (value && value.length > 0) || 'Field is required'
    //ToDo: issue to vuestic ui about exposing toast type/interface
    const $vaToast: any = inject('$vaToast')
    const isCodemirrorLoading = ref(true)
    const isQuestionCreateInProgress = ref(false)
    const question = ref(new Question({}))
    const tags: Ref<Tag[]> = ref([])
    const { createQuestion } = useQuestion()
    const { getTags } = useTag()

    onMounted(async () => {
      tags.value = await getTags()

      Codemirror.fromTextArea(document.getElementById('editor') as HTMLTextAreaElement, {
        mode: 'text/javascript', // Language mode
        lineNumbers: true, // Show line number
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
      })
      isCodemirrorLoading.value = false
    })

    const handleCreateQuestion = async (data: Question) => {
      if ((questionCreateForm.value as any).validate()) {
        try {
          isQuestionCreateInProgress.value = true
          await createQuestion(data)
          $vaToast.init({
            message: 'Question successfully created',
            color: 'success',
          })
        } catch (error) {
          $vaToast.init({
            message: 'Question was not created',
            color: 'danger',
          })
        } finally {
          isQuestionCreateInProgress.value = false
        }
      }
    }

    return {
      validationRules,
      questionCreateForm,
      isQuestionCreateInProgress,
      tags,
      question,
      handleCreateQuestion,
      isCodemirrorLoading,
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
