<template>
  <div class="w-full h-9 flex items-center overflow-x-auto">
    <div v-for="tab, tIdx in tabs" :key="tab.id"
      class="w-[200px] flex items-center justify-between gap-x-1.5 px-1 cursor-pointer group transition-all"
      :class="[
        currentTabId === tab.id ? 'h-full bg-tab border-x border-surface-400 border-b-surface' : 'h-[80%] border-surface-300',
        tIdx === 0 ? 'border-l-0' : '',
        isTabAtPrev(tIdx) ? 'border-none' : 'border-r'
      ]"
      @click="setCurrentTab(tab.id)"
    >
      <div 
        class="w-full h-full flex items-center justify-between gap-x-1.5 pr-1.5 pl-4 text-sm whitespace-nowrap"
        :class="currentTabId === tab.id ? 'font-medium text-default' : 'hover:bg-tab-hover text-dimmed'"
      >
        {{ tab.title }}
        <UButton
          icon="i-heroicons-x-mark-16-solid" 
          color="neutral" 
          variant="ghost"
          class="flex-shrink-0 cursor-pointer"
          :class="currentTabId === tab.id ? 'flex' : 'hidden group-hover:block'"
          @click.stop="removeTab(tab.id)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'

const store = useMainTabsStore();
const {
  tabs,
  currentTab,
  currentTabId,
  currentTabIndex
} = storeToRefs(store);

const {
  removeTab,
  setCurrentTab
} = store;

const isTabAtPrev = (index: number) => {
  if (currentTabIndex.value < 1) return false
  return index === (currentTabIndex.value-1)
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