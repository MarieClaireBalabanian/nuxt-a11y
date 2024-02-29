<template>
	<nav class="global-pagination" aria-label="Pagination">
		<button
			class="arrow previous"
			@click="changePage(null, 'previous')"
			:aria-disabled="currentPage === 1 ? 'true' : null"
			:class="{ disabled: currentPage === 1 }"
		>
			<span class="sr-only">go to Previous {{ limit }} {{ content }}</span>
			left-arrow
		</button>
		<ul>
			<li>
				<button
					:class="{ active: currentPage === 1 }"
					class="number"
					:aria-current="currentPage === 1 ? 'true' : 'false'"
					@click="changePage(1, null)"
				>
					<span class="sr-only" v-if="currentPage !== 1">Go to page </span>
					1
				</button>
			</li>
			<li v-for="(num, index) in truncatedPages" :key="`trunc-page-${index}`">
				<span v-if="num === 0" class="number">...</span>
				<button
					v-else
					:class="{ active: num === currentPage }"
					class="number"
					:aria-current="num === currentPage ? 'true' : 'false'"
					@click="changePage(num, null)"
				>
					<span class="sr-only" v-if="num !== currentPage">Go to page </span>
					{{ num }}
				</button>
			</li>
			<li>
				<button
					:class="{ active: totalPages === currentPage }"
					class="number"
					:aria-current="totalPages === currentPage ? 'true' : 'false'"
					@click="changePage(totalPages, null)"
				>
					<span class="sr-only" v-if="totalPages !== currentPage">Go to page </span>
					{{ totalPages }}
				</button>
			</li>
		</ul>
		<button
			class="arrow next"
			@click="changePage(null, 'next')"
			:class="{ disabled: currentPage === totalPages }"
			:aria-disabled="currentPage === totalPages ? 'true' : null"
		>
			right-arrow<span class="sr-only">go to Next {{ limit }} {{ content }}</span>
		</button>
	</nav>
</template>

<script setup>
	const emit = defineEmits(['changePage']);

	const props = defineProps({
		totalPages: {
			type: Number,
			required: true,
		},
		currentPage: {
			type: Number,
			required: true,
		},
		limit: {
			type: Number,
			required: true,
		},
		content: {
			type: String,
			required: true, // this is for sr-ony text that reminds the user what kind of content they are viewing more of. cognitive helper.
		},
	});

	const { totalPages, currentPage } = toRefs(props);
	
	const truncatedPages = ref([]);

	watch([totalPages, currentPage], ([newTotalPages, newCurrentPage], [prevTotalPages, prevCurrentPage]) => {
       truncatedPages.value = paginate(currentPage.value, totalPages.value);
    });

	const paginate = (currentPage, totalPages) => {
		if (!totalPages) return false;
		const lastPage = totalPages;

		let range = Array.from({ length: totalPages }, (v, k) => k + 1);

		if (lastPage <= 2) return false;
		if (lastPage < 7) {
			range.shift();
			range.pop();
			return range;
		}

		const isStart = currentPage <= 3;
		const isEnd = currentPage >= lastPage - 3;

		const startSlice = isStart ? 1 : isEnd ? lastPage - 5 : currentPage - 2;
		const endSlice = isEnd ? lastPage - 1 : isStart ? 5 : currentPage + 1;
		const pagesToShow = range.slice(startSlice, endSlice);

		if (!isStart) pagesToShow.unshift(0);
		if (!isEnd) pagesToShow.push(0);
		return pagesToShow;
	};

	const changePage = (num, type) => {
		let current = currentPage.value;
		if (type === 'next') {
			if (current < totalPages.value) current += 1;
		} else if (type === 'previous') {
			if (current > 1) current -= 1;
		} else {
			if (current !== num) current = num;
		}
		emit('changePage', current);
	};

	onMounted(() => {
		if (totalPages.value > 0) {
			truncatedPages.value = paginate(currentPage.value, totalPages.value);
		}
	});
</script>

<style lang="scss">
	.global-pagination {
		margin-top: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		ul {
			display: flex;
			margin-left: 20px;
			li {
				margin-right: 20px;
			}
		}

		button {
			border: 2px solid transparent;
			&:hover {
				border-color: blue;
			}
			&:focus {
				border: 2px dotted blue;
			}
		}

		.disabled {
			cursor: not-allowed;
		}
	}
</style>
