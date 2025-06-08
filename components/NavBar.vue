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

const mainNavItems = ref<NavigationMenuItem[]>([
  {
    label: '採購作業',
    // icon: 'i-lucide-book-open',
    // active: true,
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
    children: []
  },
  {
    label: '應收帳款管理',
    icon: '',
    children: []
  },
  {
    label: '應付帳款管理',
    icon: '',
    children: []
  },
  {
    label: '會計分錄',
    icon: '',
    path: '/Accounting/Entry',
    children: [],
  }
])
</script>
