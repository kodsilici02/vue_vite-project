<template>
  <div class="container-fluid w-100 grid grid-cols-12">
    <div class="hidden sm:grid sm:col-span-2 sidenav">aa</div>
    <div class="col-span-8 box3">
      <div class="image-frame">
        <img class="image" :src="data.imageUrl" />
      </div>
      <div class="content" v-html="data.content"></div>
    </div>

    <div class="hidden sm:grid sm:col-span-2 sidenav">aa</div>
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
    axios
      .get("http://localhost:3333/articleget/" + props.id)
      .then((response) => {
        data.value = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    return { data };
  },

  methods: {},
};
</script>

<style scoped>
.sidenav {
  color: aliceblue;
  background-color: rgb(24, 24, 24);
  position: sticky;
  height: 100vh;
  max-height: calc(100vh - 50px);
  top: 50px;
  right: 0;
  margin-left: 5px;
  overflow-y: scroll;
}
.image {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.image-frame {
  width: 100%;
  height: 80vh;
  padding: 10px;
  background-color: rgb(24, 24, 24);
}
.box3 {
  height: auto;
  background-color: rgb(24, 24, 24);
  color: aliceblue;
}
</style>
