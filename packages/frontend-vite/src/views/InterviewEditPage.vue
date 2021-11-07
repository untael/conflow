<template>
  <div class="mx-auto py-4 flex flex-col max-w-screen-md">
    <interview-edit-form/>
  </div>
</template>

<script lang="ts">
import InterviewEditForm from '../components/InterviewEditForm.vue'

export default {
  name: 'InterviewEditPage',
  components: {
    InterviewEditForm,
  },
  setup () {
    return {}
  },
}
</script>


