<template>
  <div class="h-11 flex items-center justify-end gap-x-2 bg-surface border-b border-surface-200">
    <slot name="toolbar">
      <div class="w-full flex items-center justify-start gap-x-2 p-2">
        <UButton 
          label="建立"
          icon="i-heroicons-plus" 
          color="primary" 
          variant="solid" 
          size="sm"
          @click="onAddNewData"
        />
        <UButton 
          label="匯入"
          icon="i-heroicons-arrow-down-on-square" 
          color="neutral" 
          variant="ghost" 
          size="sm"
          @click="onImportExcel"
        />
        <UButton 
          label="修改"
          icon="i-heroicons-pencil-square-solid"
          color="neutral" 
          variant="ghost" 
          size="sm"
          @click="onChangeData"
        />
        <UButton 
          label="刪除"
          icon="i-heroicons-trash" 
          color="error" 
          variant="ghost" 
          size="sm"
          @click="onDeleteData"
        />
      </div>
    </slot>
  </div>
  <slot />
</template>
<script setup lang="ts">
import { open } from '@tauri-apps/plugin-dialog';

async function onAddNewData() {
	try {
		const result = await $fetch('/api/create/PO', {
      method: 'POST',
			// body: viewModel.value.values
    })
    console.log(result)
	} catch (err) {
		console.error('Error creating PO:', err)
	}
}

function onChangeData() {
	console.log('Change data')
}
function onDeleteData() {
	console.log('Delete data')
}

async function onImportExcel() {
	console.log('import excel')
  const file = await open({
    multiple: false,
    directory: false,
  });
  console.log(file);
}
</script>