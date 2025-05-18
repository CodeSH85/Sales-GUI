<template>
	<div class="flex items-center justify-end gap-x-2">
		<div class="w-full flex items-center justify-end gap-x-2 pt-2 px-4">
			<UButton 
				label="建立"
				icon="i-heroicons-plus" 
				color="primary" 
				variant="solid" 
				@click="onAddNewData"
			/>
			<UButton 
				label="修改"
				icon="i-heroicons-pencil-square-solid" 
				color="primary" 
				variant="subtle" 
				@click="onChangeData"
			/>
			<UButton 
				label="刪除"
				icon="i-heroicons-trash" 
				color="error" 
				variant="subtle" 
				@click="onDeleteData"
			/>
		</div>
	</div>
	<div class="pt-0">
		<div v-for="(section, sectionName) in groupedColModel" :key="sectionName" class="py-6 px-4 border-b border-accented">
			<div class="grid grid-cols-10 gap-4">
				<template v-for="col, cIdx in section" :key="cIdx">
					<div
						class="flex flex-col gap-1 items-start"
						:style="{
							gridColumn: `span ${col.colSpan || 4}`
						}"
					>
						<label class="text-base font-medium">{{ col.title }}</label>
						<template v-if="getComponent(col) === 'input'">
							<UInput 
								size="md"
								class="w-full"
								:type="col.type === 'number' ? 'number' : 'text'"
								:placeholder="col.placeholder || col.title"
								:modelValue="billData[col.key]"
								@update:modelValue="(value) => updateField({ key: col.key, value })"
							/>
						</template>
						<template v-else-if="getComponent(col) === 'select-menu'">
							<USelectMenu 
								:items="billList" 
								v-model="billID"
								size="md" 
								class="w-full"
								:value-key="'key'" 
								:label-key="'title'"
								@update:modelValue="(value) => onSelectBillID(value)"
							/>
						</template>
						<template v-else-if="getComponent(col) === 'select'"></template>
						<template v-else-if="getComponent(col) === 'table'">
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
									:data="billData.items" 
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
</template>
<script setup lang="ts">
import { h, resolveComponent, ref, useTemplateRef } from 'vue'
import { useDebounceFn, useEventListener } from '@vueuse/core'
import type { TableColumn } from '@nuxt/ui'

const billList = ref<object[]>([])
const billID = ref()
const billData= ref<object>({})
async function onSelectBillID(value: string) {
	const { data, status, error } = await useFetch(`/api/get/${value}`)
	billData.value = data.value[0];
}

onMounted(async () => {
	const { data: result, status } = await useFetch('/api/readFiles/PO')
	if (result.value) {
		billList.value = result.value.map((r) => {
			return {
				key: r[0].id.split('.')[0],
				title: r[0].id.split('.')[0]
			}
		})
	}
})

/* ===== Function ===== */
const updateField = useDebounceFn(({ key, value, field, index }) => {
	if (key && field) {
		if (!billData.value[key]) {
			billData.value[key] = [];
		}
		billData.value[key][index][field] = value;
	} else if (key) {
		billData.value[key] = value;
	}
}, 200)

function onAddNewData() {
	console.log('Add new data')
}
function onChangeData() {
	console.log('Change data')
}
function onDeleteData() {
	console.log('Delete data')
}

/* ===== Table ===== */
const table = useTemplateRef('table')
const UInput = resolveComponent('UInput')
const UCheckbox = resolveComponent('UCheckbox')

function onAddRowData() {
	if (!billData.value.items) {
		billData.value.items = []	;
	}
	billData.value.items.push({})
}
function onDeleteRowData() {
	const selectedRows = table.value?.[0].tableApi?.getFilteredSelectedRowModel().rows || []
	console.log(selectedRows)
	if (selectedRows.length) {
		const selectedRowsIdx = selectedRows.map(row => row.index)
		const result = removeByIndexes(billData.value.items, selectedRowsIdx)
		billData.value.items = result;
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

interface ColModel {
  key: string;
  title: string;
  type: 'string' | 'number' | 'select' | 'date' | 'textarea' | 'table';
  required?: boolean;
  placeholder?: string;
  combo?: Array<{ label: string; value: string }>;
  items?: ColModel[];
  searchable?: boolean;
  colSpan?: number;
  section?: string;
}

interface TableColumns<T> {
	id: keyof T;
  accessorKey: keyof T;
  header: () => VNode;
  cell: ({ row }: { row: any }) => VNode;
	minSize: number,
}

const itemColModel: ColModel[] = [
  {
    key: 'itemId',
    title: '項目編號',
    type: 'string',
  },
  {
    key: 'name',
    title: '名稱',
    type: 'string'
  },
  {
    key: 'quantity',
    title: '數量',
    type: 'number'
  },
  {
    key: 'unitPrice',
    title: '單價',
    type: 'number'
  },
  {
    key: 'description',
    title: '描述',
    type: 'string'
  }
];

const colModel: ColModel[] = [
	{
		key: 'id',
		title: '選擇採購單',
		type: 'select',
		searchable: true,
		colSpan: 2, 
		section: '單號'
	},
	{
		key: 'orderDate',
		title: '日期',
		type: 'string',
		colSpan: 1, 
		section: '基本資訊'
	},
	{
		key: 'division',
		title: '部門',
		type: 'string',
		colSpan: 1, 
		section: '基本資訊'
	},
	{
		key: 'createdBy',
		title: '申請人',
		type: 'string',
		colSpan: 1, 
		section: '基本資訊'
	},
	{
		key: 'vendorId',
		title: '廠商編號',
		type: 'string',
		colSpan: 1, 
		section: '廠商資訊'
	},
	{
		key: 'vendorName',
		title: '廠商名稱',
		type: 'string',
		colSpan: 3, 
		section: '廠商資訊'
	},
	{
		key: 'items',
    title: '項目明細',
    type: 'table',
    colSpan: 10,
    section: '項目明細',
		items: itemColModel,
	},
]

const getComponent = (col: ColModel) => {
  if (col.type === 'textarea') return 'textarea';
  if (col.type === 'select') return col.searchable ? 'select-menu' : 'select';
  if (col.type === 'date') return 'date';
  if (col.type === 'table') return 'table';
  return 'input';
};

const groupedColModel = computed(() => {
  const grouped: Record<string, ColModel[]> = {};
	// [section]: ColModel[]
  for (const col of colModel) {
    const section = col.section || '';
    if (!grouped[section]) grouped[section] = [];
    grouped[section].push(col);
  }
	console.log(grouped)
  return grouped;
});

const columns = computed<TableColumns<columnsType>[]>(() => {
	const columnsArr:TableColumns<columnsType>[] = [];
	const createColumn = (col: ColModel): TableColumns<columnsType> =>  ({
    id: col.key as keyof columnsType,
    accessorKey: col.key as keyof columnsType,
    header: () => h('div', {}, (col.title || '')),
		cell: ({ row }) => {
			return h(UInput, { 
				size: 'md', 
				modelValue: row.getValue(col.key), 
				class: 'w-full h-full',
				// variant: 'ghost',
				type: col.type || 'string',
				ui: { base: 'text-base h-8 rounded-sm ring-0' },
				'onUpdate:modelValue': (value) => 
					updateField({ 
						key: 'items',
						value,
						field: col.key,
						index: row.index
					})
			})
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
</script>
