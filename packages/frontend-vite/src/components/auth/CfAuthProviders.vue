<template>
  <div class="cf-auth-providers">
    <div class="text-center">
      or
    </div>
    <div class="flex">
      <a class="flex justify-center" :href="`${APIUrl}/connect/github`">
        <cf-github-icon/>
      </a>
      <a class="flex justify-center" :href="`${APIUrl}/connect/google`">
        <cf-google-icon/>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import CfGoogleIcon from '@/components/CfGoogleIcon.vue'
import CfGithubIcon from '@/components/CfGithubIcon.vue'
import { useUrl } from '@/composables/useUrl'

export default {
  name: 'CfAuthProviders',
  components: { CfGoogleIcon, CfGithubIcon },

  setup () {
    const { APIUrl } = useUrl()
    return {
      APIUrl,
    }
  },
}
</script>

<style lang="scss">
.cf-auth-providers {
}
</style>