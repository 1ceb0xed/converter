<script setup lang="ts">
import { useCurrencyStore } from '#imports'
const currencyStore = useCurrencyStore()
</script>

<template>
  <AppLoader v-if="currencyStore.loader" />
  <AppHeader v-else />
  <NuxtPage />
</template>
