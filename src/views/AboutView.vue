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

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
}
</style>
