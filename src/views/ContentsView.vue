<template>
  <div class="container-fluid grid grid-cols-12">
    <div class="hidden sm:col-span-3 sm:grid lg:col-span-2">
      <SideNav></SideNav>
    </div>
    <div class="col-span-12 sm:col-span-9 lg:col-span-10">
      <div class="routerview">
        <router-view class="router-view" v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideNav from "./Contents/ContentsComp/SideNav.vue";
export default {
  components: { SideNav },
};
</script>

<style scoped>
.routerview {
  z-index: 1;
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
.box {
  width: 100%;
  height: 100vh;
}
</style>
