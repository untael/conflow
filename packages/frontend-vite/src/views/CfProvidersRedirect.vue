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
      console.log('props', props)
      switch (props.provider) {
        case 'google':
          console.log('im here google', route.query.id_token as string)
          localStorage.setItem('token', route.query.id_token as string)
          break
        case 'github':
          console.log('im here github', route.query.access_token as string)
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
