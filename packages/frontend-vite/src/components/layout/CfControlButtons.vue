<template>
  <div class="cf-control-buttons pt-4 flex justify-between mt-auto">
    <div class="flex justify-start" v-if="$slots.customs">
      <slot name="customs"/>
    </div>
    <div class="flex justify-end">
      <va-button class="flex-none" color="secondary" @click="$emit('cancel')">
        Cancel
      </va-button>
      <va-button color="primary" class="flex-none ml-2" @click="$emit('save')" :loading="loading">
        Save
      </va-button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CfControlButtons',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {}
  },
}
</script>

<style lang="scss">
.cf-control-buttons {
  padding: var(--va-card-padding)
}
</style>
