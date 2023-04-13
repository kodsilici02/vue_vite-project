// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="container-fluid w-100 grid grid-cols-12">
    <div
      class="hidden sm:grid sm:col-span-1 md:col-span-2 lg:col-span-3 p-2 mr-2 sidenav text-white"
      style="background-color: rgb(24, 24, 24)"
    >
      <TagRoutes @clicked="clicked"></TagRoutes>
    </div>
    <div class="col-span-12 sm:col-span-10 md:col-span-8 lg:col-span-6">
      <router-view
        class="router-view"
        :intersecting="intersecting"
        v-slot="{ Component }"
      >
        <component :is="Component" />
      </router-view>
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
import TagRoutes from "../components/TagRoutes.vue";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "BlogView",
  components: {
    OrbitSpinner,
    TagRoutes,
  },
  data() {
    return {
      dataLoading: true,
      intersecting: false,
    };
  },

  mounted() {
    window.addEventListener("scroll", this.observer);
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
  },
};
</script>
<style scoped>
.sidenav {
  height: 100h;
  max-height: calc(100vh - 50px);
  position: sticky;
  top: 50px;
  left: 0;
}
</style>
