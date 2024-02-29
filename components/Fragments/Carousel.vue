<template>
  <section class="carousel-component" v-if="items?.length">
    <!-- <NuxtLink :to="" -->
    <div
      class="carousel-slides-wrapper"
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
      ref="slidesRef"
    >
      <span class="sr-only">Carousel with {{ items.length }} slides</span>
      <div
        class="slide"
        v-for="(item, index) in items"
        :key="item.title"
        ref="slideRef"
        role="group"
        aria-roledescription="slide"
        :aria-hidden="(index !== currentIndex).toString()"
        :aria-label="`Slide ${index + 1} of ${items.length}`"
      >
        <slot name="item" v-bind="item" />
      </div>
    </div>

    <div
      role="group"
      aria-label="Slide controls"
      v-if="items?.length > 1"
      class="dots"
    >
      <button
        v-for="i in items?.length"
        :key="`dot-${i}`"
        type="button"
        class="dot"
        :class="{ active: currentIndex === i - 1 }"
        :aria-current="currentIndex === i - 1 ? 'true' : 'false'"
        :aria-disabled="currentIndex === i - 1 ? 'true' : 'false'"
        @click="navigate(i)"
      >
        <span v-if="currentIndex === i - 1" class="sr-only"
          >Current Slide: {{ i }} of {{ items.length }}</span
        >
        <span v-else class="sr-only"
          >Go to Slide {{ i }} of {{ items.length }}</span
        >
      </button>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
const { items } = toRefs(props);

// Refs
const currentIndex = ref(0);
const scroll = ref(0);
const initialX = ref(null);
const slidesRef = ref(null);
const slideRef = ref([]);


// Carousel  Navigation Functions
const navigate = (i) => {
  if (i === currentIndex.value) return;
  currentIndex.value = i - 1;
  let scroll = Math.ceil(slideRef.value[0].clientWidth);

  const container = slidesRef.value;
  if (container) {
    container.scroll({
      top: 0,
      left: (i - 1) * scroll,
      behavior: "smooth",
    });
  }
  announce();
};

const previous = () => {
  let nextIndex = currentIndex.value - 1;
  if (nextIndex >= 0) {
    nextIndex = nextIndex + 1;
    navigate(nextIndex);
  }
};
const next = () => {
  let nextIndex = currentIndex.value + 1;
  if (nextIndex <= items.value.length - 1) {
    nextIndex = nextIndex + 1;
    navigate(nextIndex);
  }
};


// Carousel ARIA 
const announce = () => {
  const attributes = [
    { name: "aria-hidden", type: "false" },
    { name: "aria-live", type: "polite" },
    { name: "aria-atomic", type: "true" },
  ];

  let els = slideRef.value;
  els.forEach((el, index) => {
    if (index === currentIndex.value) {
      attributes.forEach((attr) => {
        el.setAttribute(attr.name, attr.type);
      });
    } else {
      attributes.forEach((attr) => {
        el.removeAttribute(attr.name);
      });
    }
  });
};


// Swipe Events
const touchStart = (e) => {
  initialX.value = e.changedTouches[0].screenX;
};

const touchEnd = (e) => {
  let currentX = e.changedTouches[0].screenX;
  let diffX = initialX.value - currentX;

  if (diffX > 15) next();
  if (diffX < -15)  previous();

  initialX.value = null;
  e.preventDefault();
};

onMounted(() => {
  if (process.client) {
    slidesRef.value.addEventListener("touchstart", touchStart, false);
    slidesRef.value.addEventListener("touchend", touchEnd, false);
  }
});

onBeforeUnmount(() => {
  if (process.client) {
    slidesRef.value.removeEventListener("touchstart", touchStart);
    slidesRef.value.removeEventListener("touchend", touchEnd);
  }
});
</script>

<style lang="scss" scoped>
.carousel-component {
  padding: 25px 0;
  @media (min-width: 1024px) {
    padding: 50px 0 25px;
  }

  .copy {
    text-align: center;
    margin-bottom: 25px;
    @media (min-width: 1024px) {
      margin-bottom: 45px;
    }
    h2 {
      max-width: 800px;
      margin: 0 auto 25px;
      color: gray;
    }
    p {
      max-width: 270px;
      margin: 0 auto;
      border-bottom: 1px solid gray;
      padding-bottom: 50px;
    }
    @media (min-width: 768px) {
      h2 {
        max-width: 800px;
      }
      p {
        max-width: 664px;
      }
    }
  }

  .carousel-slides-wrapper {
    display: flex;
    flex-flow: row nowrap;
    overflow: hidden;
    -ms-scroll-snap-type: x mandatory;
    scroll-snap-type: x mandatory;
    scroll-snap-align: start;
    cursor: default;

    &::-webkit-scrollbar {
      display: none;
    }

    .slide {
      flex-shrink: 0;
      scroll-snap-align: start;
      width: 100%;
    }
  }

  .dots {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;

    .dot {
      width: 30px;
      height: 30px;
      background: transparent;
      display: block;
      // border-radius: 50%;
      padding: 0;
      border: 0;
      cursor: pointer;
      transition: background 0.3s;
      position: relative;

      &::before {
        display: block;
        position: absolute;
        content: "";
        border-radius: 50%;
        width: 12px;
        height: 12px;
        background: gray;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: 0.25s ease;
      }

      &:hover,
      &:focus {
        &::before {
          background: green;
        }
      }

      &.active {
        &::before {
          background: blue;
        }
      }
    }
  }

  .dots {
    margin-top: 30px;

    @media (min-width: 768px) {
      margin-top: 45px;
    }
  }
}
</style>
