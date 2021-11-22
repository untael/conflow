<template>
  <cf-answer-form
      :question="question"
  />
</template>
<script>
import CfAnswerForm from '../components/answer/CfAnswerForm.vue';
import Question from "@/api/Question/Question";

export default {
  name: 'CfInterviewResultsPage',
  components: {CfAnswerForm},
  data() {
    let question = new Question({
      id: 1,
      name: 'Lorem ipsum dolor, sit amet consectetur...',
      description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, consectetur! Asperiores excepturi, fugiat sed tempora impedit facere consequuntur labore eligendi',
      answer: '122423456 78i9osfgvsv svsdvsvsdvsd vsdvsdvsd vsdvsdv sdvsdvsdvs dvsdv  sdvsdvs dvsdv sdvsdvsdvsdvs dvsd',
      mark: 3,
      rating: 4,
      code: null,
      date_start: 0,
      date_end: 0,
      time_spent: 0,
      time_spent_description: '1 min',
      type: 1 % 3 === 0 ? 'hearing' : 'edit',
      tags: [
        'fundamentals',
        'advanced',
        'arrays',
        'fetch',
        'objects'
      ],
    })
    return {
      question
    }
  }
}
</script>