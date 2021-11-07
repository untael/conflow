<template>
  <va-card>
    <va-card-title>
      Sign In
    </va-card-title>

    <va-card-content class="d-flex flex-col">
      <va-input v-model="email" :rules="emailRules" label="Email" type="text"/>
      <va-input v-model="password" label="Password" type="password" class="pt-3"/>
      <div class="pb-3 pt-1 text-sm text-center font-thin">
        <router-link :to="{name: 'reset-password'}" class="font-medium">Forgot password?</router-link>
      </div>
      <va-button @click="signUp" gradient type="submit">Submit</va-button>
    </va-card-content>

    <hr>

    <va-card-content class="d-flex flex-col pt-4 divide-y">
      <div class="text-center font-thin text-sm">
        Still have no account?
      </div>
      <va-button :to="{name: 'sign-up'}" flat>Sign up</va-button>
    </va-card-content>
  </va-card>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useValidation } from '@/components/validation/useValidation'
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'CfLoginForm',
  setup () {
    const { login } = useAuth()
    const { emailRules } = useValidation()
    const email = ref('')
    const password = ref('')
    const signUp = () => {
      login(email.value, password.value)
    }
    return {
      emailRules,
      email,
      password,
      signUp,
    }
  },
}
</script>

<style lang="scss">

</style>
