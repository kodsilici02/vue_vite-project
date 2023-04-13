<template>
  <div class="container-fluid"></div>
  <div v-for="(list, index) in items">
    <RouterLink v-if="!list.group" :to="{ name: list.name }">
      <div
        class="list_item grid grid-cols-12"
        v-wave
        :class="{ 'active-link': route.path == list.path }"
      >
        <div class="col-span-2 flex items-center justify-center">
          <i :class="list.icon" class="text-xl"></i>
        </div>
        <div class="col-span-10 flex items-center text-left ml-1 text-lg">
          {{ list.title }}
        </div>
      </div>
    </RouterLink>
    <div v-else>
      <div
        class="kutu list_item grid grid-cols-12"
        v-wave
        @click="kutu(list.groupindex)"
      >
        <div class="col-span-2 flex items-center justify-center">
          <i :class="list.icon" class="text-3xl"></i>
        </div>
        <div class="col-span-8 text-left ma-1 ml-4 text-2xl">
          {{ list.title }}
        </div>
        <div
          class="col-span-2 transition flex items-center justify-center"
          ref="arrow"
        >
          <i class="fa fa-chevron-down text-2xl transition"></i>
        </div>
      </div>
      <div class="kutu2" ref="kutu">
        <div ref="height">
          <RouterLink
            v-for="item in list.subItems"
            :to="{ name: item.name }"
            v-wave
          >
            <div
              class="kutu3 list_item grid grid-cols-12"
              :class="{
                'border1-active': route.path == item.path,
                border1: route.path != item.path,
                'active-link': route.path == item.path,
              }"
            >
              <div class="col-start-3 flex items-center col-span-1">
                <i
                  :class="item.icon"
                  class="text-center text-2xl transition"
                ></i>
              </div>
              <div class="col-span-8 text-left ma-1 ml-4 text-2xl">
                {{ item.title }}
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import items from "../../router/sidebarroutes.js";
import { useRoute } from "vue-router";
import { watch, ref } from "vue";
export default {
  name: "SideBarCont",
  data() {
    return {
      state: 0,
    };
  },
  setup() {
    const route = useRoute();
    // You can watch the route changes
    watch(route, (newVal) => {}, { deep: true });
    const Items = items;
    return {
      route,
      items: Items,
    };
  },
  methods: {
    kutu(index) {
      const array = this.$refs.kutu;
      const array2 = this.$refs.arrow;
      const element = this.$refs.kutu[index];
      const arrow = this.$refs.arrow[index];
      const height = this.$refs.height[index].offsetHeight;
      arrow.classList.toggle("rotate");
      array2.forEach((elem) => {
        if (elem != arrow) {
          elem.classList.remove("rotate");
        }
      });
      array.forEach((elem) => {
        if (elem != element) {
          elem.style.maxHeight = "0px";
        }
      });
      if (element.style.maxHeight == "0px" || element.style.maxHeight == 0) {
        element.style.maxHeight = height + "px";
      } else {
        element.style.maxHeight = "0px";
      }
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 400px;
}
.transition {
  transition: 250ms ease;
}
.rotate {
  transform: rotateX(180deg);
}
.border1-active {
  border-left: 3px solid rgb(26, 150, 221);
}
.border1 {
  border-left: 3px solid gray;
}
.link {
  font-weight: bold;
  text-decoration: none;
  color: rgb(255, 255, 255);
  transition: all 0.5s ease;
}

.kutu3 {
  width: 100%;
  height: 45px;
}
.kutu2 {
  max-height: 0px;
  overflow: hidden;
  transition: max-height 250ms ease-in-out;
}
.kutu {
  width: 100%;
  height: 45px;
  cursor: pointer;
}
.list_item {
  transition: all 0.25s ease;
}
.list_item:hover {
  background-color: #504f4f;
}
.active-link {
  background-color: #393939;
}
</style>
