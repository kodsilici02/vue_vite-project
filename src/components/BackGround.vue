<template>
  <div class="background" ref="background"></div>

  <div class="banner">
    <video autoplay muted loop class="video">
      <source src="../assets/background.mp4" />
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
.quote-container {
  height: 100vh;
  align-content: center;
}
.quote-1 {
  font-weight: bold;
  --bg-size: 200%;
  --color-one: rgb(222, 26, 26);
  --color-two: rgb(77, 126, 211);

  background: linear-gradient(
      -45deg,
      var(--color-one),
      var(--color-two),
      var(--color-one)
    )
    0 0 / var(--bg-size) 100%;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: move-bg 20s infinite linear;
}
@media (prefers-reduced-motion: no-preference) {
  .quote-1 {
    animation: move-bg 20s linear infinite;
  }
  @keyframes move-bg {
    to {
      background-position: var(--bg-size) 0;
    }
  }
}
.quote-2 {
  height: 120px;
  font-weight: bold;
  --bg-size: 200%;
  --color-one: rgb(222, 26, 26);
  --color-two: rgb(77, 126, 211);

  background: linear-gradient(
      -45deg,
      var(--color-two),
      var(--color-one),
      var(--color-two)
    )
    0 0 / var(--bg-size) 100%;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  animation: move-bg 20s infinite linear;
}
@media (prefers-reduced-motion: no-preference) {
  .quote-2 {
    animation: move-bg 20s linear infinite;
  }
  @keyframes move-bg {
    to {
      background-position: var(--bg-size) 0;
    }
  }
}
.bos {
  width: 100%;
  height: 30vh;
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
  background-color: black;
  z-index: -4;
}
.video {
  width: 100%;
  height: 100vh;
}
</style>
