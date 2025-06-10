<template>
  <div class="h-11 shrink-0 flex items-center justify-end gap-x-2 bg-surface border-b border-surface-200">
    <slot name="toolbar">
      <div class="w-full flex items-center justify-start gap-x-2 px-4">
        <CommonDropdownList
          :items="[
            { label: '新增空白表單', icon: 'i-heroicons-plus', action: onAddNewBlank },
            { label: '匯入 Excel (CSV)', icon: 'i-heroicons-arrow-right-end-on-rectangle', action: onImportExcel },
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
      <div class="w-full flex items-center justify-center">
        <CommonPopover>
          <template #activator="{ open, close }">
            <CommonInput
              type="text"
              placeholder="搜尋"
              :value="queryText"
              class="w-64"
              @focus="open"
            />
          </template>
          <template #default="{ close }">
            <div class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <CommonInput
                  type="text"
                  placeholder="搜尋編號"
                  v-model="queryText"
                />
                <CommonButton
                  label="清除搜尋"
                  variant="outlined"
                  @click="queryText = ''"
                />
              </div>
              <div v-if="filterList?.length" class="w-full">
                <table class="w-full">
                  <thead class="*:px-2 text-xs font-normal text-dimmed">
                    <!-- TODO: hardcoded columns for now -->
                    <th class="text-left">編號</th>
                    <th class="text-right">日期</th>
                  </thead>
                  <tbody>
                    <tr v-for="item, lIdx in filterList.filter(list => list.title.includes(queryText))" :key="lIdx"  
                      class="*:px-2 *:py-1.5 text-sm text-default hover:bg-surface-100 active:bg-surface-200 rounded-md cursor-pointer"
                      @click.stop="onClickFilterItem(item.key)"
                    >
                      <td class="text-left">{{ item.title }}</td>
                      <td class="text-right">{{ item.createDate }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </template>
        </CommonPopover>
      </div>
    </slot>
  </div>
  <div class="grow overflow-auto bg-surface px-6">
    <slot />
  </div>
</template>
<script setup lang="ts">
const {
  currentTabId,
} = storeToRefs(useMainTabsStore());

const {
  viewModels,
  getViewModel,
  updateValue
} = useViewModels();

const { openFile, readFile } = useFiles();

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

async function onImportExcel() {
  const jsonData = await openFile();
  console.log(jsonData);
}

const filterList = ref<object[]>([])
const queryText = ref('');

onMounted(async () => {
	const { data: result } = await useFetch('/api/readFiles/PO')
  if (result.value) {
    filterList.value = result.value.map((r) => {
      return {
        key: r.id.split('.')[0],
        title: r.id.split('.')[0],
        // TODO: orderDate should be changed to createDate 
        createDate: r.orderDate
      }
    })
  }
});

async function onClickFilterItem(id: string) {
  if (!id) return
  const result = await readFile(id);
  console.log(result)
  let viewModel = viewModels.value[currentTabId.value];
  viewModel.values = result || {};
}
</script>
