<script setup lang="ts">
import { useCurrencyStore } from '~/stores/CurrencyStore'

const currencyStore = useCurrencyStore()
const localPath = useLocalePath()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <header class="flex gap-[2vw] p-[1vw] justify-center bg-slate-800 text-orange text-2xl">
    <NuxtLink :to="localPath('/')">{{ $t('header.HomePage') }}</NuxtLink>
    <NuxtLink :to="localPath('/converter')">{{ $t('header.ConverterPage') }}</NuxtLink>
    <v-select
      v-model="currencyStore.selectedValue"
      :label="$t('header.DropdownSelectorMainValue')"
      :items="currencyStore.valueVariables"
      class="max-w-[200px]"
    ></v-select>
    <NuxtLink
      v-for="{ code, language } in locales"
      :key="code"
      :to="switchLocalePath(code)"
      :class="{ 'text-white': code == locale }"
      class="text-lg justufy-end"
      >{{ language }}</NuxtLink
    >
  </header>
  <div class="h-1 bg-orange w-full"></div>
</template>
