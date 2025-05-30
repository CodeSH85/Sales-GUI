<template>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <label v-if="label" 
      :class="[
        'text-sm text-gray-700 font-medium leading-none',
        required && `after:ml-0.5 after:text-red-500 after:content-['*']`
      ]"
    >
      {{ label }}
    </label>
    <input
      :class="[
        `peer
          w-full flex items-center
          bg-transparent text-gray-900
          border border-gray-200 rounded-md shadow-sm
          invalid:border-red-500 invalid:text-red-600
          focus:border-2 focus:border-gray-900 focus:invalid:border-2 focus:invalid:border-red-500 focus-visible:outline-none placeholder:text-muted
          transition-all disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none
        `,
        sizes[size],
      ]"
      :placeholder="placeholder"
      :value="value"
      :disabled="disabled"
      :required="required"
      @input="onInput"
    />
  </div>
</template>
<script setup lang="ts">
interface Props {
  value?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
}

const props = withDefaults(defineProps<Props>(), {
  value: '',
  placeholder: '',
  label: '',
  disabled: false,
  required: false,
  size: 'md',
})

const emit = defineEmits(['update:value'])

function onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  emit('update:value', input.value);
}

const sizes = {
  xl: 'h-10 px-3 gap-x-2 text-base',
  lg: 'h-9 px-3 gap-x-2 text-sm',
  md: 'h-8 px-2.5 gap-x-1.5 text-sm',
  sm: 'h-7 px-2.5 gap-x-1.5 text-xs',
  xs: 'h-6 px-2 gap-x-1 text-xs',
}

</script>
