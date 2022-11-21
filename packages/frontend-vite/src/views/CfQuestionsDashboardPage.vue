<template>
  <cf-container class="cf-questions-dashboard-page bg-transparent flex">
    <template #title>
      Questions dashboard
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
import CfContainer from '@/components/layout/CfContainer.vue'
import { ref } from 'vue'
import CfDashboardCard from '@/components/CfDashboardCard.vue'

export default {
  name: 'CfQuestionsDashboardPage',
  components: { CfDashboardCard, CfContainer },
  setup () {
    const cards = ref([
      {
        title: 'Create question',
        icon: 'create',
        route: 'Question create',
      },
      {
        title: 'Questions list',
        icon: 'format_list_bulleted',
        route: 'Question list editable',
      },
    ])
    return {
      cards,
    }
  },

}
</script>

<style lang="scss">
.cf-questions-dashboard-page {
  &__tile:hover {

  }
  --va-card-background-color: transparent;
  .va-card__title{
    justify-content: center;
  }
}
</style>
