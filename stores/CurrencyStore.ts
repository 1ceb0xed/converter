import { defineStore } from 'pinia'
import axios from 'axios'
import type { CurrencyRateItem, VariableValues, FilteredItem } from '~/interfaces/Interfaces'
export const useCurrencyStore = defineStore('Currency', () => {
  const currencyRates = ref<CurrencyRateItem>({})
  const selectedValue = ref<VariableValues>('USD')
  const valueVariables: string[] = ['USD', 'EUR', 'RUB']
  const loader = ref<boolean>(true)
  const config = useRuntimeConfig()
  const RATES_LINK = config.public.RATES_LINK

  const fetchApi = async (): Promise<void> => {
    try {
      const { data } = await axios.get<CurrencyRateItem>(RATES_LINK)
      currencyRates.value = data
    } catch (err) {
      console.log(err)
    }
  }

  const filteredValues = computed<FilteredItem[]>(() => {
    return valueVariables
      .filter((item) => item !== selectedValue.value)
      .map((item, index) => ({ id: index, сurrency: item }))
  })

  onMounted(async (): Promise<void> => {
    loader.value = true
    await fetchApi()
    setTimeout(() => {
      loader.value = false
    }, 1500)
  })
  return {
    currencyRates,
    selectedValue,
    valueVariables,
    filteredValues,
    loader,
  }
})
