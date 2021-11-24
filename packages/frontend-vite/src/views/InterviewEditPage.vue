<template>
  <div class="mx-auto  flex flex-col max-w-screen-md">
    <interview-edit-form/>
  </div>
</template>

<script lang="ts">
import InterviewEditForm from '../components/interview/InterviewEditForm.vue'

export default {
  name: 'InterviewEditPage',
  components: {
    InterviewEditForm,
  },
  setup() {
    return {}
  },
}
</script>


