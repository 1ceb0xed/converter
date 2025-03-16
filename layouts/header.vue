<script setup lang="ts">
import { fa } from 'vuetify/locale'

const selectedValue = ref<'USD' | 'EUR' | 'RUB'>('USD')
const valueVariables: string[] = ['USD', 'EUR', 'RUB']
const filteredValues = computed<string[]>(() => {
  return valueVariables.filter((item) => item !== selectedValue.value)
})
</script>

<template>
  <header class="flex gap-[2vw] p-[1vw] justify-center bg-slate-800 text-orange text-2xl">
    <nuxt-link to="/">Главная</nuxt-link>
    <nuxt-link to="/converter">Конвертация</nuxt-link>
    <v-select
      v-model="selectedValue"
      label="Основная валюта"
      :items="valueVariables"
      class="max-w-[200px]"
    ></v-select>
  </header>
  <div class="h-1 bg-orange w-full"></div>
  <nuxt-page :selectedValue="selectedValue" :filteredValues="filteredValues" />
</template>
