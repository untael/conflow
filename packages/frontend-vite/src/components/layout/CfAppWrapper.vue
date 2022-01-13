<template>
  <div class="cf-app-wrapper h-screen fixed flex flex-col w-full">
    <!--    <cf-topbar/>-->
    <cf-header/>
    <main class="h-full overflow-hidden relative bg-gray-200">
      <div>
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
import { ref } from 'vue'

export default {
  name: 'CfAppWrapper',
  components: {
    CfTopbar,
    CfFooter,
    CfHeader,
  },
  setup () {
    const visible = ref(true)
    return {
      visible,
    }
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300&display=swap');

.cf-app-wrapper {
  font-family: 'Roboto', sans-serif;
}
</style>
