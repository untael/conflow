<template>
  <div class="cf-app-wrapper bg-gray-100 h-screen relative ">
<!--    <cf-topbar/>-->
    <cf-header/>
    <main class="h-full">
      <router-view/>
    </main>
    <cf-footer/>
  </div>
</template>

<script lang="ts">
import CfFooter from '@/components/layout/CfFooter.vue'
import CfHeader from '@/components/layout/CfHeader.vue'
import {ref} from 'vue'
import CfTopbar from '@/components/layout/CfTopbar.vue'

export default {
  name: 'CfAppWrapper',
  components: {
    CfTopbar,
    CfFooter,
    CfHeader,
  },
  setup() {
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
