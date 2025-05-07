<template>
	<div class="w-screen h-screen flex">
		<div class="flex-shrink-0 w-[256px] h-full border-r border-[#B5B5B5] bg-white overflow-auto">
			<NavBar></NavBar>
		</div>
		<div class="flex-grow h-full flex flex-col bg-[#F5F5F5] overflow-auto">
			<div class="w-full h-12 flex-shrink-0">
			</div>
			<div class="w-full flex-grow bg-white border-t border-[#B5B5B5]">
				<slot />
			</div>
		</div>
	</div>
</template>
<script setup>
</script>