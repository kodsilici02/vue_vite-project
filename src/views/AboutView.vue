<template>
  <div class="about">
    <div class="text-center">
      <v-menu transition="fade-transition">
        <template v-slot:activator="{ props }">
          <v-btn dark color="primary" v-bind="props"> Fade Transition </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>1</v-list-item-title>
            <v-list-item-title>2</v-list-item-title>
            <v-list-item-title>3</v-list-item-title>
            <v-list-item-title>4</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn class="show-more" @click="button()" elevation="2">Show More</v-btn>
    </div>
    <div class="mt-2">
      <v-carousel show-arrows="hover" hide-delimiter-background cycle>
        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
          cover
        ></v-carousel-item>

        <v-carousel-item
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          cover
        ></v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  methods: {
    button() {
      axios({
        method: "post",
        url: "http://localhost:3333/dumbs/post",
        data: {
          name: "Feminism",
          iq: "15",
        },
      });
    },
  },
};
</script>

<style scoped>
.show-more {
  margin-left: 10px;
  border-radius: 10px;
  font-weight: bold;
  background-color: antiquewhite;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
}
</style>
