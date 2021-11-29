<template>
  <va-card>
    <va-card-title>
      Reset password
    </va-card-title>

    <va-card-content class="d-flex flex-col">
      <va-input v-model="email" label="Email" type="text" class="pb-3"/>
      <va-button color="success" gradient type="submit">Submit</va-button>
    </va-card-content>

    <hr>

    <va-card-content>
      <div class="pb-3 pt-1 text-sm text-center font-thin">
        Back to
        <router-link :to="{name: 'Login'}" class="font-medium">Sign in</router-link>
      </div>
    </va-card-content>
  </va-card>
</template>

<script lang="ts">
import { ref } from 'vue'

export default {
  name: 'CfResetPasswordForm',
  setup () {
    const email = ref('')
    return {
      email,
    }
  },
}
</script>

<style lang="scss">

</style>
