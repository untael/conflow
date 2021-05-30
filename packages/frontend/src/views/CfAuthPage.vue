<template>
  <div class="bg-gray-100 h-screen relative d-flex justify--center align--center">
    <div class="w-4/5 sm:w-3/5 lg:w-1/3 xl:w-1/4 xl:w-1/5">
      <cf-login-form v-if="mode==='sign-in'"/>
      <cf-register-form v-if="mode==='sign-up'"/>
      <cf-reset-password-form v-if="mode==='reset-password'"/>
    </div>
  </div>
</template>

<script lang="ts">

import CfLoginForm from '@/components/auth/CfLoginForm.vue'
import CfRegisterForm from '@/components/auth/CfRegisterForm.vue'
import CfResetPasswordForm from '@/components/auth/CfResetPasswordForm.vue'

export default {
  name: 'CfAuthPage',
  components: { CfResetPasswordForm, CfRegisterForm, CfLoginForm },
  props: {
    mode: {
      type: String,
      default: 'sign-in',
      validator: (value: string) => {
        return ['sign-in', 'sign-up', 'reset-password'].includes(value)
      },
    },
  },
}
</script>

<style scoped>

</style>
