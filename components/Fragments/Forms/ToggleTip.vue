<template>
	<div class="toggletip-container" ref="toggletipRef">
		<button
			type="button"
			aria-label="More Information"
			@click="toggleBubble"
			@keyup.esc="closeAndFocus"
			ref="triggerRef"
		>
			<svg
				class="svg-icon"
				style="width: 1em; height: 1em; vertical-align: middle; fill: currentColor; overflow: hidden"
				viewBox="0 0 1024 1024"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M512 1024C229.23 1024 0 794.77 0 512S229.23 0 512 0s512 229.23 512 512-229.23 512-512 512z m-7.5-176c25.666 0 46.5-20.834 46.5-46.5S530.166 755 504.5 755 458 775.834 458 801.5s20.834 46.5 46.5 46.5z m200.251-453.21c2.579-48.654-14.936-95.375-49.535-131.57-37.071-38.987-89.507-61.327-143.77-61.22-51.47 0.108-99.823 20.192-136.141 56.602C338.986 295.012 319 343.343 319 394.789c0 21.373 17.3 38.665 38.683 38.665 21.382 0 38.682-17.292 38.682-38.665 0-63.583 51.792-115.35 115.296-115.458h0.214c32.988 0 64.794 13.533 87.251 37.161 19.771 20.73 29.764 47.043 28.367 74.216-1.182 23.306-2.364 45.324-71.67 114.6-43.303 43.283-82.63 86.566-87.895 140.16-2.042 21.266 13.431 40.277 34.707 42.317 1.29 0.108 2.578 0.215 3.868 0.215 19.664 0 36.533-14.929 38.468-34.906 2.47-25.455 26.862-54.453 65.545-93.119 76.29-76.256 91.549-115.458 94.235-165.186z"
				/>
			</svg>
		</button>
		<div class="toggletip-bubble" role="status" v-show="showing">
			<button class="x-button" type="button" aria-label="Close help text bubble" @click="closeAndFocus">
				<span aria-hidden="true">&#x2715;</span>
			</button>
			<div class="toggletip-inner">
				<slot name="content" />
			</div>
		</div>
	</div>
</template>

<script setup>
	const showing = ref(false);
	const triggerRef = ref(null);
	const toggletipRef = ref(null);

	const toggleBubble = () => {
		showing.value = !showing.value;
	};

	const closeAndFocus = () => {
		showing.value = false;
		triggerRef.value.focus();
	};

	onMounted(() => {
		if (process.client) {
			document.addEventListener('click', function (e) {
				if (showing.value) {
					nextTick(() => {
						if (!toggletipRef?.value?.contains(e.target)) {
							closeAndFocus();
						}
					});
				}
			});
		}
	});
</script>

<style lang="scss">
	.toggletip-container {
		margin-bottom: 100px;
		position: relative;
		display: inline-block;

		.toggletip-bubble {
			position: absolute;
			left: 100%;
			bottom: 100%;
			width: 300px;
			border: 1px solid black;
			padding: 20px;
		}

		.x-button {
			position: absolute;
			right: 2px;
			top: 2px;
		}

		.toggletip-inner {
			position: relative;
		}
	}
</style>
