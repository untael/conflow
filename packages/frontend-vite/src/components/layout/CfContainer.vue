<template>
  <div class="cf-container container py-4 border-0 mx-auto flex flex-col max-w-screen-md">
    <va-card square outlined class="py-4 border-0 max-w-screen-md d-flex flex-col">
      <va-card-title class="text-lg">
        <slot name="title"></slot>
      </va-card-title>
      <va-card-content>
        <slot/>
      </va-card-content>
    </va-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CfContainer',
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
