<template>
  <div
      class="cf-logo flex items-center justify-center flex-col hover:text-blue-800 cursor-pointer transition"
      @click="$router.push({name: 'Dashboard'})"
  >
    <div>
      <va-icon size="large" name="people"/>
    </div>
    <div class="font-bold">
      {{ appName }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'CfLogo',
  setup () {

    const appName = ref(import.meta.env.VITE_APP_NAME)
    return {
      appName,
    }
  },

}
</script>

<style lang="scss">

</style>
