<template>
  <div class="cf-container overflow-y-auto h-full border-0 flex flex-col">
    <va-card square outlined class="border-0 d-flex flex-col">
      <va-card-title v-if="$slots.title" class="text-lg">
        <slot name="title"></slot>
      </va-card-title>
      <va-card-content>
        <div v-if="loading">
          <cf-spinner
              class="mx-auto"
              :animation-duration="1200"
              :size="300"
              color="rgb(44, 130, 224)"
          />
        </div>
        <div v-else>
          <slot/>
        </div>
      </va-card-content>
    </va-card>
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
    }
  }
}
</script>

<style lang="scss">
.cf-container {
  --va-collapse-solid-box-shadow: none;

  .va-collapse__body {
    border: 1px solid var(--va-collapse-solid-header-content-background-color);
  }
}
</style>
