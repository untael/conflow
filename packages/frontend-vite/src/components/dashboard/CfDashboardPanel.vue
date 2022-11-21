<template>
  <cf-container class="cf-questions-dashboard-page bg-transparent flex">
    <template #title>
      Dashboard
    </template>
    <div class="flex flex-col md:flex-row flex-wrap">
      <cf-dashboard-card
          v-for="(card, index) in cards" :key="index"
          :card="card"
      />
    </div>
  </cf-container>
</template>

<script lang="ts">
import { ref } from 'vue'
import CfContainer from '@/components/layout/CfContainer.vue'
import CfDashboardCard from '@/components/CfDashboardCard.vue'

export default {
  name: 'CfDashboard',
  components: { CfDashboardCard, CfContainer },
  setup () {
    const cards = ref([
      {
        title: 'Questions',
        icon: 'contact_support',
        route: 'Questions dashboard',
        // badgeText: 'WIP',
      },
      {
        title: 'Interviews',
        icon: 'groups',
        route: 'Interviews dashboard',
        badgeText: 'WIP',
      },
    ])

    return {
      cards,
    }
  },

}
</script>

<style lang="scss">

</style>
