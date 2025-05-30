<template>
	<div class="flex items-center justify-end gap-x-2 border-b border-accented">
		<div class="w-full flex items-center justify-start gap-x-2 p-2">
			<UButton 
				label="建立"
				icon="i-heroicons-plus" 
				color="primary" 
				variant="soft" 
				@click="onAddNewData"
			/>
			<UButton 
				label="修改"
				icon="i-heroicons-pencil-square-solid"
				color="neutral" 
				variant="soft" 
				@click="onChangeData"
			/>
			<UButton 
				label="刪除"
				icon="i-heroicons-trash" 
				color="error" 
				variant="ghost" 
				@click="onDeleteData"
			/>
		</div>
	</div>
	<PRView />
</template>
<script setup lang="ts">
import { h, resolveComponent, ref, useTemplateRef, onMounted } from 'vue'
import { useDebounceFn, useEventListener } from '@vueuse/core'
import type { TableColumn } from '@nuxt/ui'
import type { Item } from '../../type/types'

definePageMeta({
	keepalive: true
})
defineOptions({
	name: 'purchase-requisition'
})

async function onAddNewData() {
	// console.log('Add new data', billData.value)
	try {
		const result = await $fetch('/api/create/PO', {
      method: 'POST',
			// body: billData.value
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

</script>
