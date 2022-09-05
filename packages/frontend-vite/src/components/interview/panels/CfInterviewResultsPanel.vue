<template>
  <cf-container>
    <template #title>
      Interview result
    </template>
    <template #default>
      <!--      <div v-for="(question, i) in questions" :key="i">-->
      <!--        <cf-answer-form-->
      <!--            :question="question"-->
      <!--            class="py-2"-->
      <!--        />-->
      <!--      </div>-->
    </template>
  </cf-container>
</template>
<script lang="ts">
import CfAnswerForm from '../../answer/CfAnswerForm.vue'
import Question from '@/api/Question/Question'
import CfContainer from '@/components/layout/CfContainer.vue'

export default {
  name: 'CfInterviewResultsPanel',
  components: { CfAnswerForm, CfContainer },
  setup () {
    return {}
  },
  // data() {
  //   let questions = (new Array(5)).fill(new Question({
  //     id: 1,
  //     name: 'Lorem ipsum dolor, sit amet consectetur...',
  //     description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, consectetur! Asperiores excepturi, fugiat sed tempora impedit facere consequuntur labore eligendi',
  //     answer: '122423456 78i9osfgvsv svsdvsvsdvsd vsdvsdvsd vsdvsdv sdvsdvsdvs dvsdv  sdvsdvs dvsdv sdvsdvsdvsdvs dvsd',
  //     mark: 3,
  //     rating: 4,
  //     code: null,
  //     date_start: 0,
  //     date_end: 0,
  //     time_spent: 0,
  //     time_spent_description: '1 min',
  //     type: 1 % 3 === 0 ? 'hearing' : 'edit',
  //     tags: [
  //       'fundamentals',
  //       'advanced',
  //       'arrays',
  //       'fetch',
  //       'objects'
  //     ],
  //   }))
  //   return {
  //     questions
  //   }
  // }
}
</script>
