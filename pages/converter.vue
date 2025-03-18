<script setup lang="ts">
import type { item } from '~/layouts/header.vue'
import type { values } from '~/layouts/header.vue'
definePageMeta({
  layout: 'header',
})

const props = defineProps<{
  itemsFromApi: item
}>()
const itemsFromApi = toRef(props, 'itemsFromApi')
const selectedValueConverterFirst = ref<values>('')
const selectedValueConverterSecond = ref<values>('')
const inputFirst = ref<number | null>(null)
const inputSecond = ref<number | null>(null)
const valueVariables: string[] = ['USD', 'EUR', 'RUB']

const filteredValuesConverter = computed<string[]>((): string[] => {
  return valueVariables.filter(
    (item) =>
      item !== selectedValueConverterFirst.value && item !== selectedValueConverterSecond.value,
  )
})

const changeFirst = (): void => {
  if (rate.value) {
    inputSecond.value = inputFirst.value
      ? Math.round(inputFirst.value * rate.value * 100) / 100
      : null
  }
}
const changeSecond = (): void => {
  if (rate.value) {
    inputFirst.value = inputSecond.value
      ? Math.round((inputSecond.value / rate.value) * 100) / 100
      : null
  }
}
const rate = computed((): number => {
  const key = `${selectedValueConverterFirst.value.toLowerCase()}-${selectedValueConverterSecond.value.toLowerCase()}`
  return itemsFromApi.value[key]
})

watch([selectedValueConverterFirst, selectedValueConverterSecond], (): void => {
  changeFirst()
  changeSecond()
})
</script>

<template>
  <div class="bg-slate-800 w-full h-[966px] text-white flex justify-center items-center">
    <section>
      <div class="h-[30vw] w-[60vw] bg-orange rounded-2xl">
        <div class="p-[1.5vw] text-[1.7vw] text-white font-medium flex justify-center">
          Конвертатор валют
        </div>
        <form>
          <div class="p-[1.5vw] grid grid-cols-2 gap-5">
            <v-select
              v-model="selectedValueConverterFirst"
              class="rounded-2xl bg-slate-800 w-full text-white text-xl"
              label="Выбор валюты"
              :items="filteredValuesConverter"
            ></v-select>
            <input
              @input="changeFirst"
              id="inputFirstId"
              onkeydown="return event.key !== '-';"
              v-model="inputFirst"
              min="0"
              type="number"
              class="rounded-2xl bg-slate-800 text-xl text-white p-[1vw]"
              placeholder="Введите сумму"
            />
          </div>
          <div class="p-[1.5vw] grid grid-cols-2 gap-5">
            <v-select
              v-model="selectedValueConverterSecond"
              class="rounded-2xl bg-slate-800 w-full text-white text-xl"
              label="Выбор валюты"
              :items="filteredValuesConverter"
            ></v-select>
            <input
              @input="changeSecond"
              id="inputSecondId"
              onkeydown="return event.key !== '-';"
              v-model="inputSecond"
              min="0"
              type="number"
              class="rounded-2xl bg-slate-800 text-xl text-white p-[1vw]"
              placeholder="Введите сумму"
            />
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
