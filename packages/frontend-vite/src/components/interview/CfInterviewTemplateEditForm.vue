<template>
  <cf-container class="cf-interview-template-edit-form">
    <template #title>
      Interview template edit form
    </template>

    <template #default>
      <div class="py-2">
        Interview name:
        <va-input v-model="interview.name"/>
      </div>

      <div>
        <div>
          Question tags:
          <va-select
              :options="tags"
              v-model="tagsToFilter"
              track-by="id"
              text-by="name"
              placeholder="Filter by tags"
              multiple
              searchable
          />
        </div>
        <div class="" v-for="(question, index) in questions" :key="`${index}-${question.id}`">
          <div>
            <cf-question-item
                can-be-added
                :question="question"
                class="py-2 grow"
            />
          </div>
        </div>
      </div>

      <div class="pt-4 d-flex justify-end">
        <va-button color="secondary" @click="$router.back()">
          Cancel
        </va-button>
        <va-button color="primary" class="ml-2">
          Save
        </va-button>
      </div>
    </template>
  </cf-container>
</template>

<script lang="ts">
import CfContainer from '../layout/CfContainer.vue'
import Interview from '@/api/Event/Interview/Interview'
import { onMounted, Ref, ref, watch } from 'vue'
import { useTag } from '@/composables/useTag'
import Tag from '@/api/Question/Tag'
import CfQuestionItem from '@/components/question/CfQuestionItem.vue'
import Question from '@/api/Question/Question'
import { useQuestion } from '@/composables/useQuestion'

export default {
  name: 'CfInterviewTemplateEditForm',
  components: { CfQuestionItem, CfContainer },
  setup () {
    const tags: Ref<Tag[]> = ref([])
    const tagsToFilter: Ref<Tag[]> = ref([])
    const questions: Ref<Question[]> = ref([])
    const { getTags } = useTag()
    const { getQuestions } = useQuestion()
    const interview = ref(new Interview())
    const showAddQuestionModal = ref(false)
    onMounted(async () => {
      tags.value = await getTags()
      questions.value = await getQuestions()
    })
    watch(tagsToFilter, async (tags) => {
      const filters = {
        fieldName: 'tags.name',
        tags: tags.map(tag => tag.name),
      }
      questions.value = await getQuestions(filters)
    })
    return {
      interview,
      tags,
      tagsToFilter,
      showAddQuestionModal,
      questions,
    }
  },
}
</script>

<style lang="scss">
.cf-interview-template-edit-form {
  --va-button-border-radius: 0.5rem;
  //.va-badge__text-wrapper {
  //  left: 95% !important;
  //  top: 2.5% !important;
  //}
}
</style>
