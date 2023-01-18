<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container-fluid w-100 grid grid-cols-12 bg">
    <main class="col-span-12 sm:col-span-10 sm:col-start-3 grid grid-cols-10">
      <article class="col-span-10 sm:col-span-8" v-motion-slide-visible-bottom>
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
      <aside class="col-span-2 hidden sm:block" v-motion-slide-visible-bottom>
        <div
          class="d-flex justify-content-center"
          v-for="title in titles"
          :key="title.id"
        >
          <h2
            class="text-3xl sm:text-2xl md:text-3xl font-bold"
            v-bind:accesskey="title.id"
            :class="{ active: isActive(title) }"
            @click="scrollToContent(title)"
          >
            {{ title.title }}
          </h2>
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
      element.scrollIntoView({ behavior: "smooth" });
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
aside h2 {
  cursor: pointer;
}
aside h2.active {
  color: rgb(39, 150, 85);
}

article {
  margin-bottom: 300px;
}

aside {
  padding-left: 1em;
  position: sticky;
  height: 100vh;
  top: 80px;
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
  height: 135px;
}
</style>
