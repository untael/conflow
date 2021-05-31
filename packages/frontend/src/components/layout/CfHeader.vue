<template>
  <header class="cf-header bg-gray-50 px-4 py-2 z-20">
    <div class="cf-header__controls row align--center justify--space-between">
      <va-icon class="z-20" color="primary">CF</va-icon>
      <va-avatar class="z-20" src="https://randomuser.me/api/portraits/men/31.jpg"/>
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
