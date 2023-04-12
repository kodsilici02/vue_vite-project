<template>
  <div class="background w-full" ref="background"></div>
  <div class="banner">
    <video autoplay muted loop class="video">
      <source src="../assets/video2.mp4" />
    </video>
  </div>
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
.background {
  position: fixed;
  top: 0;
  left: 0;
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
  height: 100%;
  background-size: cover;
  background-color: black;
  z-index: -4;
}
.video {
  width: 100%;
  height: 100vh;
}
</style>
