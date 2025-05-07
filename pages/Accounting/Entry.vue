<template>
	<div class="pt-6">
		<div class="flex items-center py-6 px-4 gap-4 border-y border-accented">
			<div class="flex flex-col gap-1 items-start">
				<label class="text-xl font-medium">日期</label>
				<UInput 
					size="lg"
					class="w-[250px]" 
				/>
			</div>
			<div class="flex flex-col gap-1 items-start">
				<label class="text-xl font-medium">廠商編號</label>
				<UInput 
					size="lg"
					class="w-[120px]" 
				/>
			</div>
			<div class="flex flex-col gap-1 items-start">
				<label class="text-xl font-medium">廠商名稱</label>
				<UInput 
					size="lg"
					class="w-[320px]"
				/>
			</div>
			<div class="flex flex-col gap-1 items-start">
				<label class="text-xl font-medium">發票號碼</label>
				<UInput 
					size="lg"
					class="w-[250px]"
				/>
			</div>
		</div>
		<UTabs
			:items="tabItems"
			color="neutral" 
			variant="link" 
			:content="false" 
			class="w-full" 
			size="xl"
			:ui="{
				list: 'bg-[#F5F5F5]',
				trigger: 'w-[200px]',
			}"
		/>
	</div>
</template>
<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const tabItems = ref<TabsItem[]>([
  {
    label: '分頁 1'
  },
  {
    label: '分頁 2'
  }
])
</script>
