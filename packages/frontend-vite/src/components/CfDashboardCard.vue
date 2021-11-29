<template>
  <va-badge class="cf-dashboard-card flex-1" overlap :text="card.badgeText">
    <div
        class="cf-dashboard-card transition hover:text-blue-800 hover:border-blue-800 cursor-pointer flex flex-1 flex-col items-center border border-solid border-gray-300 px-4 py-4 mx-2 my-2"
        @click="$router.push({name: card.route})"
    >
      <div class="cf-questions-dashboard-page__tile__title">
        {{ card.title }}
      </div>
      <va-icon size="6rem" :name="card.icon"/>
    </div>
  </va-badge>
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
.cf-dashboard-card {
  .va-badge__text-wrapper {
    left: 95% !important;
    top: 2.5% !important;
  }
}
</style>
