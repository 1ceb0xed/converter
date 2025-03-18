<script setup lang="ts">
import axios from 'axios'
export interface item {
  [title: string]: number
}
export type values = 'USD' | 'EUR' | 'RUB' | ''
const apiLink: string = 'https://status.neuralgeneration.com/api/currency'
const selectedValue = ref<values>('USD')
const valueVariables: string[] = ['USD', 'EUR', 'RUB']
const itemsFromApi = ref<item>({})
const filteredValues = computed<string[]>((): string[] => {
  return valueVariables.filter((item) => item !== selectedValue.value)
})

const fetchApi = async (): Promise<void> => {
  try {
    const { data } = await axios.get<item>(apiLink)
    itemsFromApi.value = data
  } catch (err) {
    console.log(err)
  }
}
onMounted(async (): Promise<void> => {
  await fetchApi()
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
  <nuxt-page
    :selectedValue="selectedValue"
    :filteredValues="filteredValues"
    :itemsFromApi="itemsFromApi"
  />
</template>
