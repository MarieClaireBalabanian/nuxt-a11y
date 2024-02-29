<template>
	<section class="load-more-list">
		<div class="container">
			<div v-if="noResults">
				<p class="">Sorry, no matches found!</p>
			</div>
			<ul class="results" ref="listRef" tabindex="-1">
				<li v-for="(item, index) in items" :key="`card-${index}`" ref="resultRef">
					<slot name="item" v-bind="item" />
				</li>
			</ul>
			<button @click="loadMore">Load More</button>
		</div>
	</section>
</template>

<script setup>

const props = defineProps({
	items: {
		type: Array,
		required: true,
	}
})

const {items} = toRefs(props);

	const currentPage = ref(1);
	const perPage = ref(3); // how many items fetched at a time
	const totalPosts = ref(0); // count of total items from that endpoint
	const posts = ref([]);
	const loading = ref(true);
	const initialLoad = ref(true);
	const listRef = ref();
	const resultRef = ref([]);
	const itemRef = ref([]);


	const noResults = computed(() => {
		return posts.value?.length === 0 && !initialLoad.value && !loading.value;
	});

	const loadMore = () => {
		currentPage.value += 1;
		const params = {
			count: perPage.value,
			page: currentPage.value,
		};
		// fake api call with fake params and concat 3 items
		posts.value = [...posts.value, ...[0, 0, 0]];

		///////////////////////////////////////////////////////////
		//// This is what is important for focus management ///////
		///////////////////////////////////////////////////////////
		nextTick(() => {
			// Move focus to the first newly revealed item
			let firstFocus = 'card-' + (currentPage.value * perPage.value - perPage.value);
			document.getElementById(firstFocus).focus();
		});
	};

	onMounted(() => {
		/// just fake nonsense api shit
		// const results = await this.$axios.$get("mess/v1/recent-news", { params });
		posts.value = [0, 0, 0];
		totalPosts.value = 20;
		loading.value = false;
		if (initialLoad.value) initialLoad.value = false;
	});
</script>

<style lang="scss">
	.load-more-list {
		margin-top: 100px;
		.results {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-gap: 20px;
			li {
				margin-bottom: 30px;
				a {
					display: block;
					padding: 20px;
					border: 1px solid black;
				}
			}
		}
	}
</style>
