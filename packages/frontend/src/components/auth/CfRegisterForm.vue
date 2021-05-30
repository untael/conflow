<template>
  <va-card>
    <va-card-title>
      Sign Up
    </va-card-title>

    <va-card-content class="d-flex flex-col">
      <va-input v-model="email" :rules="emailRules" label="Email" type="text"/>
      <va-input v-model="password" label="Password" type="password" class="pt-3"/>
      <va-input v-model="passwordConfirmation" label="Password confirmation" type="password" class="pt-3"/>
      <div class="pb-3 pt-1 text-sm text-center font-thin">
        Already a member?
        <router-link :to="{name: 'sign-in'}" class="font-medium">Sign in</router-link>
      </div>
      <va-button type="submit">Submit</va-button>
    </va-card-content>
  </va-card>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useValidation } from '@/components/validation/useValidation'

export default {
  name: 'CfRegisterForm',
  setup () {
    const { emailRules } = useValidation()
    const email = ref('')
    const password = ref('')
    const passwordConfirmation = ref('')
    return {
      emailRules,
      email,
      password,
      passwordConfirmation,
    }
  },

}
</script>

<style lang="scss">

</style>
