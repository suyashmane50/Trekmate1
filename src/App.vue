<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-title>TreakMate</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/routes" text>Routes</v-btn>
      <v-btn to="/weather" text>Weather</v-btn>
      <v-btn to="/checklist" text>Checklist</v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app color="primary" dark>
      <v-row justify="center" no-gutters>
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>TreakMate</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
// Component logic will go here
</script>

<style>
/* Global styles */
.v-application {
  font-family: 'Roboto', sans-serif;
}
</style>
