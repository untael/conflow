<template>
  <div class="bg-gray-100 h-screen relative">
    <cf-topbar/>
    <cf-header/>
    <main>
      <router-view/>
    </main>
    <cf-footer/>
  </div>
</template>

<script lang="ts">
import CfFooter from '@/components/layout/CfFooter.vue'
import CfHeader from '@/components/layout/CfHeader.vue'
import { ref } from 'vue'
import CfTopbar from '@/components/layout/CfTopbar.vue'

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
      visible
    }
  },
}
</script>

<style scoped>

</style>
