<template>
  <div id="app" class="bg-gray-300 h-screen">

    <cf-header>

    </cf-header>
    <main>
      <router-view/>
    </main>
    <cf-footer class="">

    </cf-footer>
  </div>
</template>

<script lang="ts">
import CfFooter from '@/components/layout/CfFooter.vue'
import CfHeader from '@/components/layout/CfHeader.vue'
import { ref } from 'vue'

export default {
  components: {
    CfFooter, CfHeader,
  },
  setup () {
    const visible = ref(true)
    return {
      visible
    }
  },

}
</script>
