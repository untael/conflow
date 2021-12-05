<template>
  <div :class="{'cf-code-block--codemirror-hidden': isLoading}">
    Code:
    <textarea :value="modelValue" id="editor"/>
  </div>
</template>

<script lang="ts">
import * as Codemirror from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror-editor-vue3/dist/style.css'
import 'codemirror/lib/codemirror.css'
import { onMounted, ref } from 'vue'
import { js_beautify as jsFormatter } from 'js-beautify'

export default {
  name: 'CfCodeBlock',
  props: {
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
  },
  setup (props: any, { emit }) {
    const isLoading = ref(true)
    onMounted(async () => {
          const codemirrorElement = document.getElementById('editor')
          const codemirror = Codemirror.fromTextArea(codemirrorElement as HTMLTextAreaElement, {
            mode: 'text/javascript', // Language mode
            lineNumbers: true, // Show line number
            smartIndent: true, // Smart indent
            readOnly: props.readOnly,
            indentUnit: 2, // The smart indent unit is 2 spaces in length
          })
          codemirror.on('change', (instance, change) => {
            emit('update:modelValue', instance.getValue())
          })
          codemirror.on('blur', (instance, change) => {
            let value = jsFormatter(instance.getValue(), { indent_size: 2 })
            instance.setValue(value)
            emit('update:modelValue', value)
          })
          isLoading.value = false
          emit('loaded', isLoading.value)
          //todo: add loader, remove loader from qForm
        },
    )
    return {
      isLoading,
    }
  },
}
</script>

<style lang="scss">
.cf-code-block {
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
    height: auto;
  }
}
</style>
