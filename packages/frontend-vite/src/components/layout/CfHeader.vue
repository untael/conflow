<template>
  <header class="cf-header bg-gray-50 px-4 py-2 z-20">
    <div class="cf-header__controls row items-center justify-center">
      <va-button :to="{name: 'Questions dashboard'}">
        Questions
      </va-button>
      <va-button :to="{name: 'Interviews dashboard'}">
        Interviews
      </va-button>
    </div>
  </header>
</template>

<script lang="ts">

export default {
  name: 'CfHeader',
  setup () {
  },
}
</script>

<style lang="scss">

.cf-header {
  --cf-header-height: 64px;
  height: var(--cf-header-height);

  &__controls {
    &--bordered {
      border-bottom: 1px solid var(--va-primary);
    }
  }
}
</style>
