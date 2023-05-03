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
      <router-view class="router-view" v-slot="{ Component }">
        <component
          @loading="deneme"
          :intersecting="intersecting"
          :is="Component"
        />
      </router-view>
      <div v-if="dataLoading" class="w-full flex justify-center mt-5 mb-0">
        <OrbitSpinner
          :size="55"
          :animation-duration="1200"
          color="#ff1d5e"
        ></OrbitSpinner>
      </div>
      <div class="h-2"></div>
    </div>
    <div
      class="hidden sm:grid sm:col-span-1 md:col-span-2 lg:col-span-3 sidenav"
    ></div>
  </div>
</template>
<script setup>
import { OrbitSpinner } from "epic-spinners";
import axios from "axios";
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import "../assets/learnmore.scss";
import TagRoutes from "../components/TagRoutes.vue";

var dataLoading = ref(true);
const intersecting = ref(false);

const deneme = (event) => {
  dataLoading.value = event;
};

const observer = () => {
  if (window.scrollY + window.innerHeight >= document.body.scrollHeight) {
    intersecting.value = true;
  } else {
    intersecting.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", observer);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", observer);
});
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
