<template>
  <va-card>
    <va-card-title>
      Sign In
    </va-card-title>

    <va-card-content class="d-flex flex-col">
      <va-input v-model="email" :rules="emailRules" label="Email" type="text"/>
      <va-input v-model="password" label="Password" type="password" class="pt-3"/>
      <div class="pb-3 pt-1 text-sm text-center font-thin">
        <router-link :to="{name: 'Reset password'}" class="font-medium">Forgot password?</router-link>
      </div>
      <va-button color="success" @click="signIn" gradient type="submit">Submit</va-button>
    </va-card-content>

    <va-card-content class="d-flex flex-col">
      <cf-auth-providers/>
    </va-card-content>

    <hr>

    <va-card-content class="d-flex flex-col pt-4 divide-y">
      <div class="text-center font-thin text-sm">
        Still have no account?
      </div>
      <va-button color="primary" :to="{name: 'Sign up'}" preset="secondary">Sign up</va-button>
    </va-card-content>
  </va-card>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useValidation } from '@/composables/useValidation'
import CfAuthProviders from '@/components/auth/CfAuthProviders.vue'

export default {
  name: 'CfLoginForm',
  components: { CfAuthProviders },
  setup () {
    const { emailRules } = useValidation()
    const email = ref('')
    const password = ref('')
    const signIn = () => {
      // login(email.value, password.value)
    }
    return {
      emailRules,
      email,
      password,
      signIn,
    }
  },
}
</script>

<style lang="scss">

</style>
