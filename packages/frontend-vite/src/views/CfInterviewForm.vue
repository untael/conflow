<template>
  <va-card>
    <va-card-title>
      Interview
    </va-card-title>

    <va-card-content
      class="d-flex flex-col"
      v-for="(question, questionIndex) in questions"
      :key="questionIndex"
    >
      <va-input v-model="question.question" label="Question" type="text" />
      <va-input
        v-model="question.answer"
        label="Answer"
        type="text"
        class="pt-3"
      />
      <va-rating v-model="question.answerRating" size="small" />
    </va-card-content>

    <va-button
      @click="addQuestion"
      gradient
      type="submit"
      icon="add"
      size="small"
      >Add question</va-button
    >

    <div class="d-flex justify--center">
      <va-button @click="saveInterview" gradient type="submit">Save</va-button>
      <va-button @click="endInterview" gradient type="submit"
        >End Interview</va-button
      >
    </div>
  </va-card>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "CfInterviewForm",
  setup() {
    const router = useRouter();
    const questions = ref([
      { question: "How are you?", answer: "Fine!", answerRating: "0" },
    ]);

    const saveInterview = () => {
      questions.value.forEach(({ question, answer, answerRating }) => {
        console.log(question, answer, answerRating);
      });
    };
    const addQuestion = () => {
      questions.value.push({ question: "", answer: "", answerRating: "" });
    };
    const endInterview = () => {
      send(data, toBackend);
      router.push({ name: "test" });
    };
    return {
      questions,
      saveInterview,
      addQuestion,
      endInterview,
    };
  },
};
</script>

<style></style>
