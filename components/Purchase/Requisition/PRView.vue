<template>
	<NuxtLayout name="content">
		<div>
			<div v-for="(section, sectionName) in groupedColModel" :key="sectionName" class="py-6 px-4 border-b border-muted">
				<div class="grid grid-cols-10 gap-4">
					<template v-for="col, cIdx in section" :key="cIdx">
						<div
							class="flex flex-col gap-1 items-start"
							:style="{
								gridColumn: `span ${col.colSpan || 4}`
							}"
						>
							<label class="text-sm font-medium">{{ col.title }}</label>
							<template v-if="col.type === 'string' || col.type === 'number'">
								<CommonInput
									:type="col.dataType === 'integer' || col.dataType === 'float' ? 'number' : 'text'"
									:placeholder="col.placeholder || col.title"
									:value="viewModel.values[col.key]"
									@update:value="(value) => updateField({ key: col.key, value })" 
								/>
							</template>
							<template v-else-if="col.type === 'select'">
								<template v-if="col.searchable">
									<USelectMenu 
										:items="billList" 
										v-model="viewModel.values[col.key]"
										size="md" 
										class="w-full"
										:value-key="'key'" 
										:label-key="'title'"
										@update:modelValue="(value) => onSelectBillID(value)"
										/>
								</template>
							</template>
							<template v-else-if="col.type === 'table'">
								<div class="flex items-center gap-x-4">
									<UButton 
										label="新增項目"
										icon="i-heroicons-plus" 
										color="primary" 
										variant="solid" 
										@click="onAddRowData"
									/>
									<UButton 
										label="刪除"
										icon="i-heroicons-trash" 
										color="error" 
										variant="subtle" 
										@click="onDeleteRowData"
									/>
								</div>
								<div class="w-full h-full overflow-auto">
									<UTable 
										ref="table"
										:columns="columns"
										:data="viewModel.values.items" 
										sticky
										class="flex-1"
										:ui="{
											thead: 'border border-[#B5B5B5]',
											th: 'border border-[#B5B5B5]  max-w-[250px] text-nowrap text-base',
											tr: 'p-0',
											td: 'border border-accented p-0 [&:has([role=checkbox])]:px-4',
										}"
									/>
								</div>
							</template>
						</div>
					</template>
				</div>
			</div>
		</div>
	</NuxtLayout>
</template>
<script setup lang="ts">
import { h, resolveComponent, ref, useTemplateRef, onMounted } from 'vue'
import { useDebounceFn, useEventListener } from '@vueuse/core'
import { useViewModelsStore } from '~/stores/useViewModelsStore';
import type { Item, ViewModel } from '~/type/types';
import type { TableColumns } from '~/type/table/tableTypes';

const {
  setViewModel,
  getViewModel,
} = useViewModelsStore();

const billList = ref<object[]>([])

onMounted(async () => {
	console.log('onMounted purchase-requisition');
  setViewModel('purchase-requisition', colModel);

	const { data: result, status } = await useFetch('/api/readFiles/PO')
	if (result.value) {
		billList.value = result.value.map((r) => {
			return {
				key: r.id.split('.')[0],
				title: r.id.split('.')[0]
			}
		})
	}
});

const viewModel = computed(() => {
	return getViewModel('purchase-requisition')
});

const groupedColModel = computed(() => {
  const grouped: Record<string, Item[]> = {};
	if (!viewModel.value?.items) return grouped;
  for (const col of viewModel.value.items) {
    const section = col.section || '';
    if (!grouped[section]) grouped[section] = [];
    grouped[section].push(col);
  }
	// console.log(grouped)
  return grouped;
});

/* ===== Function ===== */
const { file, getFile } = useFiles();
async function onSelectBillID(value: string) {
	// const result = await $fetch(`/api/get/${value}`)
	// viewModel.value.values = result;
	const result = getFile(value);
	console.log('onSelectBillID', value, result);
}

const updateField = useDebounceFn(({ key, value, field, index }) => {
	if (key && field) {
		if (!viewModel.value?.values[key]) {
			viewModel.value.values[key] = [];
		}
		viewModel.value.values[key][index][field] = value;
	} else if (key) {
		viewModel.value.values[key] = value;
	}
}, 200)

/* ===== Table ===== */
const table = useTemplateRef('table')
// const UInput = resolveComponent('UInput')
const CommonInput = resolveComponent('CommonInput')
const UCheckbox = resolveComponent('UCheckbox')

