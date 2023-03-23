<template>
  <div class="container-fluid w-100 sidenav" v-motion-slide-visible-left>
    <v-list theme="dark">
      <template v-for="item in items">
        <template v-if="item.name == 'contents'">
          <v-list-subheader> {{ item.title }} </v-list-subheader>
          <template v-for="subItem in item.subItems">
            <router-link
              v-if="item.name == 'contents'"
              :to="{ name: subItem.name }"
              class="w-full sm:text-xs md:text-lg link"
            >
              <v-list-item :prepend-icon="subItem.icon" :value="subItem.value">
                {{ subItem.title }}
              </v-list-item>
            </router-link>
          </template>
        </template>
      </template>
    </v-list>
  </div>
</template>

<script>
import items from "../../../router/sidebarroutes";
import { useRoute } from "vue-router";
import { watch, ref } from "vue";
export default {
  name: "TopBar",
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
};
</script>

<style scoped>
.sidenav {
  position: sticky;
  height: 92vh;
  background-color: #212121;
  top: 60px;
  left: 0;
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
</style>
