<template>
  <li class="accordion-item">
    <button
      :aria-expanded="open.toString()"
      :aria-controls="'sect' + index"
      @click="toggle"
      class="accordion-button"
    >
      <slot name="title" />
      <svg
        aria-hidden="true"
        focusable="false"
        :class="{ open: open }"
        width="11px"
        height="8px"
        viewBox="0 0 11 8"
      >
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g
            transform="translate(-1022.000000, -746.000000)"
            stroke="#722F14"
            stroke-width="1.5"
          >
            <polyline
              transform="translate(1027.869585, 749.500000) rotate(90.000000) translate(-1027.869585, -749.500000)"
              points="1025.36959 745 1030.36959 749.5 1025.36959 754"
            ></polyline>
          </g>
        </g>
      </svg>
    </button>

    <div role="region" :id="'sect' + index" class="wrapper">
      <transition
        name="grow"
        @before-enter="beforeEnter"
        @enter="enter"
        @before-leave="beforeLeave"
        @leave="leave"
      >
        <div ref="bodyInner" v-show="open">
          <div class="body-inner">
            <slot name="body"></slot>
          </div>
        </div>
      </transition>
    </div>
  </li>
</template>

<script setup>
const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  item: {
    type: Object,
    required: true,
  },
});

const open = ref(false);
const bodyInner = ref(null);

const toggle = () => {
  open.value = !open.value;
};

const beforeEnter = () => {
  bodyInner.value.style.height = "0";
};
const enter = () => {
  bodyInner.value.style.height = bodyInner.value.scrollHeight + "px";
};
const beforeLeave = () => {
  bodyInner.value.style.height = bodyInner.value.scrollHeight + "px";
};
const leave = () => {
  bodyInner.value.style.height = "0";
};
</script>

<style lang="scss">
.accordion-item {
  border-bottom: 1px solid brown;

  .grow-leave-active,
  .grow-enter-active {
    transition: 0.25s ease;
  }

  .accordion-button {
    padding: 20px 5px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      max-width: calc(100% - 30px);
    }

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  .wrapper {
    overflow: hidden;
  }

  .body-inner {
    padding: 20px 5px;
  }

  svg {
    flex-shrink: 0;
    transition: transform 0.25s ease-in-out;

    polyline {
      stroke: black;
    }

    &.open {
      transform: rotate(180deg);
    }
  }
}
</style>
