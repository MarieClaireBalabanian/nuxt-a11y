<template>
  <a v-if="item" :id="`post-${item.id}`" class="post-item bg-white text-black" href="/">
    <h3 class="h3">{{ item.title }}</h3>
    <p class="paragraph">
      {{ item.body }}
    </p>
  </a>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>


<style lang="scss">
.post-item {
  .paragraph {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 30px;
  }
}
</style>
