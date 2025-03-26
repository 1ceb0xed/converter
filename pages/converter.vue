<script setup lang="ts">
import type { VariableValues } from '~/interfaces/Interfaces'
const currencyStore = useCurrencyStore()
const { currencyRates } = storeToRefs(currencyStore)

const selectedValueConverterFirst = ref<VariableValues>('')
const selectedValueConverterSecond = ref<VariableValues>('')
const inputFirst = ref<number | null>(null)
const inputSecond = ref<number | null>(null)

const filteredValuesConverter = computed<string[]>(() => {
  return currencyStore.valueVariables.filter(
    (item) =>
      item !== selectedValueConverterFirst.value && item !== selectedValueConverterSecond.value,
  )
})
const rate = computed<number>(() => {
  const key = `${selectedValueConverterFirst.value.toLowerCase()}-${selectedValueConverterSecond.value.toLowerCase()}`
  return currencyRates.value[key]
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

watch([selectedValueConverterFirst, selectedValueConverterSecond], () => {
  changeFirst()
  changeSecond()
})
</script>

<template>
  <div class="bg-slate-800 w-full h-[966px] text-white flex justify-center items-center">
    <section>
      <div class="h-[30vw] w-[60vw] bg-orange rounded-2xl">
        <div class="p-[1.5vw] text-[1.7vw] text-white font-medium flex justify-center">
          {{ $t('converter.converterLabel') }}
        </div>
        <form>
          <div class="p-[1.5vw] grid grid-cols-2 gap-5">
            <v-select
              v-model="selectedValueConverterFirst"
              class="rounded-2xl bg-slate-800 w-full text-white text-xl"
              :label="$t('converter.dropdownSelectorCurrency')"
              :items="filteredValuesConverter"
            ></v-select>
            <input
              @input="changeFirst"
              id="inputFirstId"
              @keydown="(e) => e.key === '-' && e.preventDefault()"
              v-model="inputFirst"
              min="0"
              type="number"
              class="rounded-2xl bg-slate-800 text-xl text-white p-[1vw]"
              :placeholder="$t('converter.amount')"
            />
          </div>
          <div class="p-[1.5vw] grid grid-cols-2 gap-5">
            <v-select
              v-model="selectedValueConverterSecond"
              class="rounded-2xl bg-slate-800 w-full text-white text-xl"
              :label="$t('converter.dropdownSelectorCurrency')"
              :items="filteredValuesConverter"
            ></v-select>
            <input
              @input="changeSecond"
              id="inputSecondId"
              @keydown="(e) => e.key === '-' && e.preventDefault()"
              v-model="inputSecond"
              min="0"
              type="number"
              class="rounded-2xl bg-slate-800 text-xl text-white p-[1vw]"
              :placeholder="$t('converter.amount')"
            />
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
