<template>
  <header class="cf-header px-4 z-20 flex items-center shadow">
    <div class="cf-header__controls row items-center justify-between">
      <cf-logo/>
      <div v-if="!user">
        <va-button color="primary" class="mr-2" @click="$router.push({name: 'Sign up'})">
          Sign up
        </va-button>
        <va-button color="success" @click="$router.push({name: 'Login'})">
          Login
        </va-button>
      </div>
      <div class="flex justify-center items-center" v-else>
        <div class="mr-2">
          {{ user.username }}
        </div>
        <va-button rounded="true" flat icon="logout" @click="$router.push({name: 'Login'})"/>
      </div>
    </div>
  </header>
</template>

<script lang="ts">

import CfLogo from '@/components/CfLogo.vue'
import { inject } from 'vue'

export default {
  name: 'CfHeader',
  components: { CfLogo },
  setup () {
    const user = inject('currentUser')
    return {
      user,
    }
  },

}
</script>

<style lang="scss">

.cf-header {
  //box-shadow: 0 3px 8px rgb(122 139 173 / 20%);
  --cf-header-height: 64px;
  height: var(--cf-header-height);

  &__controls {
    &--bordered {
      border-bottom: 1px solid var(--va-primary);
    }
  }
}
</style>
