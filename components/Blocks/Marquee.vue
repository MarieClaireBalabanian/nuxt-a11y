<template>
  <section ref="blockRef" :class="[ { paused: paused || isReduced }, 'bg-black text-white' ]">
    <button
      v-if="!isReduced"
      class="sr-only sr-only-focusable"
      @click="toggleAnimation"
    >
      {{ paused ? "Start Scroll Animation" : "Stop Scroll Animation" }}
    </button>

    <div
      class="marquee-container"
      ref="marqueeRef"
      :tabindex="paused || isReduced ? 0 : -1"
    >
      <span
        class="scroll-text"
        :class="[{ animation: startAnimation }]"
        v-for="(item, index) in contentMultiplier"
        v-html="text"
        :key="`scroll-${index}`"
      >
      </span>
    </div>
  </section>
</template>


<script setup>
const text = "<span>one</span><span>one</span><span>one</span>";

const contentMultiplier = ref(4);
const startAnimation = ref(false);
const observer = ref(null);
const blockRef = ref(null);
const marqueeRef = ref(null);
const paused = ref(false);
const isReduced = ref(false);

const initObserver = () => {
  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!isReduced.value) {
          checkMultiplier();
        }
      } else {
        startAnimation.value = false;
      }
    });
  });
  observer.observe(blockRef.value);
  observer.value = observer;
};

const checkMultiplier = () => {
  if (marqueeRef.value) {
    let targetWidth = window.innerWidth * 4;
    console.log(marqueeRef);
    let children = marqueeRef.value.children[0];
    if (children) {
      contentMultiplier.value = Math.floor(
        targetWidth / children.offsetWidth + 1
      );
      nextTick(() => {
        startAnimation.value = true;
      });
    }
  }
};
onMounted(() => {
  if (process.client) {
    isReduced.value =
      window.matchMedia(`(prefers-reduced-motion: reduce)`) === true ||
      window.matchMedia(`(prefers-reduced-motion: reduce)`).matches === true;
    initObserver();
  }
});

const toggleAnimation = () => {
  paused.value = !paused.value;
};

onUnmounted(() => {
  if (observer.value) {
    observer.disconnect();
  }
});
</script>



<style lang="scss">
.block-marquee {
  padding: 0 !important;
  .marquee-container {
    display: flex;
    overflow: hidden;
    padding: 20px 0;
  }

  .scroll-text {
    flex-shrink: 0;
    font-size: 3rem;
    line-height: 1em;
    text-transform: uppercase;

    span {
      font-size: inherit;
      padding: 0 20px;
    }
  }

  .animation {
    animation: infinate-scroll 2s infinite linear;
  }

  &.paused {
    .marquee-container {
      overflow: scroll;
    }
    .scroll-text {
      animation-play-state: paused;
    }
  }

  @keyframes infinate-scroll {
    0% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(-100%);
    }
  }

  @media (min-width: 768px) {
    .scroll-text {
      font-size: 5rem;
    }
  }
}
</style>