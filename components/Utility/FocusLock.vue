<template>
  <div class="focus-lock" ref="focusEl">
    <div :tabindex="tabindex" @focus="focusOut('start')"></div>
    <slot></slot>
    <div :tabindex="tabindex" @focus="focusOut('end')"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  enabled: {
    type: Boolean,
    default: false,
  },
});

const { enabled } = toRefs(props);
const focusEl = ref(null);

const focusOut = (fromDirection) => {
  if (enabled.value) {
    const focusable = focusEl.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    let firstFocusable = focusable[1];
    let lastFocusable = focusable[focusable.length - 2];

    if (fromDirection === "start") lastFocusable.focus();
    else firstFocusable.focus();
  }
};

const tabindex = computed(() => {
  return enabled.value ? 0 : -1;
})
</script>
