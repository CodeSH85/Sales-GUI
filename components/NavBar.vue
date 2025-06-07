<template>
  <div class="w-full h-full flex flex-col">
    <div class="border-b border-surface-200 h-20"></div>
    <div class="flex-grow p-2">
      <NavMenu
        :items="mainNavItems"
        @click-child="onClickNavItem"
      />
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
    title: item.title || '',
    to: item.path,
    fullPath: item.path
  })
}

const mainNavItems = ref<NavigationMenuItem[]>([
  {
    title: '採購作業',
    // icon: 'i-lucide-book-open',
    // active: true,
    defaultOpen: true,
    children: [
      {
        title: '請購單',
        description: '',
        icon: 'i-lucide-file-text',
        // to: '/Purchase/Requisition'
        path: '/Purchase/Requisition'
      },
      {
        title: '進貨管理',
        description: '',
        icon: 'i-lucide-file-text',
        path: '/Purchase/Order'
      }
    ]
  },
  {
    title: '庫存管理',
    children: []
  },
  {
    title: '訂單管理',
    icon: '',
    children: []
  },
  {
    title: '應收帳款管理',
    icon: '',
    children: []
  },
  {
    title: '應付帳款管理',
    icon: '',
    children: []
  },
  {
    title: '會計分錄',
    icon: '',
    path: '/Accounting/Entry',
    children: [],
  }
])
</script>
