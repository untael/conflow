<template>
  <cf-container>
    <template #title>
      Add question form
    </template>
    <template #default>
      <!--  name-->
      <div class="py-2">
        Name:
        <va-input
            v-model="question.name"
        />
      </div>
      <!--  description-->
      <div class="py-2">
        Description:
        <va-input
            v-model="question.description"
            type="textarea"
        />
      </div>
      <!--  code-->
      <div class="py-2">
        Code:
        <va-input
            v-model="question.code"
            type="textarea"
        />
      </div>
      <!--  type-->
      <div class="py-2">
        Question type:

        <va-select
            :options="types"
            v-model="question.type"
            searchable
        />

      </div>
      <!--  tags-->
      <div class="py-2">
        Tags:
        <va-select
            :options="tags"
            v-model="question.tags"
            multiple
            text-by="name"
            searchable
        />
      </div>
      <div class="pt-4 d-flex justify-end">
        <va-button @click="createQuestion(question)">Save</va-button>
      </div>
    </template>
  </cf-container>
</template>

<script lang="ts">
import CfContainer from "@/components/layout/CfContainer.vue";
import Question from "@/api/Question/Question";
import {onMounted, Ref, ref} from "vue";
import {useQuestion} from "@/composables/useQuestion";
import Tag from "@/api/Question/Tag";
import {useTag} from "@/composables/useTag";

export default {
  name: 'CfAddQuestionForm',
  components: {CfContainer},
  setup() {
    const question = ref(new Question({name: '', description: '', code: '', type: '', tags: []}))
    const tags = ref([])
    const {postQuestion} = useQuestion()
    const {getTags} = useTag()
    const createQuestion = async (question: Question) => {
      console.log('question', question)
      await postQuestion(question)
    }
    // const tags = ref([
    //   new Tag({name: 'js', id: '1'}),
    //   new Tag({name: 'fundamentals', id: '2'}),
    //   new Tag({name: 'arrays', id: '3'}),
    // ])
    const test = ref([])

    onMounted(async () => {
      tags.value = await getTags()
      console.log(tags.value)
    })

    return {question, createQuestion, tags, test}
  },
  data() {
    return {
      // //     questionName: '',
      // //     questionDescription: '',
      // //     questionCode: '',
      // //     questionType: '',
      // //     questionTags: [],
      types: ['hearing', 'edit'],
      // tags: ['js', 'fundamentals', 'arrays']
    }
  }
}
</script>