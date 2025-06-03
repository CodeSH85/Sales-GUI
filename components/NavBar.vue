<template>
  <div class="w-full h-full flex flex-col">
    <div class="flex-grow">
      <UNavigationMenu orientation="vertical" 
        :items="mainNavItems"
        color="neutral"
        class="p-1 data-[orientation=vertical]:w-full"
        :ui="{
          link: 'text-base',
        }"
      >
      <template #item="{ item, index, active }">
        <div v-if="!item.children" class="w-full">
          <div class="w-full flex items-center gap-x-1.5" @click="onClickNavItem(item)">
            <UIcon v-if="item.icon" :name="item.icon" class="size-5" />
            <div :class="item.icon ? '' : 'pl-5'">
              {{ item.label }}
            </div>
          </div>
        </div>
      </template>
      </UNavigationMenu>
    </div>
    <div class="flex-shrink-0 border-t border-[#B5B5B5]">
      <!-- <UNavigationMenu orientation="vertical" 
        :items="otherItems" 
        class="p-1 data-[orientation=vertical]:w-full"
        :ui="{
          label: 'font-normal',
          link: 'text-base',
        }"
      /> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const {
  addTab
} = useMainTabsStore();

function onClickNavItem(item: NavigationMenuItem) {
  console.log(item)
  if (!item.path) return

  const id = item.path
    .replace(/^\//, '')
    .replace(/\//g, '-')
    .toLowerCase()

  addTab({
    id,
    title: item.label || '',
    to: item.path,
    fullPath: item.path
  })
}

const mainNavItems = ref<NavigationMenuItem[][]>([
  [
    {
      label: '採購作業',
      // icon: 'i-lucide-book-open',
      active: true,
      defaultOpen: true,
      children: [
        {
          label: '請購單',
          description: '',
          icon: 'i-lucide-file-text',
          // to: '/Purchase/Requisition'
          path: '/Purchase/Requisition'
        },
        {
          label: '進貨管理',
          description: '',
          icon: 'i-lucide-file-text',
          path: '/Purchase/Order'
        }
      ]
    },
    {
      label: '庫存管理',
      children: []
    },
    {
      label: '訂單管理',
      icon: '',
      defaultOpen: true,
      children: []
    },
    {
      label: '應收帳款管理',
      icon: '',
      defaultOpen: true,
      children: []
    },
    {
      label: '應付帳款管理',
      icon: '',
      defaultOpen: true,
      children: []
    },
    {
      label: '會計分錄',
      icon: '',
      defaultOpen: true,
      path: '/Accounting/Entry',
      children: [],
    }
  ]
])
const otherItems = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'Settings',
      type: 'label',
    },
    {
      label: 'Help',
      icon: 'i-lucide-circle-help',
      disabled: true
    }
  ]
])
</script>
