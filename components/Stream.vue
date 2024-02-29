<template>
  <div class="stream">
    <component
      v-for="(block, index) in page"
      :key="`stream-${index}`"
      :is="`Blocks${block.type}`"
      ref="block"
      tabindex="-1"
      class="block"
      :block="block"
      :streamID="index"
      :class="`block-${block.type.toLowerCase()}`"
    >
    </component>
  </div>
</template>

<script setup>
    import page from '~/assets/data.json';

</script>