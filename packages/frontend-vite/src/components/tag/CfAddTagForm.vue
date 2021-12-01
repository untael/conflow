<template >
  <cf-container >
    <template #title >
      Add tag
    </template >
    <template #default >
      <va-form ref = "addTagForm" >
        <div class = "py-2" >
          Tag:
          <va-input
              v-model = "tag.name"
          />
        </div >
        <div class = "pt-4 d-flex justify-end" >
          <va-button color = "secondary" @click = "$router.back()" >
            Cancel
          </va-button >
          <va-button color = "primary" class = "ml-2" :loading = "isTagCreateInProgress"
                     @click = "handleCreateTag(tag)" >
            Add
          </va-button >
        </div >
      </va-form >
    </template >
  </cf-container >
</template >
<script lang = "ts" >
import CfContainer from "../layout/CfContainer.vue";
import $vaToast from "@vitejs/plugin-vue";
import {inject, onMounted, Ref, ref} from 'vue'
import Tag from '@/api/Question/Tag'
import {useTag} from "@/composables/useTag";
import CfSpinner from '@/components/CfSpinner.vue'


export default {
  components: {CfContainer},
  name: 'CfAddTagForm',
  setup() {
    const tagCreateForm = ref(null)
    const $vaToast: any = inject('$vaToast')
    const isTagCreateInProgress = ref(false)
    const tag = ref(new Tag({}))

    const {createTag} = useTag()
    const handleCreateTag = async (data: Tag) => {

      if (!!tag.value.name) {
        try {
          isTagCreateInProgress.value = true

          await createTag(data)
          $vaToast.init({
            message: 'Tag was successfully created',
            color: 'success',
          })
        } catch (error) {
          $vaToast.init({
            message: 'Tag was not created',
            color: 'danger',
          })
        } finally {
          isTagCreateInProgress.value = false

        }
      } else {
        $vaToast.init({
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

  }
}
</script >