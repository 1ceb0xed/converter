<script setup lang="ts">
import type { item } from '~/layouts/header.vue'
definePageMeta({
  layout: 'header',
})
const props = defineProps<{
  selectedValue: string
  filteredValues: string[]
  itemsFromApi: item
}>()

const filteredValues = toRef(props, 'filteredValues')
const selectedValue = toRef(props, 'selectedValue')
const itemsFromApi = toRef(props, 'itemsFromApi')

const calculateAmount = (item: string): number => {
  const key = `${item.toLowerCase()}-${selectedValue.value.toLowerCase()}`
  return Math.round(itemsFromApi.value[key] * 100) / 100
}
</script>

<template>
  <div class="bg-slate-800 w-full h-screen text-white">
    <div class="pt-1">
      <div
        name="value"
        class="m-[2vw] p-[2vw] bg-orange h-[30vw] rounded-2xl text-white text-xl font-medium flex flex-col gap-[1.5vw] items-center"
      >
        <h2 v-for="item in filteredValues">
          1 {{ item }} = {{ calculateAmount(item) }} {{ selectedValue }}
        </h2>
      </div>
    </div>
  </div>
</template>
