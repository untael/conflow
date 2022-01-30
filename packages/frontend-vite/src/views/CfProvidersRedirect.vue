<template>
  <div>

  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

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
    onMounted(() => {
      console.log('route.query', route.query)
      switch (props) {
        case 'google':
          localStorage.setItem('token', route.query.id_token as string)
          break
        case 'github':
          localStorage.setItem('token', route.query.access_token as string)
          break
        default:
          router.push({ name: 'Dashboard' })
      }
    })
    return {}
  },

}
</script>

<style lang="scss">

</style>
