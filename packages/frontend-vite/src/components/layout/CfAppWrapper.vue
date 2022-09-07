<template>

  <div class="cf-app-wrapper h-screen fixed flex flex-col w-full">
    <!--    <cf-topbar/>-->
    <div v-if="loading" class="h-full flex justify-center items-center">
      <cf-spinner
          class="mx-auto"
          :animation-duration="1200"
          :size="300"
          color="rgb(44, 130, 224)"
      />
    </div>
    <template v-else>
      <cf-header/>
      <main class="h-full overflow-hidden relative bg-gray-200">
        <div class="h-full">
          <router-view/>
        </div>
      </main>
      <!--        <cf-footer/>-->
    </template>
  </div>
</template>

<script lang="ts">
import CfSpinner from '@/components/CfSpinner.vue'
import CfFooter from '@/components/layout/CfFooter.vue'
import CfHeader from '@/components/layout/CfHeader.vue'
import CfTopbar from '@/components/layout/CfTopbar.vue'
import { useAuth } from '@/composables/useAuth'
import { ref } from 'vue'

export default {
  name: 'CfAppWrapper',
  components: {
    CfTopbar,
    CfFooter,
    CfHeader,
    CfSpinner,
  },
  setup () {
    const loading = ref(true)
    return {
      loading,
    }
  },
  async beforeRouteEnter (to: any, from: any, next: any) {
    const { getMe } = useAuth()
    await getMe()
    next((vm:any) => {
      vm.loading = false
    })
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap');

.cf-app-wrapper {
  font-family: 'Roboto', sans-serif;
}
</style>
