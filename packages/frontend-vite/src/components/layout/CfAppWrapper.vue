<template>
  <div class="cf-app-wrapper h-screen fixed flex flex-col w-full">
    <!--    <cf-topbar/>-->
    <cf-header/>
    <main class="h-full overflow-hidden relative bg-gray-200">
      <div class="h-full">
        <router-view/>
      </div>
    </main>
    <!--        <cf-footer/>-->
  </div>
</template>

<script lang="ts">
import CfFooter from '@/components/layout/CfFooter.vue'
import CfHeader from '@/components/layout/CfHeader.vue'
import CfTopbar from '@/components/layout/CfTopbar.vue'
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'CfAppWrapper',
  components: {
    CfTopbar,
    CfFooter,
    CfHeader,
  },
  setup () {
    return {
    }
  },
  async beforeRouteEnter(to: any, from:any, next:any) {
    const { getMe } = useAuth()
    await getMe()
    next();
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap');

.cf-app-wrapper {
  font-family: 'Roboto', sans-serif;
}
</style>
