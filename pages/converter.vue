<script setup lang="ts">
import { useCurrencyStore } from '#imports'
const currencyStore = useCurrencyStore()

const {
  currencyRates,
  selectedValueConverterFirst,
  selectedValueConverterSecond,
  inputFirst,
  inputSecond,
} = storeToRefs(currencyStore)

definePageMeta({
  layout: 'default',
})

const filteredValuesConverter = computed<string[]>((): string[] => {
  return currencyStore.valueVariables.filter(
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
  return currencyRates.value[key]
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
          {{ $t('converter.ConverterLabel') }}
        </div>
        <form>
          <div class="p-[1.5vw] grid grid-cols-2 gap-5">
            <v-select
              v-model="selectedValueConverterFirst"
              class="rounded-2xl bg-slate-800 w-full text-white text-xl"
              :label="$t('converter.DropdownSelectorCurrency')"
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
              :placeholder="$t('converter.Amount')"
            />
          </div>
          <div class="p-[1.5vw] grid grid-cols-2 gap-5">
            <v-select
              v-model="selectedValueConverterSecond"
              class="rounded-2xl bg-slate-800 w-full text-white text-xl"
              :label="$t('converter.DropdownSelectorCurrency')"
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
              :placeholder="$t('converter.Amount')"
            />
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
