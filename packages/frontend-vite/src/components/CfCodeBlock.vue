<template>
  <div class="cf-code-block" :class="{'cf-code-block--codemirror-hidden': isLoading}">
    {{ label }}:
    <div class="cf-code-block__code-box">
      <va-button v-if="showCopyButton" @click="copyToClipboard" size="small" class="cf-code-block__code-box--copy-button">Copy</va-button>
      <textarea :value="modelValue" :id="`editor-${id}`"/>
    </div>
  </div>
</template>

<script lang="ts">
import * as Codemirror from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror-editor-vue3/dist/style.css'
import 'codemirror/lib/codemirror.css'
import { inject, onMounted, Ref, ref, watch } from 'vue'
import { js_beautify as jsFormatter } from 'js-beautify'

export default {
  name: 'CfCodeBlock',
  props: {
    id: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: false,
    },
    readOnly: {
      type: [String, Boolean],
      default: false,
    },
    autoformat: {
      type: Boolean,
      default: false,
    },
    autoheight: {
      type: Boolean,
      default: false,
    },
    showCopyButton: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Code',
    },
  },
  setup (props: any, { emit }: any) {
    const $vaToast: any = inject('$vaToast')
    const isLoading = ref(true)
    const copyToClipboard = async () => {
      await navigator.clipboard.writeText(props.modelValue)
      $vaToast.init({
        message: 'Code was copied to clipboard',
        color: 'success',
      })
    }
    const codeMirrorValue: Ref<string> = ref('')

    onMounted(() => {
      const codemirrorElement = document.getElementById(`editor-${props.id}`)
      const codemirror = Codemirror.fromTextArea(codemirrorElement as HTMLTextAreaElement, {
        mode: 'text/javascript', // Language mode
        lineNumbers: true, // Show line number
        smartIndent: true, // Smart indent
        readOnly: props.readOnly, //Read only state
        indentUnit: 2, // The smart indent unit is 2 spaces in length
      })
      codeMirrorValue.value = codemirror.getValue()
      codemirror.on('change', (instance, change) => {
        emit('update:modelValue', instance.getValue())
      })
      codemirror.on('blur', (instance, change) => {
        let value = jsFormatter(instance.getValue(), { indent_size: 2 })
        instance.setValue(value)
        emit('update:modelValue', value)
      })
      if (props.autoheight) {
        const initializedCodemirrorInstances = document.querySelectorAll('.CodeMirror')
        initializedCodemirrorInstances.forEach((block) => {
          block.setAttribute('style', 'height: auto')
        })
      }
      isLoading.value = false
      emit('loaded', isLoading.value)
      //todo: add loader, remove loader from qForm
      //Reactivity hack
      watch(() => props.modelValue, (value) => {
        if(codemirror.getValue() !== value) {
          codemirror.setValue(value)
          codeMirrorValue.value = value
        }
      })
    })
    return {
      copyToClipboard,
      isLoading,
    }
  },
}
</script>

<style lang="scss">
.cf-code-block {

  &__code-box {
    position: relative;

    &--copy-button {
      position: absolute !important;
      right: 0 !important;
      top: 0 !important;
      z-index: 3;
    }
  }

  .va-input-wrapper__message-list-wrapper {
    padding: 0;
  }

  textarea {
    width: 0px;
    height: 0px;
  }

  &--codemirror-hidden {
    visibility: hidden;
  }

  .CodeMirror {
    font-size: 14px;
    font-family: 'Roboto', sans-serif;
    background-color: var(--va-input-color);
    //height: auto;
  }
}
</style>
