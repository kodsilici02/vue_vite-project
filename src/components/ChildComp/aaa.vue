<v-list theme="dark">
  <template v-for="(list, index) in items">
    <router-link
      v-if="!list.group"
      class="w-full routerlink"
      :to="{ name: list.name }"
    >
    <i class="mdi-home mdi v-icon notranslate v-theme--dark v-icon--size-default" aria-hidden="true"></i>
      <v-list-item
        :class="{ 'v-list-item--active': list.path == route.path }"
        :title="{ name: list.title }"
        :prepend-icon="list.icon"
        v-bind="list"
        :value="list.value"
      ></v-list-item>
    </router-link>
    <v-list-group
      class="a"
      v-else-if="list.group"
      v-bind="list"
      :value="list.value"
      :key="list.value"
      v-model="selectedGroup"
      @click="updateSelectedGroup(list.name)"
    >
      <template v-slot:activator="{ props }">
        <v-list-item
          v-bind="props"
          :prepend-icon="list.icon"
        ></v-list-item>
      </template>
      <template v-for="subItem in list.subItems">
        <router-link
          class="w-full routerlink"
          :to="{ name: subItem.name }"
        >
          <v-list-item
            style="
              padding-inline-start: calc(
                -13px + var(--indent-padding)
              ) !important;
            "
            :class="{
              'v-list-item--active': subItem.path == route.path,
              'border1-active': subItem.path == route.path,
              border1: subItem.path != route.path,
            }"
            :title="{ name: subItem.title }"
            :prepend-icon="subItem.icon"
            v-bind="subItem"
            :value="subItem.value"
          ></v-list-item>
        </router-link>
      </template>
    </v-list-group>
  </template>
</v-list>
