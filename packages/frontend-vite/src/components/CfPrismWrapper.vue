<template>
  <pre class="cf-prism-wrapper-code-block" :class="`language-${lang}`">
    <code
        :class="`language-${lang}`"
        v-html="highlightedCode"
    />
  </pre>
</template>

<script>
import Prism from 'prismjs'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-bash'
import { computed } from 'vue'

export default {
  name: 'CfPrismWrapper',

  props: {
    code: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: 'javascript',
    },
  },

  setup (props) {
    const highlightedCode = computed(() => {
      return Prism.highlight(props.code, Prism.languages[props.lang], props.lang)
    })
    return {
      highlightedCode,
    }
  },
}
</script>


<style lang="scss">
$prism-background: rgba(209, 213, 219, var(--tw-bg-opacity)) !default;
$font-weight-bold: 700 !default;
:root {
  --code-block-background: 209, 213, 219;
  --code-block-opacity: 0.3;
}

pre.cf-prism-wrapper-code-block {
  border: 1px solid rgba(var(--code-block-background), 1);
  border-radius: var(--cf-border-radius);
  background: rgba(var(--code-block-background), var(--code-block-opacity));
  padding-top: 1.3rem;
  font-size: calc(1rem / 1.4);

  code[class*='language-'],
  pre[class*='language-'] {
    color: black;
    background: none;
    text-shadow: 0 1px white;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1rem;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    tab-size: 4;
    hyphens: none;
    border-radius: var(--cf-border-radius);
  }

  pre[class*='language-'] {
    padding: 1rem;
    margin: 0;
    overflow: auto;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: $prism-background;
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.1rem;
    border-radius: var(--cf-border-radius);
    white-space: normal;
  }

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: slategray;
  }

  .token.punctuation {
    color: #999999;
  }

  .token.namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: #990055;
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: #669900;
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: #9a6e3a;
    //background: hsla(0, 0%, 100%, 0.5);
    //background: rgba(var(--code-block-background), var(--code-block-opacity));
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: #0077aa;
  }

  .token.function,
  .token.class-name {
    color: #dd4a68;
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: #ee9900;
  }

  .token.important,
  .token.bold {
    font-weight: $font-weight-bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
}
</style>
