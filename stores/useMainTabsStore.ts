import { ref, computed } from 'vue';
import { defineStore } from 'pinia'

export interface Tab {
  id: string
  title: string
  to: string
  fullPath: string
}

export const useMainTabsStore = defineStore('tabs', () => {
  const tabs = ref<Tab[]>([]);
  const currentTabId = ref('');
  const currentTab = computed(() => {
    return tabs.value.find(tab => tab.id === currentTabId.value)
  })
  const currentTabIndex = computed(() => {
    return tabs.value.findIndex(tab => tab.id === currentTabId.value)
  })

  const router = useRouter()

  /**
   * 
   * @param {object} tab 
   */
  function addTab(tab: Tab) {
    const isExist = tabs.value.find(t => t.id === tab.id)
    if (!isExist) {
      tabs.value.push(tab)
    }
    setCurrentTab(tab.id);
  }

  /**
   * 
   * @param {string} id -  
   */
  function removeTab(id: string) {
    const idx = tabs.value.findIndex(tab => tab.id === id)
    if (idx > -1) {
      // tabs.value = tabs.value.filter(tab => tab.id !== id)
      tabs.value.splice(idx, 1)
      if (currentTabId.value === id) {
        const next = tabs.value[idx - 1] || tabs.value[0]
        currentTabId.value = next?.id || ''
        if (next) {
          router.push(next.to)
        }
      }
    }
  }

  /**
   * 
   * @param {string} id - tab id.
   */
  function setCurrentTab(id: string) {
    const _tab = tabs.value.find(tab => tab.id === id);
    if (!_tab) return;
    currentTabId.value = id;
    router.push(_tab.to)
  }

  watch(tabs, (val) => {
    if (val.length && !currentTabId.value) {
      currentTabId.value = val[0].id
    }
  })

  return {
    tabs,
    currentTabId,
    currentTabIndex,
    currentTab,
    addTab,
    removeTab,
    setCurrentTab,
  }
})