<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-img
        class="mx-2"
        src="https://www.decameron.com/images/logos/logo-decameron-all-inclusive.png"
        max-height="100"
        max-width="150"
        contain
      ></v-img>
      <v-toolbar-title>Administrador de Hoteles</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Hoteles</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
