<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-fluid w-100 bg">
    <main>
      <article class="w-full sm:w-10/12">
        <h1 class="text-3xl sm:text-5xl" v-motion-slide-visible-bottom>
          My Article
        </h1>
        <section
          v-motion-slide-visible-left
          v-for="title in titles"
          :key="title.id"
        >
          <div
            ref="title"
            v-bind:accesskey="title.id"
            style="height: 60px"
          ></div>
          <h2 class="text-3xl font-bold">{{ title.title }}</h2>
          <div class="kutu"></div>
        </section>
      </article>
      <aside class="hidden sm:block sm:w-2/12" v-motion-slide-visible-bottom>
        <div class="sticky-container p-0" style="top: 0px">
          <div class="bos"></div>
          <div
            class="d-flex justify-content-center"
            v-for="title in titles"
            :key="title.id"
          >
            <h2
              class="text-3xl sm:text-2xl md:text-3xl font-bold sideh2"
              v-bind:accesskey="title.id"
              :class="{ active: isActive(title) }"
              @click="scrollToContent(title)"
            >
              {{ title.title }}
            </h2>
          </div>
        </div>
      </aside>
    </main>
  </div>
</template>
<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "HomeView",
  data() {
    return {
      titles: [
        { title: "Title 1", id: 0 },
        { title: "Title 2", id: 1 },
        { title: "Title 3", id: 2 },
      ],
      activeTitle: null,
    };
  },
  mounted() {
    // Create the IntersectionObserver
    this.observer = new IntersectionObserver(this.handleIntersection, {
      root: null,
      rootMargin: "0px 0px -60% 0px",
      threshold: 0.5,
    });

    // Observe each title element
    this.titles.forEach((title) => {
      this.observer.observe(this.$refs.title[title.id]);
    });
  },
  beforeUnmount() {
    // Disconnect the IntersectionObserver
    this.observer.disconnect();
  },
  methods: {
    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.activeTitle = entry.target.accessKey;
        }
      });
    },
    isActive(title) {
      // Check if the given title is the active title
      return this.activeTitle == title.id;
    },

    scrollToContent(id) {
      // Get the element for the given title
      const element = this.$refs.title[id.id];
      // Scroll the page to the element
      element.scrollIntoView({ behevior: "smooth" });
    },
  },
};
</script>

<style scoped>
aside h2 {
  text-decoration: none;
  color: rgb(227, 227, 227);
  transition: 0.5s linear;
}
aside h2:hover {
  color: rgb(34, 209, 200);
  transition: 0.5s linear;
}
.baslik {
  color: #ccc;
}
aside h2 {
  cursor: pointer;
}
aside h2.active {
  color: rgb(39, 150, 85);
}
main {
  display: flex;
}
article {
  margin-bottom: 300px;
}

aside > div {
  position: sticky;
  top: 20px;
  padding-left: 2em;
}
aside > div > a {
  display: block;
  text-decoration: none;
  color: rgb(68, 71, 84);
  border-left: 1px solid #ccc;
  padding-left: 2em;
}
aside a.active {
  font-weight: bold;
  border-color: black;
}
p {
  text-align: center;
}
h1 {
  font-weight: bold;
  text-align: center;
  color: #e3e3e3;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
h2 {
  color: #e3e3e3;
}
.kutu {
  height: 100vh;
  width: 100%;
  background-color: aquamarine;
  border-bottom: 1px solid black;
}
.bos {
  width: 100%;
  height: 60px;
}
</style>
