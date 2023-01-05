<template>
  <div class="background" ref="background"></div>
  <div class="banner"></div>
  <div class="bos"></div>
</template>

<script>
export default {
  name: "BackGround",
  data() {
    return {
      scollTop: 1,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    handleScroll() {
      this.scrollTop = window.scrollY;
      let element = this.$refs.background;
      element.style.opacity = Math.min(this.scrollTop / 600, 0.5);
    },
  },
};
</script>

<style scoped>
.bos {
  width: 100%;
  height: 100vh;
  z-index: -4;
}
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -3;
  background-color: black;
  opacity: 0;
}
.banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-size: cover;
  z-index: -4;
  background-image: url("./src/assets/AbandonedNecessaryCapeghostfrog-mobile.gif");
}
</style>