function onAddRowData() {
	if (!viewModel.value?.values?.items) {
		viewModel.value.values.items = [];
	}
	viewModel.value.values.items.push({})
}
function onDeleteRowData() {
	const selectedRows = table.value?.[0].tableApi?.getFilteredSelectedRowModel().rows || []
	console.log(selectedRows)
	if (selectedRows.length) {
		const selectedRowsIdx = selectedRows.map(row => row.index)
		const result = removeByIndexes(viewModel.value?.values.items, selectedRowsIdx)
		viewModel.value.values.items = result;
	}
}
function removeByIndexes(array, indexesToRemove) {
	if (!indexesToRemove) return array
  return array.filter((_, index) => !indexesToRemove.includes(index));
}

type columnsType = {
	itemId: string
  name: string
  quantity: number
	unitPrice: number
	description?: string
}


const columns = computed<TableColumns<columnsType>[]>(() => {
	const columnsArr:TableColumns<columnsType>[] = [];
	const createColumn = (col: Item): TableColumns<columnsType> =>  ({
    id: col.key as keyof columnsType,
    accessorKey: col.key as keyof columnsType,
    header: () => h('div', {}, (col.title || '')),
		cell: ({ row }) => {
			return h('div', {
				class: 'p-0.5 focus-within:inset-ring-2 focus-within:ring-gray-900 rounded'
			}, [
				h(CommonInput, {
					size: 'md',
					value: row.getValue(col.key),
					type: col.type === 'number' ? 'number' : 'text',
					class: 'h-8 w-full border-0 !shadow-none focus:!ring-0',
					'onUpdate:modelValue': (value) =>
						updateField({
							key: 'items',
							value,
							field: col.key,
							index: row.index
						})
				})
			]);
		},
    minSize: 10,
  });

	itemColModel.forEach((col, cIdx) => {
		if (cIdx === 0) {
			columnsArr.push({
				id: 'select',
				header: ({ table }) =>
					h(UCheckbox, {
						modelValue: table.getIsSomePageRowsSelected()
							? 'indeterminate'
							: table.getIsAllPageRowsSelected(),
						'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
							table.toggleAllPageRowsSelected(!!value),
						'aria-label': 'Select all'
					}),
				cell: ({ row }) =>
					h(UCheckbox, {
						modelValue: row.getIsSelected(),
						'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
						'aria-label': 'Select row'
					})
			})
		} 
		columnsArr.push(createColumn(col))
	})
	return columnsArr
})

const itemColModel: Item[] = [
  {
    key: 'itemId',
    title: '項目編號',
		dataType: 'character',
    type: 'string',
  },
  {
    key: 'name',
    title: '名稱',
		dataType: 'character',
    type: 'string'
  },
  {
    key: 'quantity',
    title: '數量',
		dataType: 'integer',
    type: 'number'
  },
  {
    key: 'unitPrice',
    title: '單價',
		dataType: 'float',
    type: 'number'
  },
  {
    key: 'description',
    title: '描述',
		dataType: 'character',
    type: 'string'
  }
];

const colModel: Item[] = [
	{
		key: 'id',
		title: '選擇採購單',
    dataType: 'character',
		type: 'select',
		searchable: true,
		colSpan: 2, 
		section: '單號'
	},
	{
		key: 'orderDate',
		title: '日期',
    dataType: 'character',
		type: 'string',
		colSpan: 1, 
		section: '基本資訊'
	},
	{
		key: 'division',
		title: '部門',
    dataType: 'character',
		type: 'string',
		colSpan: 1, 
		section: '基本資訊'
	},
	{
		key: 'createdBy',
		title: '申請人',
    dataType: 'character',
		type: 'string',
		colSpan: 1, 
		section: '基本資訊'
	},
	{
		key: 'vendorId',
		title: '廠商編號',
    dataType: 'character',
		type: 'string',
		colSpan: 1, 
		section: '廠商資訊'
	},
	{
		key: 'vendorName',
		title: '廠商名稱',
    dataType: 'character',
		type: 'string',
		colSpan: 3, 
		section: '廠商資訊'
	},
	{
		key: 'items',
    title: '項目明細',
    dataType: 'array',
    type: 'table',
    colSpan: 10,
    section: '項目明細',
		items: itemColModel,
	}
];

</script>
<style scoped>

</style>