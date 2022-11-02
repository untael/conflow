<template>
  <cf-container contentClass="h-full" class="cf-auth-required-panel">
    <template #default>
      <div class="flex flex-col items-center justify-center text-center">
        <div class="flex-none mb-4">
          <va-icon name="lock" size="8rem"/>
        </div>
        <div class="text-2xl flex-none mb-4">
          Authentication is required to view this page.
        </div>
        <div class="text-xl flex-none">
          Please
          <va-button color="primary" preset="secondary" text-color="primary" :to="{name: 'Login'}">
            Sign in
          </va-button>
          or
          <va-button color="success" preset="secondary" text-color="success" :to="{name: 'Sign up'}">
            Sign up
          </va-button>
        </div>
      </div>
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

    return {}
  },
}
</script>

<style lang="scss">
.cf-auth-required-panel {

}
</style>
