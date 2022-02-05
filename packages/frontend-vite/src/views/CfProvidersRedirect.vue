<template>
  <div>

  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'CfProvidersRedirect',
  props: {
    provider: {
      type: String,
      required: true,
    },
  },
  setup (props: any) {
    const route = useRoute()
    const router = useRouter()
    const { signUpByProviders, getMe } = useAuth()
    onMounted(async () => {
      await signUpByProviders(props.provider, route.query)
      await getMe()
      router.push({ name: 'Dashboard' })
    })
    return {}
  },

}
</script>

<style lang="scss">

</style>
