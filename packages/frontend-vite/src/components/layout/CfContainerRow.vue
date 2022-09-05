<template>
  <div class="py-2">
    <div v-if="title">
      {{ title }}
    </div>
    <slot/>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
    },
  },
  name: 'CfContainerRow',
}
</script>

<style lang="scss">

</style>
