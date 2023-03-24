<template>
  <div class="container-fluid w-100 grid grid-cols-12">
    <div class="hidden sm:grid sm:col-span-3 sidenav">aa</div>
    <div class="col-span-12 sm:col-span-6 box">
      <div class="text-3xl">{{ data.title }}</div>

      <div v-for="(paragraph, index2) in sections">
        <div v-html="paragraph.title"></div>
        <template v-for="(paragraph, index2) in paragraph.content">
          <p v-if="paragraph">{{ paragraph }}</p>
          <br v-else />
        </template>
      </div>
    </div>

    <div class="hidden sm:grid sm:col-span-3 sidenav">aa</div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
export default {
  name: "BlogDetail",
  data() {
    return {};
  },
  props: {
    id: { type: String, required: true },
  },
  setup(props) {
    const data = ref({});
    const sections = ref([]);
    axios
      .get("http://localhost:3333/dumbs/blogget/" + props.id)
      .then((response) => {
        data.value = response.data;
        data.value.sections.forEach((el) => {
          sections.value.push({
            id: sections.value.length,
            title: el.title.replace(/ /g, "&nbsp;"),
            content: el.content.split("\n"),
          });
        });
        console.log(sections.value);
      })
      .catch((error) => {
        console.log(error);
      });

    return { data, sections };
  },

  methods: {
    click() {
      console.log(this.sections);
    },
  },
};
</script>

<style scoped>
.box {
  height: 100vh;
  background-color: aliceblue;
}
</style>
