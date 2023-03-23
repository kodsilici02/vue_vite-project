<template>
  <div class="w-full grid grid-cols-12">
    <div class="col-start-4 col-end-10 flex justify-items-center box">
      <div
        class="quote-container text-zinc-50 grid grid-cols-1 gap-4 content-center mb-3"
      >
        <div class="quote-1 text-4xl sm:text-5xl md:text-8xl text-center">
          Error 404
        </div>
        <div
          class="quote-2 text-4xl sm:text-5xl md:text-8xl h-full text-center"
        >
          Page Not Found
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotFound",
};
</script>
<style scoped>
.quote-container {
  height: 100vh;
  align-content: center;
}
.quote-1 {
  margin-bottom: 50px;
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
  margin-bottom: 50px;
  height: 240px;
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
.text {
  font-size: 100px;
  font-weight: bold;
  width: 100%;
}
.box {
  height: 10vh;
  margin-bottom: 200px;
}
</style>
