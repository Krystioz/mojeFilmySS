<script setup>
import moviesTableVue from "./components/moviesTable.vue";
import headerVue from "./components/header.vue";
import { inject } from "vue";

// getList();
</script>

<template>
  <div>
    <header>
      <headerVue />
    </header>
    <div class="max-w-7xl mx-auto">
      <moviesTableVue />
    </div>
  </div>
</template>

<style scoped></style>
