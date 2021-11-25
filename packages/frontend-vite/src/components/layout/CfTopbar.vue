<template>
  <div class="cf-topbar bg-gray-50 z-10" :class="topbarClasses">
    <va-button :to="{name : 'Question create form'}">test</va-button>
    <div class="cf-topbar__button bg-gray-50">
      <va-button
          @click="toggleTopbar"
          :icon="!topbarExpanded ? 'expand_more' : 'expand_less'"
          color="primary"
          flat
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'

export default {
  name: 'CfTopbar',
  setup () {
    let topbarExpanded = ref(false)
    const topbarClasses = computed(() => {
      return {
        'h-5/6 lg:h-1/2': topbarExpanded.value,
      }
    })
    const toggleTopbar = () => {
      topbarExpanded.value = !topbarExpanded.value
    }
    return {
      topbarExpanded,
      topbarClasses,
      toggleTopbar,
    }
  },
}
</script>

<style lang="scss">

.cf-topbar {
  filter: drop-shadow(0 0.05rem 0.1rem var(--va-secondary));
  width: 100%;
  transition: height .5s ease-in-out;
  height: 64px; //ToDo refer it to header height by css variable
  position: absolute;

  &--expanded {
    height: clamp(20vh, 85vh, 85vh);
  }

  &__button {
    position: absolute;
    background-color: transparent;
    left: 50%;
    bottom: 0;
    background-color: white;
    border-radius: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    margin-bottom: -1rem;
  }
}
</style>
