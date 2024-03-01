<template>
  <div id="app" 
    :aria-hidden="modalActive ? true : null"
  >
    <div class="meta-actions">
      <a class="sr-only sr-only-focusable" href="#main">Skip to Content</a>
    </div>
      <GlobalHeader />
      <slot />
  </div>
</template> 

<script setup>
const { $listen } = useNuxtApp();

const modalActive = ref(false)

// lisitening to global Modal.vue component
$listen('handleModalActive', (val) => {
  modalActive.value = val;
  if (val) document.body.classList.add('lock-scroll');
  else document.body.classList.remove('lock-scroll');
});

</script>