<template>
  <div>
    <div class="sidebar-space hidden" ref="hidden" @click="toggleState()"></div>
    <div class="sidebar sidebar_close w-full sm:w-1/5" ref="sidebar">
      <v-container>
        <v-row>
          <v-col cols="12" class="d-flex justify-end">
            <div class="button" @click="toggleState()">
              <i class="fa-solid fa-xmark fa-2x"></i>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { watch } from "vue";
import { sidebarstate } from "./store.js";
export default {
  name: "SideBar",
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
  },
};
</script>

<style scoped>
.button {
  cursor: pointer;
}
.sidebar {
  color: aliceblue;

  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgb(18, 18, 18);
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
