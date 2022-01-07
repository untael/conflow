<template>
  <cf-container>
    <template #title>
      Add tag
    </template>
    <template #default>
      <va-form ref="addTagForm">
        <div class="py-2">
          Tag:
          <va-input
              v-model="tag.name"
          />
        </div>
        <div class="pt-4 d-flex justify-end">
          <va-button color="secondary" @click="$router.back()">
            Cancel
          </va-button>
          <va-button color="primary" class="ml-2" :loading="isTagCreateInProgress"
                     @click="handleCreateTag(tag)">
            Add
          </va-button>
        </div>
      </va-form>
    </template>
  </cf-container>
</template>
<script lang="ts">
import CfContainer from '../layout/CfContainer.vue'
import { ref } from 'vue'
import Tag from '@/api/Question/Tag'
import { useTag } from '@/composables/useTag'
import { useToast } from '@/composables/useToast'


export default {
  components: { CfContainer },
  name: 'CfAddTagForm',
  setup () {
    const tagCreateForm = ref(null)
    const { $toast } = useToast()
    const isTagCreateInProgress = ref(false)
    const tag = ref(new Tag({}))

    const { createTag } = useTag()
    const handleCreateTag = async (data: Tag) => {

      if (!!tag.value.name) {
        try {
          isTagCreateInProgress.value = true

          await createTag(data)
          $toast.init({
            message: 'Tag was successfully created',
            color: 'success',
          })
        } catch (error) {
          $toast.init({
            message: 'Tag was not created',
            color: 'danger',
          })
        } finally {
          isTagCreateInProgress.value = false

        }
      } else {
        $toast.init({
          message: 'Tag field is empty',
          color: 'danger',
        })
      }

    }
    return {
      tag,
      handleCreateTag,
      tagCreateForm,
      isTagCreateInProgress,
    }

  },
}
</script>
