// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="container-fluid w-100 grid grid-cols-12">
    <div class="hidden sm:grid sm:col-span-3 sidenav">aa</div>
    <div class="col-span-12 sm:col-span-6">
      <section
        v-motion-slide-visible-left
        v-for="(title, index) in titles"
        :key="index"
      >
        <div class="kutu">
          <div class="info-top">{{ index }}</div>
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
    </div>
    <div class="hidden sm:grid sm:col-span-3 sidenav">aa</div>
  </div>
</template>
<script>
import axios from "axios";
import { ref, onMounted } from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "BlogView",
  data() {
    return {
      datas: [],
      contents: [],
      titles: [],
      text: null,
      text2: null,
    };
  },
  mounted() {
    axios
      .get("http://localhost:3333/dumbs/blogget")
      .then((response) => {
        this.datas = response.data;
        this.datas.forEach((d) => {
          this.titles.push({
            id: d._id,
            title: d.title,
          });
          console.log(this.titles);
          d.sections.forEach((el) => {
            this.contents.push({
              id: this.contents.length,
              title: el.title.replace(/ /g, "&nbsp;"),
              content: el.content.split("\n"),
            });
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
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
  max-height: calc(100vh - 60px);
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
  max-height: calc(100vh - 60px);
  height: 100vh;
  top: 60px;
}
</style>
