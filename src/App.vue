<template>
  <BackGround></BackGround>
  <SideBar></SideBar>
  <div class="main" ref="main">
    <TopBar> </TopBar>
    <div class="routerview">
      <router-view class="router-view" v-slot="{ Component }">
        <transition name="page-opacity">
          <KeepAlive>
            <component :is="Component" />
          </KeepAlive>
        </transition>
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
  margin-top: 50px;
}
.page-opacity-enter,
.page-opacity-leave-to {
  opacity: 0;
}

.page-opacity-leave,
.page-opacity-enter-to {
  opacity: 1;
}

.page-opacity-enter-active,
.page-opacity-leave-active {
  transition: opacity 300ms;
}
</style>
<style>
body {
  background-color: rgb(255, 255, 255);
}
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #212121;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(190, 190, 190);
}
</style>
