<template>
  <button
    :class="[
      `inline-flex items-center justify-center
      font-medium whitespace-nowrap rounded-md 
      transition-all cursor-pointer *:cursor-pointer
      focus:ring-2 focus:ring-offset-2 focus:ring-slate-300
      disabled:pointer-events-none`,
      sizes[size],
      variants[variant][color],
      $attrs.class || ''
    ]"
  >
    <slot name="default">
      <slot name="prepend"></slot>
      <UIcon v-if="icon" :name="icon" />
      <label>
        {{ label }}
      </label>
      <slot name="append"></slot>
    </slot>
  </button>
</template>
<script setup lang="ts">
defineOptions({
  name: 'CommonButton',
  inheritAttrs: false,
})

interface Props {
  label?: string
  icon?: string,
  prepend?: string
  append?: string
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  variant?: 'solid' | 'tonal' | 'text' | 'link' | 'elevated' | 'outlined'
  color?: 'primary' | 'success' | 'error' | 'warning'
}
const props = withDefaults(defineProps<Props>(), {
  label: '',
  icon: '',
  prepend: '',
  append: '',
  size: 'md',
  variant: 'solid',
  color: 'primary',
})

const sizes = {
  xl: 'h-10 px-3 gap-x-2 text-base',
  lg: 'h-9 px-3 gap-x-2 text-sm',
  md: 'h-8 px-2.5 gap-x-1.5 text-sm',
  sm: 'h-7 px-2.5 gap-x-1.5 text-[0.8rem]',
  xs: 'h-6 px-2 gap-x-1 text-xs',
}

const variants = {
  solid: {
    primary: `
      bg-slate-800 text-white hover:bg-slate-700
      dark:bg-slate-200 dark:text-slate-800 dark:hover:bg-slate-300
    `,
    success: `
      bg-green-500 text-white hover:bg-green-600
      dark:bg-green-700 dark:text-white dark:hover:bg-green-600
    `,
    error: `
      bg-red-500 text-white hover:bg-red-600
      dark:bg-red-700 dark:text-white dark:hover:bg-red-600
    `,
    warning: `
      bg-amber-500 text-white hover:bg-amber-600
      dark:bg-amber-700 dark:text-white dark:hover:bg-amber-600
    `,
  },
  tonal: {
    primary: `
      bg-slate-800/10 text-slate-800 hover:bg-slate-800/15
      dark:bg-slate-200/15 dark:text-slate-200 dark:hover:bg-slate-200/20
    `,
    success: `
      bg-green-500/10 text-green-700 hover:bg-green-500/20
      dark:bg-green-200/15 dark:text-green-200 dark:hover:bg-green-200/20
    `,
    error: `
      bg-red-500/10 text-red-700 hover:bg-red-500/20
      dark:bg-red-200/15 dark:text-red-200 dark:hover:bg-red-200/20
    `,
    warning: `
      bg-amber-500/10 text-amber-700 hover:bg-amber-500/20
      dark:bg-amber-200/15 dark:text-amber-200 dark:hover:bg-amber-200/20
    `,
  },
  text: {
    primary: `
      text-slate-800 hover:bg-slate-800/10
      dark:text-slate-200 dark:hover:bg-slate-200/15
    `,
    success: `
      text-green-700 hover:bg-green-500/10
      dark:text-green-200 dark:hover:bg-green-200/15
    `,
    error: `
      text-red-700 hover:bg-red-500/10
      dark:text-red-200 dark:hover:bg-red-200/15
    `,
    warning: `
      text-amber-700 hover:bg-amber-500/10
      dark:text-amber-200 dark:hover:bg-amber-200/15
    `,
  },
  link: {
    primary: `
      text-slate-800 hover:underline hover:text-slate-700
      dark:text-slate-200 hover:underline dark:hover:text-slate-300
    `,
    success: `
      text-green-700 hover:underline hover:text-green-800
      dark:text-green-200 hover:underline dark:hover:text-green-300
    `,
    error: `
      text-red-700 hover:underline hover:text-red-800
      dark:text-red-200 hover:underline dark:hover:text-red-300
    `,
    warning: `
      text-amber-700 hover:underline hover:text-amber-800
      dark:text-amber-200 hover:underline dark:hover:text-amber-300
    `,
  },
  elevated: {
    primary: `
      bg-slate-800 text-white hover:bg-slate-700 shadow-md
      dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300 shadow-md
    `,
    success: `
      bg-green-500 text-white hover:bg-green-600 shadow-md
      dark:bg-green-200 dark:text-green-900 dark:hover:bg-green-300 shadow-md
    `,
    error: `
      bg-red-500 text-white hover:bg-red-600 shadow-md
      dark:bg-red-200 dark:text-red-900 dark:hover:bg-red-300 shadow-md
    `,
    warning: `
      bg-amber-500 text-white hover:bg-amber-600 shadow-md
      dark:bg-amber-200 dark:text-amber-900 dark:hover:bg-amber-300 shadow-md
    `,
  },
  outlined: {
    primary: `
      border border-slate-300 hover:border-slate-400 text-slate-800 hover:bg-slate-800/5
      dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600
    `,
    success: `
      border border-green-300 hover:border-green-400 text-green-600 hover:bg-green-500/5
      dark:border-green-800 dark:text-green-500 dark:hover:border-green-700
    `,
    error: `
      border border-red-300 hover:border-red-400 text-red-600 hover:bg-red-500/5
      dark:border-red-800 dark:text-red-500 dark:hover:border-red-700
    `,
    warning: `
      border border-amber-300 hover:border-amber-400 text-amber-600 hover:bg-amber-500/5
      dark:border-amber-800 dark:text-amber-500 dark:hover:border-amber-700
    `,
  },
}
</script>
