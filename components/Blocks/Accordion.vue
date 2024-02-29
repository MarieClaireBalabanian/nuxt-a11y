<template>
	<section class="accordion-block">
		<div class="container">
			 <h2 class="h2">Accordion</h2>
			<ul class="accordion-list">
				<FragmentsAccordionItem
					v-for="(item, index) in block.items"
					:item="item"
					:index="index"
					:key="`accord-item-${index}`">
					<template #title>
						<h3 class="h3">{{ item.heading }}</h3>
					</template>
					<template #body>
						<div class="paragraph" v-html="item.content"></div>
					</template>
				</FragmentsAccordionItem>
			</ul>
		</div>
	</section>
</template>

<script setup>
	const attrs = useAttrs();
	const block = attrs.block;
</script>

<style lang="scss">

</style>
