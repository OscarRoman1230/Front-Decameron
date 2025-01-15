<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar app color="primary">
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
