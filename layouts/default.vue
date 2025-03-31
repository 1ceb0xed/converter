<script setup lang="ts">
const currencyStore = useCurrencyStore()
</script>

<template>
  <AppLoader v-if="currencyStore.loader" />
  <div v-show="!currencyStore.loader">
    <AppHeader />
    <NuxtPage />
  </div>
</template>
