<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="grid grid-cols-12">
    <div class="box col-span-3"></div>
    <div class="col-span-6 form">
      <table class="w-100">
        <thead>
          <tr>
            <th class="">Title</th>
            <th class="">Content</th>
            <th class="">ID</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center" v-for="data in datas">
            <td class="height">{{ data.title }}</td>
            <td class="">{{ data.content }}</td>
            <td class="">{{ data._id }}</td>
            <td class="">
              <v-btn class="show-more" @click="button(data._id)" elevation="2"
                >Delete</v-btn
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="box col-span-3"></div>
  </div>
</template>
<script>
import axios from "axios";
import { ref } from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "FormView",
  data() {
    return {};
  },
  mounted() {},
  setup() {
    const datas = ref([]);
    axios
      .get("http://localhost:3333/dumbs")
      .then((response) => {
        datas.value = response.data;
        console.log(datas.value);
      })
      .catch((error) => {
        console.log(error);
      });
    return { datas };
  },
  methods: {
    button(id) {
      console.log(id);
      axios
        .delete("http://localhost:3333/dumbs/delete/" + id)
        .then((response) => {
          axios.get("http://localhost:3333/dumbs").then((response) => {
            this.datas = response.data;
          });
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.height {
  height: 100px;
  white-space: pre;
}
.button {
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  cursor: pointer;
  margin-bottom: 5px;
}
.form {
  width: 100%;
  height: 200vh;
  background-color: rgb(26, 26, 26);
  color: aliceblue;
}
.box2 {
  background-color: aqua;
  height: 200vh;
}
.box {
  position: sticky;
  top: 50px;
  height: 100vh;
  background-color: rgb(24, 24, 24);
}
</style>
