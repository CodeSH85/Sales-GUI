<template>
	<div class="pt-6">
		<div class="flex flex-col items-start py-6 px-4 gap-4 border-y border-accented">
			<div class="flex items-center gap-x-4">
				<div class="flex flex-col gap-1 items-start">
					<label class="text-base font-medium">日期</label>
					<UInput 
						size="lg"
						class="w-[250px]" 
					/>
				</div>
				<div class="flex flex-col gap-1 items-start">
					<label class="text-base font-medium">部門</label>
					<UInput 
						size="lg"
						class="w-[250px]" 
					/>
				</div>
				<div class="flex flex-col gap-1 items-start">
					<label class="text-base font-medium">申請人</label>
					<UInput 
						size="lg"
						class="w-[120px]" 
					/>
				</div>
			</div>
			<div class="flex items-center gap-x-4">
				<div class="flex flex-col gap-1 items-start">
					<label class="text-base font-medium">廠商編號</label>
					<UInput 
						size="lg"
						class="w-[120px]" 
					/>
				</div>
				<div class="flex flex-col gap-1 items-start">
					<label class="text-base font-medium">廠商名稱</label>
					<UInput 
						size="lg"
						class="w-[320px]"
					/>
				</div>
			</div>
		</div>
		<div class="w-full h-full">
			<UTable 
				:columns="columns"
				:data="rowData" 
				sticky
				class="flex-1"
				:ui="{
					thead: 'border border-[#B5B5B5]',
					th: 'border border-[#B5B5B5] px-2.5 w-[250px] text-nowrap text-base',
					td: 'border border-[#B5B5B5] p-0',
				}"
			/>
		</div>
	</div>
</template>
<script setup lang="ts">
import { h, resolveComponent } from 'vue'
import type { TableColumn } from '@nuxt/ui'

const UInput = resolveComponent('UInput')

type Items = {
  item: string
  amount: number,
	description?: string
}

const rowData = ref<Items[]>([
  {
    item: '鋁圓柱',
    amount: 50
  },
  {
    item: '鋁塊',
    amount: 100
  }
])

const columns: TableColumn<Items>[] = [
  {
    accessorKey: 'item',
    header: () => h('div', {}, '商品名稱'),
    cell: ({ row }) => {
			return h(UInput, { size: 'md', modelValue: row.getValue('item'), class: 'w-full', ui: { base: 'text-base' } })
		}
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, '數量'),
    cell: ({ row }) => {
      return h(UInput, { size: 'md', modelValue: row.getValue('amount'), class: 'w-full', ui: { base: 'text-base' } })
    }
  },
	{
    accessorKey: 'description',
    header: '備註',
    cell: ({ row }) => {
			return h(UInput, { size: 'md', modelValue: row.getValue('description'), class: 'w-full', ui: { base: 'text-base' } })
		}
  }
]
</script>
