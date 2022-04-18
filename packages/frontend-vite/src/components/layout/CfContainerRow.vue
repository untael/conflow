<template>
  <div class="py-2">
    <div class="font-bold" v-if="title">
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
