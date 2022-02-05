<template>
  <div class="cf-app-wrapper h-screen fixed flex flex-col w-full">
    <!--    <cf-topbar/>-->
    <cf-header/>
    <main class="h-full overflow-hidden relative bg-gray-200">
      <div class="h-full">
        <router-view/>
      </div>
    </main>
    <!--        <cf-footer/>-->
  </div>
</template>

<script lang="ts">
import CfFooter from '@/components/layout/CfFooter.vue'
import CfHeader from '@/components/layout/CfHeader.vue'
import CfTopbar from '@/components/layout/CfTopbar.vue'
import { onMounted, provide, Ref, ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import User from '@/api/User/User'

export default {
  name: 'CfAppWrapper',
  components: {
    CfTopbar,
    CfFooter,
    CfHeader,
  },
  setup () {
    const { getMe } = useAuth()
    const user: Ref<User | null> = ref(null)
    provide('currentUser', user)
    onMounted(async () => {
      user.value = await getMe()
    })
    return {
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
