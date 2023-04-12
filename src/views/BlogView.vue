// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="container-fluid w-100 grid grid-cols-12">
    <div
      class="hidden sm:grid sm:col-span-1 md:col-span-2 lg:col-span-3 sidenav"
    >
      aa
    </div>
    <div class="col-span-12 sm:col-span-10 md:col-span-8 lg:col-span-6">
      <section v-for="(data, index) in datas">
        <div class="max-h-(screen-h-50) background rounded-lg mt-5">
          <!-- Info Top section -->
          <div class="-200 p-4">
            <span class="text-white"
              >Posted on April 1st, 2023 by John Doe</span
            >
          </div>
          <!-- Author section -->
          <div class="flex p-4 w-full">
            <div class="flex items-center w-6/12">
              <img
                class="w-12 h-12 rounded-full mr-4"
                src="../assets/jupiter.jpg"
                alt="Author Photo"
              />
              <div>
                <h2 class="text-lg font-semibold text-gray-100">John Doe</h2>
                <p class="text-gray-300 justify-self-end">
                  Author of this article
                </p>
              </div>
            </div>
            <div class="h-full text-slate-100 w-6/12 text-xs">
              <div class="flex flex-wrap justify-end">
                <div
                  v-for="(tag, index) in data.tags"
                  class="mr-2 mt-1"
                  style="height: fit-content; width: fit-content"
                >
                  <a href="#" target="_blank"
                    ><div class="tag-box p-1 h-fit flex items-center">
                      {{ tag }}
                    </div></a
                  >
                </div>
              </div>
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
            <h3 class="text-2xl font-semibold text-white">
              {{ data.title }}
            </h3>
          </div>

          <!-- Preview section -->
          <div
            class="px-4 text-gray-100 overflow-hidden transition-all duration-200 ease-in-out"
            ref="container"
          >
            <div
              ref="longabbr"
              :hidden="data.showmore != true"
              v-html="'<p>' + data.longabbr + '</p>'"
            ></div>
            <div
              ref="abbr"
              :hidden="data.showmore == true"
              v-html="data.abbr + '...'"
            ></div>
          </div>
          <div
            v-if="data.showmore == true"
            class="font-bold pl-4 show-more"
            @click="showless(index)"
          >
            Show Less
          </div>
          <div v-else class="font-bold pl-4 show-more" @click="showmore(index)">
            Show More
          </div>
          <div id="container" class="mt-2">
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
                <button class="mr-2 button">
                  <i
                    class="fa-solid fa-thumbs-up fa-lg ease duration-300 text-gray-400 hover:text-white"
                  ></i>
                </button>
                <button class="mr-2 button">
                  <i
                    class="fa-solid fa-thumbs-down fa-lg ease duration-300 text-gray-400 hover:text-white"
                  ></i>
                </button>
                <button class="button">
                  <i
                    class="fa-solid fa-comments fa-lg ease duration-300 text-gray-400 hover:text-white"
                  ></i>
                </button>
              </div>
              <div>
                <button>
                  <i
                    class="fa-sharp fa-light fa-share fa-lg ease duration-300 text-gray-400 hover:text-white"
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
    <div
      class="hidden sm:grid sm:col-span-1 md:col-span-2 lg:col-span-3 sidenav"
    ></div>
  </div>
</template>
<script>
import { OrbitSpinner } from "epic-spinners";
import axios from "axios";
import { ref, onMounted, watch } from "vue";
import "../assets/learnmore.scss";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "BlogView",
  components: {
    OrbitSpinner,
  },
  data() {
    return {
      datas: [],
      dataLoading: true,
      text: null,
      text2: null,
      dpg: 2,
      page: 0,
      intersecting: false,
    };
  },
  watch: {
    intersecting(to, from) {
      if (to == true) {
        this.fetch();
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.observer);
    this.fetch();
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.observer);
  },
  methods: {
    observer() {
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
        this.intersecting = true;
      } else {
        this.intersecting = false;
      }
    },
    showmore(index) {
      this.datas[index].showmore = true;
    },
    showless(index) {
      this.datas[index].showmore = false;
    },
    fetch() {
      this.dataLoading = true;
      axios
        .get("http://localhost:3333/articleget", {
          params: {
            p: this.page,
            dataPerPage: this.dpg,
          },
        })
        .then((response) => {
          const responses = response.data;
          if (response.data.length > 0) {
            this.page++;
          }
          responses.forEach((res) => {
            this.datas.push(res);
          });
          this.datas.forEach((data) => {
            data.longabbr = data.content.split("<p>")[1].split("</p>")[0];
            const array = data.content.split(" ").slice(0, 26);
            const string = array.join(" ");
            data.abbr = string;
          });
          document.querySelectorAll("h1").forEach((t) => {
            t.classList.add("text-2xl", "font-bold");
          });
          this.dataLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.button {
  width: 40px;
}
.tag-box {
  border-radius: 5px;
  height: fit-content;
  background-color: crimson;
  cursor: pointer;
}
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
  height: 50px;
}
</style>
