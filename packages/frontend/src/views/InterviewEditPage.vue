<template>
  <div class="sm:container mx-auto py-4 flex flex-col w-full">
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


