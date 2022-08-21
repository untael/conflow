<template>
  <cf-container class="cf-auth-required-panel">
    <template #default>
      This page required auth
    </template>
  </cf-container>
</template>

<script lang="ts">
import CfContainer from '@/components/layout/CfContainer.vue'
import CfContainerRow from '@/components/layout/CfContainerRow.vue'

export default {
  name: 'CfAuthRequiredPanel',
  components: {
    CfContainerRow,
    CfContainer,
  },

  setup (props: any) {

    return {

    }
  },
}
</script>

<style lang="scss">
.cf-auth-required-panel {

}
</style>
