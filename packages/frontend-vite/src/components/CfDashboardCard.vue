<template>
  <div class="flex flex-wrap">
    <div
        class="cf-questions-dashboard-page__tile cursor-pointer w-1/4 flex flex-1 flex-col items-center border border-solid border-gray-300 px-4 py-4 mx-2 my-2"
        @click="$router.push({name: card.route})"
    >
      <div class="cf-questions-dashboard-page__tile__title">
        {{ card.title }}
      </div>
      <va-icon size="6rem" :name="card.icon"/>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CfDashboardCard',
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">

</style>
