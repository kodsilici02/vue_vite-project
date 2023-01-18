<template>
  <div class="topbar" ref="topbar">
    <v-container class="d-flex justify-center">
      <router-link class="ma-1 link" :to="{ name: 'content1' }"
        >Content1
      </router-link>
      <router-link class="ma-1 link" :to="{ name: 'content1' }"
        >Content2</router-link
      >
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.topbar {
  position: sticky;
  top: 60px;
  width: 100%;
  height: 70px;
  background-color: #5f0d0d;
  z-index: 5;
  border-radius: 20px;
}

.button {
  cursor: pointer;
  position: absolute;
  top: 15px;
  left: 10px;
  z-index: 9;
  color: aliceblue;
}

.link {
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  transition: all 0.5s ease;
}
.link:hover {
  color: rgb(34, 209, 200);
  transition: 0.5s linear;
}
.router-link-active {
  color: rgb(26, 225, 155);
}
</style>
