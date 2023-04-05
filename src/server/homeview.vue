<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <BgQuote></BgQuote>
  <div class="container-fluid w-100 grid grid-cols-12 bg">
    <main class="col-span-12 sm:col-span-10 sm:col-start-3 grid grid-cols-10">
      <article class="col-span-10 sm:col-span-8" v-motion-slide-visible-bottom>
        <h1 class="text-3xl sm:text-5xl" v-motion-slide-visible-bottom>
          My Article
        </h1>
        <section
          v-motion-slide-visible-left
          v-for="data in datas"
          :key="data._id"
        >
          <div :ref="data._id" :accesskey="data._id" style="height: 50px"></div>
          <div class="kutu">
            <div class="image-frame">
              <img class="image" src="../assets/jupiter.jpg" />
            </div>
            <div class="title">
              <h2 class="ml-4 text-4xl font-bold">{{ data.title }}</h2>
            </div>
            <div class="content-preview">
              {{ data.content }}
            </div>
            <v-btn class="show-more" @click="ref" elevation="2"
              >Show More</v-btn
            >
          </div>
        </section>
      </article>
      <aside
        id="aside"
        class="col-span-2 hidden sm:block"
        v-motion-slide-visible-bottom
      >
        <div
          class="d-flex justify-content-center"
          v-for="data in datas"
          :key="data._id"
        >
          <h2
            class="text-3xl sm:text-2xl md:text-3xl font-bold"
            :accesskey="data._id"
            :class="{ active: isActive(data) }"
            @click="scrollToContent(data)"
          >
            {{ data.title }}
          </h2>
        </div>
      </aside>
    </main>
  </div>
</template>
<script>
import axios from "axios";
import BgQuote from "../components/BgQuote.vue";
import { ref, onMounted } from "vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "HomeView",
  components: {
    BgQuote,
  },
  data() {
    return {
      activeTitle: null,
    };
  },
  setup() {
    const datas = ref([]);
    axios
      .get("http://127.0.0.1:3333/dumbs")
      .then((response) => {
        datas.value = response.data;
      })
      .catch((error) => {
        console.log(error);
      });

    return { datas };
  },
  watch: {
    datas: {
      async handler(newVal) {
        if (newVal) {
          for (const elem of newVal) {
            await this.$nextTick();
            const el = this.$refs[elem._id][0];
            if (el) {
              let options = {
                root: null,
                rootMargin: "0px 0px -60% 0px",
                threshold: 0.5,
              };
              let callback = (entries) => {
                entries.forEach((entry) => {
                  if (entry.isIntersecting) {
                    this.activeTitle = entry.target.accessKey;
                  }
                });
              };
              let observer = new IntersectionObserver(callback, options);
              this.datas.forEach((elem) => {
                observer.observe(this.$refs[elem._id][0]);
              });
            }
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    isActive(data) {
      // Check if the given title is the active title
      return this.activeTitle == data._id;
    },
    ref() {
      console.log(this.activeTitle);
    },
    scrollToContent(data) {
      // Get the element for the given title
      const element = this.$refs[data._id][0];
      // Scroll the page to the element
      element.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.show-more {
  margin-left: 10px;
  border-radius: 10px;
  font-weight: bold;
  color: rgb(24, 24, 24);
  background-color: aliceblue;
}
.content-preview {
  font-size: 20px;
  font-weight: 400;
  width: 100%;
  height: 40%;
  padding: 15px;
}
.image {
  object-fit: contain;
  max-height: 100%;
  width: 100%;
}
.image-frame {
  width: 100%;
  height: 50%;
  padding: 10px;
  background-color: rgb(24, 24, 24);
}
aside h2 {
  text-decoration: none;
  color: rgb(126, 126, 126);
  transition: 0.1s linear;
}
aside h2:hover {
  color: rgb(255, 255, 255);
  transition: 0.2s linear;
}
aside h2 {
  cursor: pointer;
}
aside h2.active {
  color: rgb(52, 215, 120);
}

article {
  margin-bottom: 300px;
}

aside {
  padding-left: 1em;
  position: sticky;
  max-height: calc(100vh - 50px);
  top: 50px;
}
h1 {
  font-weight: bold;
  text-align: center;
  color: #e3e3e3;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h2 {
  color: #e3e3e3;
}
.kutu {
  height: 100vh;
  max-height: calc(100vh - 50px);
  width: 100%;
  color: #e3e3e3;
  background-color: rgb(24, 24, 24);
  border-bottom: 1px solid black;
}
.bos {
  width: 100%;
  height: 135px;
}
</style>
