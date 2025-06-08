<template>
	<div class="w-screen h-screen flex">
		<div class="flex-shrink-0 w-[256px] h-full border-r border-surface-300 bg-sidebar overflow-auto">
			<NavBar></NavBar>
		</div>
		<div class="flex-grow h-full flex flex-col bg-surface overflow-auto">
			<div class="w-full h-9 flex-shrink-0 border-b border-surface-300 bg-tabbar">
				<MainTabs></MainTabs>
			</div>
			<div class="w-full flex-grow flex flex-col bg-surface overflow-hidden">
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