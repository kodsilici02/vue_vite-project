<template>
  <div @click="metod">BlogView</div>
</template>

<script>
import axios from "axios";
export default {
  name: "BlogView",
  data() {
    return {
      datas: [],
      sections: [],
    };
  },
  methods: {
    metod() {
      axios
        .get("http://localhost:3333/dumbs/blogget")
        .then((response) => {
          this.datas = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.datas.forEach((element) => {
        const sections = element.sections;
        sections.forEach((section) => {
          console.log(section.title);
        });
      });
    },
  },
};
</script>

<style scoped></style>
