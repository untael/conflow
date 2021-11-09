<template >
  <va-collapse v-model="value" :header="description" solid>
    <template v-slot:header>
      <div class="va-collapse__header__content">
        <!--v-if-->
        <div
          class="va-collapse__header__text d-flex justify-between items-center"
        >
          <span class="text-lg font-bold">{{ description }}</span>

          <va-badge :text="language" color="success" />
        </div>
        <i
          class="
            va-collapse__header__icon
            va-icon
            material-icons
            va-collapse__header__icon
          "
          aria-hidden="true"
          notranslate=""
          style="color: rgb(0, 0, 0); font-size: 24px"
          >expand_more</i
        >
      </div>
    </template>
    <div class="py-2 px-2 text-sm">
      {{ questionDescription }}
      <hr />

      <div class="d-flex justify-end">
        <va-button
          v-if="!start"
          @click="startQ"
          color="info"
          size="small"
          class="mr-4"
        >
          Start
        </va-button>
        <va-button
          v-if="start && !end"
          @click="endQ"
          color="warning"
          size="small"
          class="mr-4"
          >End</va-button
        >
      </div>
      <div class="d-flex justify-between text-sm">
        <span v-if="duration">{{
          ` Time spent: ${Math.round(duration / 60000)} min ${Math.round(
            (duration % 60000) / 1000
          )} s`
        }}</span>
        <span v-if="end" class="d-flex justify-end items-center"
          >Mark: <va-rating v-model="mark"
        /></span>
      </div>
      <hr />
      <va-chip
        v-for="(tag, index) in tags"
        :key="index"
        color="#000000"
        size="small"
        class="mr-2 mt-1"
        square
        outline
      >
        {{ tag.value }}
      </va-chip>
    </div>
    <link rel="stylesheet" href="style.css" />
  </va-collapse>
</template>

<script>
export default {
  data() {
    return {
      value: false,
      mark: 3,
      language: "JS",
      description: "Lorem ipsum dolor, sit amet consectetur...",
      questionDescription:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil, consectetur! Asperiores excepturi, fugiat sed tempora impedit facere consequuntur labore eligendi",
      tags: [
        { color: "gray", value: "fundamentals" },
        { color: "gray", value: "difficult" },
        { color: "gray", value: "arrays" },
        { color: "gray", value: "fetch" },
        { color: "gray", value: "objects" },
      ],
      start: 0,
      end: 0,
      duration: 0,
    };
  },
  methods: {
    startQ() {
      this.start = new Date();
    },
    endQ() {
      this.end = new Date();

      this.duration = this.end - this.start;
    },
  },
};
</script>

<style scoped>
hr {
  margin: 10px 0px;
}
</style>
