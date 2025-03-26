<script setup lang="ts">
const currencyStore = useCurrencyStore()
</script>

<template>
  <AppLoader v-if="currencyStore.loader" />
  <div v-else>
    <AppHeader />
    <NuxtPage />
  </div>
</template>
