// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="container-fluid w-100 grid grid-cols-12">
    <div class="hidden sm:grid sm:col-span-3 sidenav">aa</div>
    <div class="col-span-12 sm:col-span-6">
      <section v-for="data in datas">
        <div class="max-h-(screen-h-50) background rounded-lg mt-5">
          <!-- Info Top section -->
          <div class="-200 p-4">
            <span class="text-white"
              >Posted on April 1st, 2023 by John Doe</span
            >
          </div>
          <!-- Author section -->
          <div class="flex items-center p-4">
            <img
              class="w-12 h-12 rounded-full mr-4"
              src="../assets/jupiter.jpg"
              alt="Author Photo"
            />
            <div>
              <h2 class="text-lg font-semibold text-gray-100">John Doe</h2>
              <p class="text-gray-300">Author of this article</p>
            </div>
          </div>
          <!-- Image section -->
          <div class="h-80 md:h-96">
            <img
              class="h-full w-full object-cover object-center rounded-lg"
              :src="data.imageUrl"
              alt="Main Image"
            />
          </div>
          <!-- Title section -->
          <div class="pl-4 pr-4">
            <h3 class="text-2xl font-semibold text-white">{{ data.title }}</h3>
          </div>

          <!-- Preview section -->
          <div
            class="pl-4 pr-4 text-gray-100"
            v-html="data.content + '...'"
          ></div>
          <div class="font-bold pl-4 show-more" @click="click">Show More</div>
          <div id="container">
            <button class="learn-more">
              <span class="circle flex items-center" aria-hidden="true">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text flex items-center ml-8">
                <router-link
                  :to="{
                    name: 'blogDetail',
                    params: {
                      title: data.title.replace(/ /g, '-'),
                    },
                    query: {
                      id: data._id,
                    },
                  }"
                >
                  Learn More
                </router-link></span
              >
            </button>
          </div>

          <!-- Footer section -->
          <div class="pr-4 pl-4 py-2">
            <div class="flex justify-between items-center">
              <div>
                <button class="text-gray-100 mr-2">Like</button>
                <button class="text-gray-100 mr-2">Dislike</button>
                <button class="text-gray-100">Comment</button>
              </div>
              <div>
                <button class="text-gray-400">
                  <i
                    class="fa-sharp fa-light fa-share fa-lg ease duration-300 hover:text-white"
                  ></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div v-if="dataLoading" class="w-full flex justify-center mt-5">
        <OrbitSpinner
          :size="55"
          :animation-duration="1200"
          color="#ff1d5e"
        ></OrbitSpinner>
      </div>
    </div>
    <div class="hidden sm:grid sm:col-span-3 sidenav"></div>
    <div class="w-full page-footer" ref="intersection"></div>
  </div>
</template>
<script>
import { OrbitSpinner } from "epic-spinners";
import axios from "axios";
import { ref, onMounted } from "vue";
import "../assets/learnmore.scss";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "BlogView",
  components: {
    OrbitSpinner,
  },
  data() {
    return {
      selectedFile: null,
      abbreviations: [],
      datas: [],
      dataLoading: true,
      text: null,
      text2: null,
      page: 0,
      dataPerPage: 10,
    };
  },
  mounted() {
    this.fetch();
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    let observer = new IntersectionObserver(this.fetch, options);
    observer.observe(this.$refs.intersection);
    this.fetch();
  },
  methods: {
    click() {
      console.log("click");
    },
    fetch() {
      this.dataLoading = true;
      axios
        .get("http://localhost:3333/articleget", {
          params: {
            p: this.page,
            d: this.dataPerPage,
          },
        })
        .then((response) => {
          this.datas = response.data;
          this.datas.forEach((data) => {
            const array = data.content.split(" ").slice(0, 26);
            const string = array.join(" ");
            data.content = string;
            this.dataPerPage++;
          });
          document.querySelectorAll("h1").forEach((t) => {
            t.classList.add("text-2xl", "font-bold");
          });
        });
    },
  },
};
</script>
<style scoped>
.show-more {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: aliceblue;
}
.show-more:hover {
  color: rgb(19, 106, 205);
}
.background {
  background-color: rgb(24, 24, 24);
}
.page-footer {
  height: 1px;
}
.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: 0.5s ease;
}
.page-opacity-enter-from,
.page-opacity-leave-to {
  opacity: 0;
  transform: translatey(100px);
}
/*.author {
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
.wrapper {
  margin-top: 10px;
  border-radius: 10px;
  height: 100vh;
  max-height: calc(100vh - 50px);
  width: 100%;
  color: #e3e3e3;
  background-color: rgb(24, 24, 24);
  border-bottom: 1px solid black;
}
.keep-read {
  margin-left: 10px;
  border-radius: 10px;
  height: 100%;
  font-weight: bold;
  color: rgb(24, 24, 24);
  background-color: aliceblue;
}
.content-preview {
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  height: auto;
  padding-left: 15px;
  padding-right: 15px;
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
}*/
</style>
