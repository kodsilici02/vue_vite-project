<template>
  <div>
    <div class="sidebar-space hidden" ref="hidden" @click="toggleState()"></div>
    <div
      class="sidebar sidebar_close w-full sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"
      ref="sidebar"
    >
      <v-container theme="dark">
        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <div class="button" @click="toggleState()">
              <i class="fa-solid fa-xmark fa-2x"></i>
            </div>
          </v-col>
        </v-row>
        <SidebarCont></SidebarCont>
      </v-container>
    </div>
  </div>
</template>
<script>
import SideBarCont from "./ChildComp/SidebarCont.vue";
import { useRoute } from "vue-router";
import { watch, ref } from "vue";
import { sidebarstate } from "./store.js";
import SidebarCont from "./ChildComp/SidebarCont.vue";
export default {
  name: "SideBar",
  component: {
    SideBarCont,
  },
  data() {
    return {
      sidebarstate,
      selectedGroup: "",
    };
  },
  watch: {
    selectedGroup: {
      immediate: true,
      handler(newVal) {
        this.list(newVal);
      },
    },
  },
  setup() {
    const route = useRoute();
    // You can watch the route changes
    watch(route, (newVal) => {}, { deep: true });

    return {
      route,
    };
  },
  mounted() {
    watch(
      () => sidebarstate.state,
      (newValue) => {
        if (newValue === 1) {
          this.$refs.sidebar.classList.remove("sidebar_close");
          this.$refs.hidden.classList.remove("hidden");
        } else if (newValue === 0) {
          this.$refs.sidebar.classList.add("sidebar_close");
          this.$refs.hidden.classList.add("hidden");
        }
      }
    );
  },
  methods: {
    toggleState() {
      this.sidebarstate.state = 0;
    },
    updateSelectedGroup(name) {
      if (this.selectedGroup == name) {
        this.selectedGroup = null;
      } else {
        this.selectedGroup = name;
      }
    },
    list(newVal) {
      console.log(newVal);
      const elements = document.getElementsByClassName("v-list-group");
      const array = Array.from(elements);
      array.forEach((element) => {
        if (element.getAttribute("name") != newVal) {
          element.classList.remove("a");
          console.log(element.classList);
        }
      });
    },
  },
  components: { SidebarCont },
};
</script>

<style scoped>
.a {
  color: aqua;
}
.border1-active {
  border-left: 3px solid rgb(26, 150, 221);
}
.border1 {
  border-left: 3px solid gray;
}
.button {
  cursor: pointer;
}
.sidebar {
  color: aliceblue;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #212121;
  box-shadow: 0 0px 0px 3px rgb(28, 27, 27);
  z-index: 10;
  transition: all 0.5s ease;
}
.sidebar_close {
  transform: translateX(-100%);
}
.sidebar-space {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
}
.hidden {
  display: none;
}
</style>
