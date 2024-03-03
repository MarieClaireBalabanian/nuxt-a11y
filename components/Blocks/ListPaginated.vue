<template>
	<section class="paginated-list">
		<div class="container">
			<div v-if="noResults">
				<p class="">Sorry, no matches found!</p>
			</div>
			<ul class="results" ref="listRef" tabindex="-1">
				<li v-for="(item, index) in posts" :key="`item-${index}`" ref="resultRef">
					<a class="link" href="/">
						Hello
						<br />
						Item # {{ index + currentPage }}
					</a>
				</li>
			</ul>

			<FragmentsPagination
				v-if="totalPages > 1 && !loading"
				:totalPages="totalPages"
				:currentPage="currentPage"
				@changePage="changePage"
				:limit="limit"
				content="Blog Posts"
			/>
		</div>
	</section>
</template>

<script setup>
	const currentPage = ref(1);
	const limit = ref(3); // how many items fetched at a time
	const offset = ref(0);
	const count = ref(0); // count of total items from that endpoint
	const posts = ref([]);
	const loading = ref(true);
	const initialLoad = ref(true);

	const listRef = ref();
	const resultRef = ref([]);

	const totalPages = computed(() => {
		return Math.ceil(count.value / limit.value);
	})

	const noResults = computed(() => {
		return posts.value?.length === 0 && !initialLoad.value && !loading.value;
	});

	const changePage = (val) => {
		currentPage.value = val;
		fetchPosts();
		nextTick(() => {
			reset();
		})
	};

	const reset = () => {
		const firstItem = resultRef.value[0];
		if (firstItem) {
			window.scrollTo({
				top: firstItem.getBoundingClientRect().top + window.scrollY,
				left: 0,
				behavior: 'smooth',
			});
		}
		const focusable = firstItem.querySelector('.link');
		if (focusable) {
			focusable.focus({
				preventScroll: true,
			});
		} else {
			listRef.value.focus({
				preventScroll: true,
			});
		}
	};

	const fetchPosts = () => {
		// fake api call
		posts.value = [1, 2, 3];
		count.value = 30; // pretending there's 10 total pages worth, 30 posts
		loading.value = false;
		if (initialLoad.value) initialLoad.value = false;
	};

	onMounted(() => {
		fetchPosts();
	});
</script>

<style lang="scss">
	.paginated-list {
		.results {
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
