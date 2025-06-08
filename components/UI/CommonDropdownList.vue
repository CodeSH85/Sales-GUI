<template>
  <div class="relative inline-block text-left">
    <CommonButton
      :label="label"
      :icon="icon"
      :size="size"
      v-bind="activator"
      @click="onToggle"
    />
    <transition
      name="dropdown"
      enter-active-class="transition ease-in duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <ul v-show="isOpen" class="absolute list-none origin-top-left left-0 z-10 mt-1.5 w-48 p-1 bg-surface ring-1 ring-surface-200 rounded-lg shadow-lg">
        <li v-for="(item, index) in items" :key="index" 
          class="flex items-center gap-x-2 px-2 py-1.5 text-sm text-default hover:bg-surface-100 active:bg-surface-200 rounded-md cursor-pointer" 
          @click="onItemClick(item)"
          @keydown.enter="onItemClick(item)"
        >
          <UIcon v-if="item.icon" :name="item.icon" class="!size-4 text-toned" />
          {{ item.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>
<script setup lang="ts">
interface DropdownItem {
  label: string;
  icon?: string;
  action?: () => void;
}
interface Props {
  items: DropdownItem[];
  label?: string;
  icon?: string;
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  activator?: object;
  showDropdownIcon?: boolean;
  dropdownIcon?: string;
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  label: '',
  icon: '',
  size: 'md',
  activator: () => ({}),
  showDropdownIcon: true,
  dropdownIcon: 'i-heroicons-chevron-down',
});

const emits = defineEmits<{
  (e: 'item-click', item: DropdownItem): void;
}>();

const isOpen = ref(false);
function onToggle() {
  isOpen.value = !isOpen.value;
}

function onItemClick(item: DropdownItem) {
  emits('item-click', item);

  // If the item has an action, execute it
  if (item.action) {
    item.action();
  }
}

</script>
<style scoped>

</style>