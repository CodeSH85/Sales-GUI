<template>
  <div class="h-11 flex items-center justify-end gap-x-2 bg-surface border-b border-surface-200">
    <slot name="toolbar">
      <div class="w-full flex items-center justify-start gap-x-2 p-2">
        <CommonDropdownList
          :items="[
            { label: '新增空白表單', icon: 'i-heroicons-plus', action: onAddNewBlank },
            { label: '匯入 Excel (CSV)', icon: 'i-heroicons-arrow-right-end-on-rectangle', action: onImportCSV },
          ]"
          label="新增"
          icon="i-heroicons-plus"
          size="sm"
          :showDropdownIcon="false"
        />
        <CommonButton
          label="編輯"
          icon="i-heroicons-pencil-square-solid"
          size="sm"
          variant="text" 
          @click="onChangeData"
        />
        <CommonButton 
          label="刪除"
          icon="i-heroicons-trash" 
          color="error" 
          variant="text" 
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

async function onAddNewBlank() {
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

async function onImportCSV() {
	console.log('import excel')
  const file = await open({
    multiple: false,
    directory: false,
  });
  console.log(file);
}
</script>