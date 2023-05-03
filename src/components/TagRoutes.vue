<template>
  <div>
    <div class="ml-2 text-2xl font-bold">Categories</div>
    <div v-for="(tag, index) in tags">
      <RouterLink
        :to="{
          path: '/articles/tags/' + tag.name,
          params: {
            tag: tag.param,
          },
        }"
        :tag="tag.param"
      >
        <div
          class="list_item grid grid-cols-12"
          :class="{ 'active-link': route.path == tag.path }"
          v-wave
          @click="$emit('clicked')"
        >
          <div class="col-span-2 flex items-center justify-center">
            <i :class="tag.icon" class="text-xl"></i>
          </div>
          <div class="col-span-10 flex items-center text-left ml-1 text-lg">
            {{ tag.name }}
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
<script setup>
import routertags from ".././router/tagrouter.js";
import { watch, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
var tags = ref([]);

watch(route, (newVal) => {}, { deep: true });

onMounted(() => {
  tags.value = routertags;
});
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
