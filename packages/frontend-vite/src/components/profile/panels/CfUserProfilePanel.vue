<template>
  <cf-container :loading="currentUser.isLoading" class="cf-user-profile-panel">
    <template #title>
      User Profile Panel
    </template>
    <template #default>
      <cf-container-row class="w-1/2 pr-2" title="Username:">
        <va-input
            class="w-full"
            v-model="user.username"
        />
      </cf-container-row>
      <div class="flex">
        <div>
          <cf-container-row class="mr-3" title="First name:">
            <va-input
                class="w-full"
                v-model="user.first_name"
            />
          </cf-container-row>
          <cf-container-row class="mr-3" title="Phone:">
            <va-input
                class="w-full"
                v-model="user.phone_number"
                type="number"
            />
          </cf-container-row>
        </div>
        <div>
          <cf-container-row title="Last name:">
            <va-input
                class="w-full"
                v-model="user.last_name"
            />
          </cf-container-row>
          <cf-container-row title="Provider:">
            <div v-if="user.provider">
              <va-input
                  class="w-full"
                  disabled
                  :model-value="user.provider"
              />
            </div>
          </cf-container-row>
        </div>
      </div>
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
