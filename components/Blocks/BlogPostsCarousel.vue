<template>
  <section>
    <div class="container">
      <h2 class="h2">Carousel</h2>
    </div>
    <FragmentsCarousel :items="block.items">
      <template #item="item">
        <FragmentsPostItem :item="item" />
      </template>
    </FragmentsCarousel>
  </section>
</template>

<script setup>
const attrs = useAttrs();
const block = attrs.block;
</script>

<style lang="scss">
.blog-posts-carousel {
    color: $black;
}
</style>
