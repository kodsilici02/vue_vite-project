<template>
  <div class="topbar" theme="dark" ref="topbar">
    <v-container class="text-center">
      <div class="button" @click="sidebar()">
        <i class="fa-solid fa-bars fa-2x"></i>
      </div>
      <div class="flex justify-center w-full">
        <div v-for="(item, link) in links">
          <div v-if="item.topbar" class="text-center">
            <RouterLink
              :to="{ name: item.name }"
              class="mx-1 link text-2xl sm:text-3xl"
              :key="link"
            >
              {{ item.title }}</RouterLink
            >
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import items from "../router/sidebarroutes.js";
import { sidebarstate } from "./store.js";
export default {
  name: "TopBar",
  setup() {
    return {
      sidebarstate,
      scrollTop: 0,
      links: items,
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
        this.$refs.topbar.classList.add("hidden");
      } else {
        this.$refs.topbar.classList.remove("hidden");
      }
      this.scrollTop = window.scrollY;
      let element = this.$refs.topbar;
      element.style.opacity = Math.min(this.scrollTop / 600, 1);
    },
    sidebar() {
      sidebarstate.state = 1;
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}
.button {
  cursor: pointer;
  position: absolute;
  top: 15px;
  left: 10px;
  z-index: 9;
  color: aliceblue;
}
.topbar {
  width: 100%;
  height: 60px;
  background-color: #212121;
  box-shadow: 0 3px 0px 0px rgb(28, 27, 27);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  opacity: 0;
}
.link {
  font-weight: bold;
  text-decoration: none;
  color: rgb(255, 255, 255);
  transition: all 0.5s ease;
}
.link:hover {
  color: rgb(34, 209, 200);
  transition: 0.5s linear;
}
.router-link-active {
  color: rgb(6, 221, 56);
}
</style>
