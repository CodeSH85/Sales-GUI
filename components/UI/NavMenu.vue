<template>
  <div class="w-full flex flex-col gap-1">
    <div v-for="(group, gIdx) in items" :key="gIdx" class="space-y-1">
      <div
        class="w-full h-8 flex items-center px-2.5 gap-x-2 text-sm font-medium text-default cursor-pointer rounded-md"
        :class="group.active || openedGroups.includes(gIdx) ? 'bg-surface-200 hover:bg-surface-300' : 'hover:bg-surface-100'"
        @click="onToggle(gIdx)"
      >
        <UIcon v-if="group.icon" 
          :name="group.icon" 
          class="size-4" 
        />
        <span>{{ group.title }}</span>
        <UIcon 
          :name="openedGroups.includes(gIdx) ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'" 
          class="size-4 ml-auto" 
        />
      </div>
      <Transition
        name="expand"
        enter-active-class="transition-all duration-250 ease-in"
        leave-active-class="transition-all duration-250 ease-in"
        enter-from-class="max-h-0"
        enter-to-class="max-h-40"
        leave-from-class="max-h-40"
        leave-to-class="max-h-0"
      >
        <ul v-show="openedGroups.includes(gIdx)" 
          class="list-none ml-4 pl-1 gap-1 border-l border-surface-200 overflow-hidden"
          :class="openedGroups.includes(gIdx) ? 'overflow-auto' : ''"
        >
          <li v-for="(item, iIdx) in group.children" :key="iIdx"
            class="h-8 flex items-center px-2.5 gap-x-2 text-sm font-medium text-default hover:bg-surface-100 active:bg-surface-200 cursor-pointer rounded-md"
            @click.stop="onClickChild(item)"
          >
            {{ item.title }}
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

interface MenuItem {
  title: string
  icon?: string
  path?: string
}

interface MenuGroup {
  title: string
  icon?: string
  path?: string
  defaultOpen?: boolean
  active?: boolean
  children: MenuItem[]
}

interface Props {
  items: MenuGroup[],
  defaultOpen?: Array<number>,
}

const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'clickChild', item: MenuItem): void
}>()

const openedGroups = ref<number[]>(props.items.map((item, i) => item.defaultOpen ? i : -1).filter(i => i !== -1))

function onToggle(index: number) {
  if (!openedGroups.value.includes(index)) {
    openedGroups.value.push(index)
  } else {
    openedGroups.value = openedGroups.value.filter(i => i !== index)
  }
}

function onClickChild(item: MenuItem) {
  emits('clickChild', item)
}
</script>