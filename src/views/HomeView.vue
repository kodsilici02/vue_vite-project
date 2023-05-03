<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="w-full">
    <BgQuote></BgQuote>
    <div class="grid grid-cols-12">
      <div
        v-motion-slide-visible-bottom
        class="col-span-12 page-header text-3xl flex sm:text-4xl justify-center items-center text-white"
      >
        <div
          id="g_id_onload"
          data-client_id="365223869262-p1uq5kjftdg6nem3b18o3p93bmmlhul8.apps.googleusercontent.com"
          data-context="signin"
          data-ux_mode="redirect"
          data-login_uri="http://localhost:5173"
          data-callback="handleoauth"
          data-auto_select="true"
          data-itp_support="true"
        ></div>

        <div
          class="g_id_signin"
          data-type="standard"
          data-shape="pill"
          data-theme="outline"
          data-text="signin_with"
          data-size="large"
          data-logo_alignment="left"
        ></div>
        Home Page
      </div>
      <div class="col-span-12 grid grid-cols-12 m-5 gap-4 overflow-hidden">
        <div
          v-motion-slide-visible-left
          class="col-span-12 sm:col-span-5 grid side-cont"
        ></div>
        <div class="col-span-12 sm:col-span-7 grid grid-cols-12 gap-4">
          <div
            v-motion-slide-visible-bottom
            class="col-span-12 side-banner"
          ></div>
          <div v-motion-slide-visible-right class="col-span-12 left-cont"></div>
        </div>
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
    //window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    // window.removeEventListener("scroll", this.handleScroll);
    // this.$emit("topbarshow");
  },

  methods: {
    /*handleScroll() {
      if (window.scrollY == 0) {
        this.$emit("topbarhide", true);
      } else {
        this.$emit("topbarhide", false);
      }
    },*/
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
