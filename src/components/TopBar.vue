<template>
  <div class="topbar grid grid-cols-12" theme="dark" ref="topbar">
    <div class="col-span-2 flex items-center justify-items-center">
      <div class="button text-xl" @click="sidebar()">
        <i class="fa-solid fa-bars"></i>
      </div>
    </div>
    <div class="text-center h-full flex items-center col-span-8">
      <div class="flex justify-center items-center w-full">
        <div v-for="(item, link) in links">
          <div v-if="item.topbar" class="text-center">
            <RouterLink
              :to="{ name: item.name }"
              class="mx-1 link text-xs sm:text-base"
              :key="link"
            >
              {{ item.title }}</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex justify-end items-center col-span-2 h-full gap-3 text-slate-50 mr-5"
    >
      <a
        class="h-full flex items-center"
        href="https://discord.gg/4B45j7bWqn"
        target="_blank"
        ><i class="fa-brands fa-discord fa-sm sm:fa-xl icons"></i
      ></a>
      <a
        class="h-full flex items-center icons"
        href="https://github.com/kodsilici02"
        target="_blank"
        ><i class="fa-brands fa-github fa-sm sm:fa-xl"></i
      ></a>
      <a
        class="h-full flex items-center icons"
        href="https://twitter.com/Yazilim_Panteri"
        target="_blank"
        ><i class="fa-brands fa-twitter fa-sm sm:fa-xl"></i
      ></a>
    </div>
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
    // window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    //  window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    /* handleScroll() {
      if (window.scrollY == 0) {
        this.$refs.topbar.classList.add("hidden");
      } else {
        this.$refs.topbar.classList.remove("hidden");
      }
      this.scrollTop = window.scrollY;
      let element = this.$refs.topbar;
      element.style.opacity = Math.min(this.scrollTop / 600, 1);
    },*/
    sidebar() {
      sidebarstate.state = 1;
    },
  },
};
</script>

<style scoped>
.icons {
  color: rgb(133, 133, 133);
  transition: all 0.2s ease-in-out;
}
.icons:hover {
  color: rgb(220, 220, 220);
}
.hidden {
  display: none;
}
.button {
  cursor: pointer;
  position: absolute;
  left: 10px;
  z-index: 9;
  color: aliceblue;
}
.topbar {
  width: 100%;
  height: 50px;
  background-color: #212121;
  box-shadow: 0 3px 0px 0px rgb(28, 27, 27);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  opacity: 1;
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
