<template>
  <cf-container class="cf-interview-wizard">
    <template #title>
      {{ currentStep.name }}
    </template>
    <template #default>
      <div class="cf-interview-wizard__step">
        <div class="flex flex-wrap">
          <div
              class="cf-interview-wizard__step__tile transition hover:text-blue-800 hover:border-blue-800 cursor-pointer flex flex-1 flex-col items-center border border-solid border-gray-300 px-4 py-4 mx-2 my-2"
              :class="{'border-blue-800': selectedVariantIndex === variantIndex}"
              v-for="(variant, variantIndex) in currentStep.variants"
              :key="variantIndex"
              @click="chooseVariant(variant, variantIndex)"
          >
            <div class="cf-interview-wizard__step__tile--title text-lg text-center leading-4 font-semibold">
              {{ variant.name }}
            </div>
            <div class="cf-interview-wizard__step__tile--description text-sm mt-4" v-if="variant.description">
              {{ variant.description }}
            </div>
            <va-icon size="6rem" :name="variant.icon"/>
          </div>
        </div>

        <div class="flex justify-between mt-4">
          <va-button color="info" class="flex-none ml-2" @click="goToPreviousStep">
            Previous step
          </va-button>
          <va-button color="info" class="flex-none mr-2" @click="goToNextStep">
            Next step
          </va-button>
        </div>
      </div>

    </template>
  </cf-container>
</template>

<script lang="ts">
import { ref } from 'vue'
import CfContainer from '@/components/layout/CfContainer.vue'
import CfDashboardCard from '@/components/CfDashboardCard.vue'
import Interview, {
  InterviewType,
  iterviewTypesIterator,
  CandidateLevel,
  CandidateLevelIterator,
} from '@/api/Event/Interview/Interview'

enum InstantInterviewSteps {
  Type = 'Type',
  CandidateLevel = 'Candidate level',
  Template = 'Template'
}

export default {
  name: 'CfInterviewWizard',
  components: { CfDashboardCard, CfContainer },
  setup () {
    const interview = ref(new Interview())
    const showModal = ref(true)
    const steps: Array<Record<string, unknown>> = [
      {
        name: InstantInterviewSteps.Type,
        variants: [...iterviewTypesIterator],
      },
      {
        name: InstantInterviewSteps.CandidateLevel,
        variants: [...CandidateLevelIterator],
      },
      {
        name: InstantInterviewSteps.Template,
        variants: [],
      },
    ]
    const currentStep: any = ref(steps[0])

    const goToNextStep = () => {
      const currentStepIndex = steps.findIndex(step => step.name === currentStep.value.name)
      if (steps.length - 1 === currentStepIndex) {
        return
      }
      currentStep.value = steps[currentStepIndex + 1]
    }

    const goToPreviousStep = () => {
      const currentStepIndex = steps.findIndex(step => step.name === currentStep.value.name)
      if (currentStepIndex === 0) {
        return
      }
      currentStep.value = steps[currentStepIndex - 1]
    }

    const chooseVariant = (variant: any, index: number) => {
      selectedVariantIndex.value = index
      switch (currentStep.value.name) {
        case InstantInterviewSteps.Type:
          interview.value.type = variant.value
          break
        case InstantInterviewSteps.CandidateLevel:
          interview.value.candidate_level = variant.value
          break
        case InstantInterviewSteps.Template:
          interview.value.type = variant.name
          break
      }
    }

    const selectedVariantIndex = ref(-1)
    return {
      interview,
      steps,
      currentStep,
      showModal,
      goToNextStep,
      goToPreviousStep,
      chooseVariant,
      selectedVariantIndex,
    }
  },

}
</script>

<style lang="scss">
.cf-interview-wizard {
  &__step {

    &__tile {
    }
  }

  .va-card__title {
    justify-content: center;
  }
}
</style>
