<template>
  <cf-container :loading="currentUser.isLoading" class="cf-user-profile-panel">
    <template #title>
      User Profile Panel
    </template>
    <template #default>
      <cf-container-row>
        Username:
        <va-input
            v-model="user.username"
        />
      </cf-container-row>

      <cf-container-row class="flex">
        <div class="mr-1 flex-grow basis-1/2">
          First name:
          <va-input
              v-model="user.first_name"
          />
        </div>
        <div class="ml-1 flex-grow basis-1/2">
          Last name:
          <va-input
              v-model="user.last_name"
          />
        </div>
      </cf-container-row>

      <cf-container-row class="flex">
        <div class="mr-1 flex-grow basis-1/2">
          Phone:
          <va-input
              v-model="user.phone_number"
              type="number"
          />
        </div>
        <div class="ml-1 flex-grow basis-1/2" v-if="user.provider">
          Provider:
          <va-input
              disabled
              :model-value="user.provider"
          />
        </div>
      </cf-container-row>
    </template>
    <template #control-buttons>

      <cf-control-buttons
          @cancel="$router.back()"
          @save="onSave"
      />
    </template>
  </cf-container>
</template>

<script lang="ts">
import CfContainer from '@/components/layout/CfContainer.vue'
import { ref, watch } from 'vue'
import { useAuth } from '@/composables/useAuth'
import CfControlButtons from '@/components/layout/CfControlButtons.vue'
import { useUser } from '@/composables/useUser'
import CfContainerRow from '@/components/layout/CfContainerRow.vue'
import User from '@/api/User/User'

export default {
  name: 'CfUserProfilePanel',
  components: { CfContainerRow, CfControlButtons, CfContainer },
  setup () {
    const isLoading = ref(false)
    const { currentUser } = useAuth()
    const { userAPIHandlers, user } = useUser()
    const onSave = async () => {
      await userAPIHandlers.update(user.value)
    }

    //ToDo refactor
    watch(currentUser, async () => {
      if (currentUser.value) {
        user.value = new User(currentUser.value)
      }
    }, { immediate: true })
    return {
      isLoading,
      onSave,
      user,
      currentUser,
    }
  },

}
</script>

<style lang="scss">

</style>
