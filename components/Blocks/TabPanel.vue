<template>
  <section>
    <div class="container">
        <h2 class="h2">Tabbed Content</h2>
        <FragmentsTabPanel :items="block.items">
            <template #itemHeading="item">
                {{ item.heading }}
            </template>
            <template #itemContent="item">
                {{ item.content }}
            </template>
        </FragmentsTabPanel>
    </div>
  </section>
</template>


<script setup>
    const attrs = useAttrs();
    const block = attrs.block;
</script>
