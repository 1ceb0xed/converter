<script setup lang="ts">
import type { item } from '~/layouts/header.vue'
definePageMeta({
  layout: 'header',
})

const props = defineProps<{
  itemsFromApi: item
}>()
const itemsFromApi = toRef(props, 'itemsFromApi')
const selectedValueConverterFirst = ref<'USD' | 'EUR' | 'RUB' | ''>('')
const selectedValueConverterSecond = ref<'USD' | 'EUR' | 'RUB' | ''>('')
const inputFirst = ref<number | null>(null)
const inputSecond = ref<number | null>(null)
const lastChange = ref<'first' | 'second'>('first')

const test = () => {
  console.log(itemsFromApi.value)
  console.log(inputSecond.value)
  console.log(selectedValueConverterFirst.value)
  console.log(selectedValueConverterSecond.value)
}

watch(inputFirst, () => {
  lastChange.value = 'first'
})
watch(inputSecond, () => {
  lastChange.value = 'second'
})

watchEffect(() => {
  const key = `${selectedValueConverterFirst.value.toLowerCase()}-${selectedValueConverterSecond.value.toLowerCase()}`
  if (lastChange.value === 'first') {
    inputSecond.value = inputFirst.value
      ? Math.round(inputFirst.value * itemsFromApi.value[key] * 100) / 100
      : null
  } else if (lastChange.value === 'second') {
    inputFirst.value = inputSecond.value
      ? Math.round((inputSecond.value / itemsFromApi.value[key]) * 100) / 100
      : null
  }
}) // убрать дублирование watch, далее убрать округление(оно ломается из за watch) если ввести значение 1 во второй
//инпут то оно сначала разделит его, потом передаст в первый инпут, а первый инпут умножит его и поэтому во втором
// инпуте будет 0.85, а не 1
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
              :items="['USD', 'EUR', 'RUB']"
            ></v-select>
            <input
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
              :items="['USD', 'EUR', 'RUB']"
            ></v-select>
            <input
              onkeydown="return event.key !== '-';"
              v-model="inputSecond"
              min="0"
              type="number"
              class="rounded-2xl bg-slate-800 text-xl text-white p-[1vw]"
              placeholder="Введите сумму"
            />
          </div>
        </form>
        <button @click="test">test</button>
      </div>
    </section>
  </div>
</template>
