<script setup lang="ts">
import { useCurrencyStore } from '~/stores/CurrencyStore'

const currencyStore = useCurrencyStore()
</script>

<template>
  <header class="flex gap-[2vw] p-[1vw] justify-center bg-slate-800 text-orange text-2xl">
    <nuxt-link to="/">Главная</nuxt-link>
    <nuxt-link to="/converter">Конвертация</nuxt-link>
    <v-select
      v-model="currencyStore.selectedValue"
      label="Основная валюта"
      :items="currencyStore.valueVariables"
      class="max-w-[200px]"
    ></v-select>
  </header>
  <div class="h-1 bg-orange w-full"></div>
</template>
