<template>
  <div class="w-full">
    <BackGround></BackGround>
    <SideBar></SideBar>
    <div class="main" ref="main">
      <div ref="topbar" v-if="topbar"><TopBar></TopBar></div>
      <div class="routerview">
        <router-view class="router-view" v-slot="{ Component }">
          <transition name="vue-transition">
            <component @topbarhide="topbartoggle" :is="Component" />
          </transition>
        </router-view>
      </div>
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
      topbar: true,
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
  methods: {
    /*topbartoggle(state) {
      if (this.$route.matched[0].components.default.name == "HomeView") {
        if (state == true) {
          this.topbar = false;
        } else {
          this.topbar = true;
          this.scrollTop = window.scrollY;
          let element = this.$refs.topbar;
          element.style.opacity = Math.min(this.scrollTop / 600, 1);
        }
      } else {
        this.topbar == true;
        this.$refs.topbar.style.opacity = 1;
      }
    },*/
  },
};
</script>
<style scoped>
.vue-transition-enter,
.vue-transition-leave,
.vue-transition-leave-active {
  transition: 0.5s ease;
  opacity: 1;
}
.vue-transition-leave-to {
  opacity: 0;
  transform: translateY(100px);
}
.vue-transition-enter-active {
  transition: 1s ease;
}
.vue-transition-enter-from {
  opacity: 0;
  transform: translateY(200px);
}
.vue-transition-enter-to {
  opacity: 1;
}

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
