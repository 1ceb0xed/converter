<script setup lang="ts">
const currencyStore = useCurrencyStore()
const localPath = useLocalePath()
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
</script>

<template>
  <header class="flex gap-[2vw] p-[1vw] justify-center bg-slate-800 text-orange text-2xl">
    <NuxtLink :to="localPath('/')">{{ $t('header.homePage') }}</NuxtLink>
    <NuxtLink :to="localPath('/Converter')">{{ $t('header.converterPage') }}</NuxtLink>
    <VSelect
      v-model="currencyStore.selectedValue"
      :label="$t('header.dropdownSelectorMainValue')"
      :items="currencyStore.valueVariables"
      class="max-w-[200px]"
    ></VSelect>
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
