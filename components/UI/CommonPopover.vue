<template>
  <div ref="container" class="relative w-full max-w-md">
    <slot name="activator" v-bind="{ open, close, toggle }"></slot>
    <transition
      name="dropdown"
      enter-active-class="transition-all ease-in duration-100"
      enter-from-class="opacity-0 -mt-2"
      enter-to-class="opacity-100"
      leave-active-class="transition-all ease-in duration-75"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0 -mt-2"
    >
      <div v-show="isShow" class="absolute z-50 w-full mt-2 bg-component border border-component-border rounded-lg shadow-lg p-4">
        <slot v-bind="{ close }" />
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { onClickOutside } from '@vueuse/core';

interface Props {
  activator?: object;
  position?: 'top' | 'bottom' | 'left' | 'right';
}
const props = withDefaults(defineProps<Props>(), {
  activator: () => ({}),
  position: 'bottom'
});

const isShow = ref(false)

const open = () => { 
  console.log('open');
  isShow.value = true;
}
const close = () => { 
  console.log('close');
  isShow.value = false;
}
const toggle = () => { 
  console.log('toggle');
  isShow.value = !isShow.value;
}

// const container = ref<HTMLElement | null>(null)
const container = useTemplateRef<HTMLElement | null>('container')

onClickOutside(container, () => {
  close()
})
</script>
