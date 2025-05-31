<template>
	<div class="w-screen h-screen flex">
		<div class="flex-shrink-0 w-[200px] h-full border-r border-[#B5B5B5] bg-white overflow-auto">
			<NavBar></NavBar>
		</div>
		<div class="flex-grow h-full flex flex-col bg-[#FAFAFA] overflow-auto">
			<div class="w-full h-10 flex-shrink-0 border-b border-accented">
				<MainTabs></MainTabs>
			</div>
			<div class="w-full flex-grow bg-white">
				<!-- <slot /> -->
				<keep-alive :include="catchedPages">
					<NuxtPage />
				</keep-alive>
			</div>
		</div>
	</div>
</template>
<script setup>
import { onMounted } from 'vue';
const { catchedPages, tabs } = storeToRefs(useMainTabsStore())
onMounted(() => {
	if (tabs.value.length === 0) {
    navigateTo('/');
  }
});
</script>