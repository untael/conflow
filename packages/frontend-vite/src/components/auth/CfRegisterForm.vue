<template>
  <va-card>
    <va-card-title>
      Sign Up
    </va-card-title>

    <va-card-content class="d-flex flex-col">
      <va-input v-model="username" label="Name" type="text"/>
      <va-input v-model="email" :rules="emailRules" label="Email" type="text" class="pt-3"/>
      <va-input v-model="password" label="Password" type="password" class="pt-3"/>
      <va-input v-model="passwordConfirmation" label="Password confirmation" type="password" class="pt-3"/>
      <div class="pb-3 pt-1 text-sm text-center font-thin">
        Already a member?
        <router-link :to="{name: 'Login'}" class="font-medium">Sign in</router-link>
      </div>
      <va-button color="success" type="submit" @click="signUp">Submit</va-button>
    </va-card-content>
  </va-card>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useValidation } from '@/composables/useValidation'
import { useAuth } from '@/composables/useAuth'

export default {
  name: 'CfRegisterForm',
  setup () {
    const { register } = useAuth()
    const { emailRules } = useValidation()
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const passwordConfirmation = ref('')
    const signUp = () => {
      // register(username.value, email.value, password.value)
    }
    return {
      signUp,
      emailRules,
      email,
      password,
      username,
      passwordConfirmation,
    }
  },

}
</script>

<style lang="scss">

</style>
