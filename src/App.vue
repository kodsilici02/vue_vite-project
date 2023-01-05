<template>
  <BackGround></BackGround>
  <SideBar></SideBar>
  <div class="main" ref="main">
    <TopBar></TopBar>
    <div class="routerview">
      <router-view class="router-view" v-slot="{ Component }">
        <Transition name="page-opacity" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import { watch } from "vue";
import { sidebarstate } from "./components/store.js";
import BackGround from "./components/BackGround.vue";
import TopBar from "./components/TopBar.vue";
import SideBar from "./components/SideBar.vue";
export default {
  name: "App",
  components: {
    SideBar,
    TopBar,
    BackGround,
  },
  data() {
    return {
      sidebarstate,
    };
  },
  mounted() {
    watch(
      () => sidebarstate.state,
      (newValue) => {
        if (newValue === 1) {
          this.$refs.main.classList.add("opacity");
        } else if (newValue === 0) {
          this.$refs.main.classList.remove("opacity");
        }
      }
    );
  },
};
</script>
<style scoped>
.opacity {
  opacity: 0.5;
}
.main {
  transition: 0.5s all ease;
}
.routerview {
  z-index: 1;
  margin-top: 60px;
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
</style>
<style>
body {
  background-color: rgb(255, 255, 255);
}
</style>
