<template>
  <div class="w-full h-10 flex items-center overflow-x-auto">
    <div v-for="tab, tIdx in tabs" :key="tab.id"
      class="w-[200px] flex items-center justify-between gap-x-1.5 px-1 border-accented cursor-pointer group transition-all"
      :class="[
        activeTab === tab.id ? 'h-full bg-white border-x tab-rounded border-b-white' : 'h-[80%] ',
        isTabAtPrev(tIdx) ? 'border-none' : 'border-r'
      ]"
      @click="setActive(tab.id)"
    >
      <div 
        class="w-full h-full flex items-center justify-between gap-x-1.5 pr-2 pl-3 text-sm whitespace-nowrap"
        :class="activeTab === tab.id ? 'font-medium' : 'hover:bg-[#F5F5F5] text-gray-500'"
      >
        {{ tab.title }}
        <UButton
          icon="i-heroicons-x-mark-16-solid" 
          color="neutral" 
          variant="ghost"
          class="flex-shrink-0"
          :class="activeTab === tab.id ? 'flex' : 'hidden group/hover:block'"
          @click.stop="removeTab(tab.id)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'

interface Tab {
  id: string
  title: string
}

const tabs = ref<Tab[]>([
  { id: 'tab1', title: 'Tab1' },
  { id: 'tab2', title: 'Tab2' },
])

const activeTab = ref('tab1')

const currentTab = computed(() => tabs.value.find(tab => tab.id === activeTab.value))

function setActive(id: string) {
  activeTab.value = id
}

function addTab({ id, title }: Tab) {
  tabs.value.push({
    id,
    title,
  })
  activeTab.value = id
}

function removeTab(id: string) {
  const index = tabs.value.findIndex(tab => tab.id === id)
  if (index !== -1) {
    tabs.value.splice(index, 1)
    if (activeTab.value === id) {
      const next = tabs.value[Math.max(index - 1, 0)]
      activeTab.value = next?.id || ''
    }
  }
}

const isTabAtPrev = (index: number) => {
  if (!activeTab.value) return false
  const currentTabIdx = tabs.value.findIndex(tab => tab.id === activeTab.value);
  return index === (currentTabIdx-1)
}
</script>
<style scoped>
.tab-rounded:before {
  content: "";
  position: absolute;
  bottom: 0px;
  width: 12px;
  height: 18px;
  left: -12px;
  z-index: 11;
  border-bottom-right-radius: 20px;
  box-shadow: 4px 4px 0 #FAFAFA
}
.tab-rounded:after {
  content: "";
  position: absolute;
  bottom: 0px;
  width: 12px;
  height: 18px;
  right: -12px;
  z-index: 11;
  border-bottom-left-radius: 20px;
  box-shadow: -4px 4px 0 #FAFAFA;
}
</style>