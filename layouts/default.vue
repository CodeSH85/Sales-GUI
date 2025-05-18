<template>
	<div class="w-screen h-screen flex">
		<div class="flex-shrink-0 w-[256px] h-full border-r border-[#B5B5B5] bg-white overflow-auto">
			<NavBar></NavBar>
		</div>
		<div class="flex-grow h-full flex flex-col bg-[#FAFAFA] overflow-auto">
			<div class="w-full h-10 flex-shrink-0 border-b border-accented">
				<MainTabs></MainTabs>
			</div>
			<div class="w-full flex-grow bg-white">
				<slot />
			</div>
		</div>
	</div>
</template>
<script setup>
</script>