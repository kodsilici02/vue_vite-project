<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <BgQuote></BgQuote>
  <div class="container-fluid w-100 grid grid-cols-12 bg">
    <div
      v-motion-slide-visible-bottom
      class="col-span-12 page-header text-7xl flex justify-center items-center text-white"
    >
      Home Page
    </div>
    <div class="container-fluid col-span-12 grid grid-cols-12 m-5 gap-4">
      <div v-motion-slide-visible-left class="col-span-5 grid side-cont"></div>
      <div class="col-span-7 grid grid-cols-12 gap-4">
        <div v-motion-slide-visible-right class="col-span-12 side-banner"></div>
        <div v-motion-slide-visible-bottom class="col-span-12 left-cont"></div>
      </div>
    </div>
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
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    handleScroll() {
      if (window.scrollY == 0) {
        this.$emit("topbarhide", true);
      } else {
        this.$emit("topbarhide", false);
      }
    },
  },
};
</script>

<style scoped>
.left-cont {
  height: 80vh;
  background-color: rgb(13, 174, 82);
  border-radius: 10px;
}
.side-banner {
  height: 20vh;
  background-color: rgb(194, 33, 33);
  border-radius: 10px;
}
.side-cont {
  height: 100vh;
  background-color: aqua;
  border-radius: 10px;
}
.box {
  height: 100vh;
  width: 100%;
}
.page-header {
  font-weight: bold;
}
</style>
