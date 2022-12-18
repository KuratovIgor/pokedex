import { readonly, ref } from 'vue'

const isStorageUpdated = ref(false)

export const useStorage = () => {
  const setIsStorageUpdated = (isUpdated: boolean) => {
    isStorageUpdated.value = isUpdated
  }

  return {
    isStorageUpdated: readonly(isStorageUpdated),
    setIsStorageUpdated,
  }
}
