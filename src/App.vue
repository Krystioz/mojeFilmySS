<script setup>
import moviesTableVue from "./components/moviesTable.vue";
import headerVue from "./components/header.vue";
import movieModalVue from "./components/movieModal.vue";
import { inject } from "vue";
import MovieModal from "./components/movieModal.vue";

// getList();
</script>

<template>
  <div>
    <header>
      <headerVue />
    </header>
    <moviesTableVue />
  </div>
</template>

<style scoped></style>
