<template>
  <cf-container>
    <template #title>
      Add question form
    </template>
    <template #default>
      <div class="py-2">
        Name:
        <va-input
            v-model="question.name"
        />
      </div>

      <div class="py-2">
        Description:
        <va-input
            v-model="question.description"
            type="textarea"
        />
      </div>

      <div class="py-2">
        Code:
        <va-input
            v-model="question.code"
            type="textarea"
        />
      </div>

      <div class="py-2">
        Question type:

        <va-select
            :options="types"
            v-model="question.type"
            searchable
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
        />
      </div>
      <div class="pt-4 d-flex justify-end">
        <va-button @click="createQuestion(question)">
          Save
        </va-button>
      </div>
    </template>
  </cf-container>
</template>

<script lang="ts">
import CfContainer from '@/components/layout/CfContainer.vue'
import Question from '@/api/Question/Question'
import { onMounted, Ref, ref } from 'vue'
import { useQuestion } from '@/composables/useQuestion'
import { useTag } from '@/composables/useTag'
import Tag from '@/api/Question/Tag'

export default {
  name: 'CfAddQuestionCreateForm',
  components: { CfContainer },
  setup () {
    const question = ref(new Question({}))
    const tags: Ref<Tag[]> = ref([])
    const { createQuestion } = useQuestion()
    const { getTags } = useTag()

    onMounted(async () => {
      tags.value = await getTags()
    })

    return {
      question,
      createQuestion,
      tags,
    }
  },
  data () {
    return {
      types: ['hearing', 'edit'],
    }
  },
}
</script>
