<template>
  <cf-container>
    <template #title>
      Tags list
    </template>
    <va-chip
        v-for="(tag, index) in tags"
        :key="index"
        color="#d1d5db"
        size="small"
        square
        outline
        class="mr-2"
    >
      {{ tag.name }}
    </va-chip>
  </cf-container>
</template>
<script>
import CfContainer from '../layout/CfContainer.vue'
import { useTag } from '@/composables/useTag'
import { onMounted, ref } from 'vue'

export default {
  name: 'CfTagsList',
  components: { CfContainer },
  setup () {
    const tags = ref([])
    const { getTags } = useTag()
    onMounted(async () => {
      tags.value = await getTags()
    })
    return {
      tags,
    }
  },
}
</script>
<style lang="scss">
.va-chip {
  --va-chip-square-border-radius: 0;
  --va-chip-border: 1px solid;
  --va-chip-square-border-radius: var(--cf-border-radius);
  color: var(--va-card-color) !important;
  @apply bg-gray-100
}
</style>
