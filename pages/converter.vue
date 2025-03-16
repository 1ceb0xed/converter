<script setup lang="ts">
definePageMeta({
  layout: 'header',
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
              class="rounded-2xl bg-slate-800 w-full text-white text-xl"
              label="Выбор валюты"
              :items="['USD', 'EUR', 'RUB']"
            ></v-select>
            <input
              type="number"
              class="rounded-2xl bg-slate-800 text-xl text-white p-[1vw]"
              placeholder="Введите сумму"
            />
          </div>
          <div class="p-[1.5vw] grid grid-cols-2 gap-5">
            <v-select
              class="rounded-2xl bg-slate-800 w-full text-white text-xl"
              label="Выбор валюты"
              :items="['USD', 'EUR', 'RUB']"
            ></v-select>
            <input
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
