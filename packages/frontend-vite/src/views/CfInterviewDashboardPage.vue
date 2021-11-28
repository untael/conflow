<template>
  <cf-container class="cf-questions-dashboard-page bg-transparent flex">
    <template #title>
      Interviews dashboard
    </template>
    <div class="flex flex-wrap">
      <cf-dashboard-card
          v-for="(card, index) in cards" :key="index"
          :card="card"
      />
    </div>
  </cf-container>
</template>

<script lang="ts">
import CfDashboardCard from '@/components/CfDashboardCard.vue'
import { ref } from 'vue'
import CfContainer from '@/components/layout/CfContainer.vue'

export default {
  name: 'CfInterviewDashboardPage',
  components: { CfContainer, CfDashboardCard },
  setup () {
    const cards = ref([
      {
        title: 'Create interview',
        icon: 'create',
        route: 'Interview create',
      },
      {
        title: 'Interviews list',
        icon: 'format_list_bulleted',
        route: 'Interviews list',
      },
    ])
    return { cards }
  },

}
</script>

<style lang="scss">

</style>
