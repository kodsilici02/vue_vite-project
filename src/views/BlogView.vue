// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="container-fluid w-100 grid grid-cols-12">
    <div class="hidden sm:grid sm:col-span-3 sidenav">aa</div>
    <div class="col-span-6 sm:col-span-6">
      <section v-for="(title, index) in titles" :key="index">
        <div class="kutu">
          <div class="info-top"></div>
          <div class="author"></div>
          <div class="image-frame">
            <img class="image" src="../assets/lagoon.jpg" />
          </div>
          <div class="title">
            <h2 class="ml-4 text-4xl font-bold">{{ title.title }}</h2>
          </div>
          <div class="content-preview">
            <template v-for="(paragraph, index2) in contents[index].content">
              <p v-if="paragraph">{{ paragraph }}</p>
              <br v-else />
            </template>
          </div>
          <div class="footer">
            <v-btn class="show-more" @click="ref" elevation="2">
              <router-link
                :to="{
                  name: 'blogDetail',
                  params: {
                    title: title.title.replace(/ /g, '-'),
                  },
                  query: {
                    id: title.id,
                  },
                }"
                >Show More</router-link
              ></v-btn
            >
          </div>
        </div>
      </section>
      <div class="w-full flex justify-center" v-if="loading">
        <atom-spinner
          :animation-duration="1500"
          :size="64"
          :color="'#ff1d5e'"
        />
      </div>
    </div>

    <div class="hidden sm:grid sm:col-span-3 sidenav">aa</div>
  </div>
</template>
<script>
import { AtomSpinner, FingerprintSpinner } from "epic-spinners";
import axios from "axios";
import { ref, onMounted } from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "BlogView",
  components: {
    AtomSpinner,
    FingerprintSpinner,
  },
  data() {
    return {
      loading: true,
      text: null,
      text2: null,
    };
  },
  setup() {
    const datas = ref([]);
    const contents = ref([]);
    const titles = ref([]);
    const loading = ref(true);
    setTimeout(() => {
      axios
        .get("http://127.0.0.1:3333/dumbs/blogget")
        .then((response) => {
          datas.value = response.data;
          datas.value.forEach((d) => {
            titles.value.push({
              id: d._id,
              title: d.title,
            });
            console.log(titles.value);
            d.sections.forEach((el) => {
              contents.value.push({
                id: contents.value.length,
                title: el.title.replace(/ /g, "&nbsp;"),
                content: el.content.split("\n"),
              });
            });
          });
          loading.value = false;
        })
        .catch((error) => {
          console.log(error);
        });
    }, 3000);
    return { datas, contents, titles, loading };
  },
};
</script>

<style scoped>
.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: 0.5s ease;
}
.page-opacity-enter-from,
.page-opacity-leave-to {
  opacity: 0;
  transform: translatey(100px);
}
.author {
  height: 8%;
}
.info-top {
  height: 4%;
}
.footer {
  width: 100%;
  height: 5%;
}
.title {
  height: auto;
}
.kutu {
  margin-top: 10px;
  border-radius: 10px;
  height: 100vh;
  max-height: calc(100vh - 50px);
  width: 100%;
  color: #e3e3e3;
  background-color: rgb(24, 24, 24);
  border-bottom: 1px solid black;
}
.show-more {
  margin-left: 10px;
  border-radius: 10px;
  height: 100%;
  font-weight: bold;
  color: rgb(24, 24, 24);
  background-color: aliceblue;
}
.content-preview {
  font-size: 20px;
  font-weight: 400;
  width: 100%;
  height: 40%;
  max-height: 27%;
  padding: 15px;
  overflow: hidden;
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
  height: 50%;
  padding: 10px;
  background-color: rgb(24, 24, 24);
}
.sidenav {
  padding-left: 1em;
  position: sticky;
  max-height: calc(100vh - 50px);
  height: 100vh;
  top: 50px;
}
</style>
