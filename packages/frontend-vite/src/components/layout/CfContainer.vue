<template>
  <div class="cf-container overflow-y-auto h-full border-0 flex flex-col bg-white justify-between">
    <va-card square outlined class="border-0 d-flex flex-col">
      <va-card-title v-if="$slots.title" class="text-lg">
        <slot name="title"></slot>
      </va-card-title>
      <va-card-content class="h-5/6">
        <div class="flex justify-center h-full items-center" v-if="loading">
          <cf-spinner
              :animation-duration="1200"
              :size="150"
              color="rgb(44, 130, 224)"
          />
        </div>
        <div v-else class="flex flex-col justify-between">
          <slot/>
        </div>
      </va-card-content>
    </va-card>
    <div class="flex-none" v-if="!loading">
      <slot name="control-buttons"/>
    </div>
  </div>
</template>

<script lang="ts">
import CfSpinner from '@/components/CfSpinner.vue'

export default {
  name: 'CfContainer',
  components: { CfSpinner },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
.cf-container {
  --va-collapse-solid-box-shadow: none;
  //scrollbar-gutter: stable;

  .va-collapse__body {
    border: 1px solid var(--va-collapse-solid-header-content-background-color);
  }
}
</style>
