<template>
  <div
      class="scaling-squares-spinner"
      :style="spinnerStyle">
    <div class="square"
         v-for="(ss, index) in squaresStyles"
         :key="index"
         :class="`square-${index + 1}`"
         :style="ss">
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'

export default {
  name: 'CfSpinner',
  props: {
    animationDuration: {
      type: Number,
      default: 1250,
    },
    size: {
      type: Number,
      default: 65,
    },
    color: {
      type: String,
      default: '#fff',
    },
  },
  setup (props: any) {
    const spinnerStyle = computed(() => {
      return {
        height: `${props.size}px`,
        width: `${props.size}px`,
        animationDuration: `${props.animationDuration}ms`,
      }

    })
    const squareStyle = computed(() => {
      console.log('props.color', props.color)
      return {
        height: `${props.size * 0.25 / 1.3}px`,
        width: `${props.size * 0.25 / 1.3}px`,
        animationDuration: `${props.animationDuration}ms`,
        borderWidth: `${props.size * 0.04 / 1.3}px`,
        borderColor: props.color,
      }

    })
    const squaresStyles = computed(() => {
      const squaresStyles = []
      for (let i = 1; i <= squaresNum.value; i++) {
        squaresStyles.push(Object.assign({}, squareStyle.value))
      }
      return squaresStyles
    })
    const squaresNum = ref(4)
    return {
      squaresNum,
      spinnerStyle,
      squareStyle,
      squaresStyles,
    }
  },
}
</script>

<style scoped>
.scaling-squares-spinner, .scaling-squares-spinner * {
  box-sizing: border-box;
}

.scaling-squares-spinner {
  height: 65px;
  width: 65px;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  animation: scaling-squares-animation 1250ms;
  animation-iteration-count: infinite;
  transform: rotate(0deg);
}

.scaling-squares-spinner .square {
  height: calc(65px * 0.25 / 1.3);
  width: calc(65px * 0.25 / 1.3);
  margin-right: auto;
  margin-left: auto;
  border: calc(65px * 0.04 / 1.3) solid #ff1d5e;
  position: absolute;
  animation-duration: 1250ms;
  animation-iteration-count: infinite;
}

.scaling-squares-spinner .square:nth-child(1) {
  animation-name: scaling-squares-spinner-animation-child-1;
}

.scaling-squares-spinner .square:nth-child(2) {
  animation-name: scaling-squares-spinner-animation-child-2;
}

.scaling-squares-spinner .square:nth-child(3) {
  animation-name: scaling-squares-spinner-animation-child-3;
}

.scaling-squares-spinner .square:nth-child(4) {
  animation-name: scaling-squares-spinner-animation-child-4;
}

@keyframes scaling-squares-animation {
  50% {
    transform: rotate(90deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

@keyframes scaling-squares-spinner-animation-child-1 {
  50% {
    transform: translate(150%, 150%) scale(2, 2);
  }
}

@keyframes scaling-squares-spinner-animation-child-2 {
  50% {
    transform: translate(-150%, 150%) scale(2, 2);
  }
}

@keyframes scaling-squares-spinner-animation-child-3 {
  50% {
    transform: translate(-150%, -150%) scale(2, 2);
  }
}

@keyframes scaling-squares-spinner-animation-child-4 {
  50% {
    transform: translate(150%, -150%) scale(2, 2);
  }
}
</style>
