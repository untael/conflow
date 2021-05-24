<template>
  <!--  <va-card style="width: 400px;">-->
  <!--    <va-card-title>Title</va-card-title>-->
  <!--    <va-card-content>-->
  <va-input v-model="eventName" label="test" placeholder="Event name"/>

  <!--  <va-card style="width: 400px; height: 200px;">-->
  <!--    <va-card-title>Title</va-card-title>-->
  <!--    <va-card-content/>-->
  <!--  </va-card>-->

  <!--  <va-button>-->
  <!--    bajlkdsjflka-->
  <!--  </va-button>-->
  <!--    </va-card-content>-->
  <!--  </va-card>-->
</template>

<script lang="ts">
import { Vue, Options, setup } from 'vue-class-component'
import { useInterview } from '@/api/Event/Interview/composables/interview'

@Options({
  name: 'InterviewDisplayPage',
})
export default class InterviewDisplayPage extends Vue {
  setupData = setup(() => {
    return {
      ...useInterview(),
    }
  })

  eventName = ''

  async created () {
    this.setupData.interview = await this.setupData.getInterview(this.$route.params.id)
  }
}

</script>


