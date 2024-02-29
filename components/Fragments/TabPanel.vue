<template>
  <section class="tab-section">
    <div class="tablist" role="tablist">
      <button
        v-for="(item, index) in items"
        role="tab"
        :id="`tab-${index}`"
        ref="tabRef"
        :class="['tab', { active: index === activeTab }]"
        :aria-selected="index === activeTab ? true : false.toString()"
        :key="`buttontab${index}`"
        :aria-controls="`tab-panel-${index}`"
        :tabindex="index === activeTab ? 0 : -1"
        @keyup.right="arrowFocus('right')"
        @keyup.left="arrowFocus('left')"
        @click="navigateTo(index)"
      >
        <slot name="itemHeading" v-bind="item" />
      </button>
    </div>

    <div ref="tabPanelRef" class="tab-panel-wrapper">
      <div
        v-for="(item, index) in items"
        :id="`tab-panel-${index}`"
        :key="`paneltab${index}`"
        role="tabpanel"
        class="tab-panel"
        :aria-labelledby="`tab-${index}`"
      >
        <div class="tab-panel-inner" v-show="index === activeTab">
          <slot name="itemContent" v-bind="item" />
          <a href="/" class="button button-red">BUTTON</a>
        </div>
      </div>
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

const activeTab = ref(0);
const tabRef = ref([]);
const tabPanelRef = ref(null);

const arrowFocus = (direction) => {
  let currentFocus = document.activeElement.getAttribute("id");
  let currentIndex = parseInt(currentFocus.charAt(currentFocus.length - 1));
  let tabs = tabRef.value;

  let nextFocus;
  tabs.forEach((item, index) => {
    if (index === currentIndex) {
      if (direction === "right") {
        if (index >= 0 && index < tabs.length - 1) nextFocus = index + 1;
        else nextFocus = 0;
      } else if (direction === "left") {
        if (index > 0) nextFocus = index - 1;
        else nextFocus = tabs.length - 1;
      }
    }
  });
  document.getElementById(`tab-${nextFocus}`).focus();
};

const navigateTo = (i) => {
  activeTab.value = i;
  const diff = i - activeTab.value;
  const scroll = Math.floor(tabPanelRef.value.clientWidth) * diff;
  tabPanelRef.value.scrollBy({ left: scroll, behavior: "instant" });
};
</script>


<style lang="scss">
// TODO - CONSISTENT TAB PANEL HEIGHT

.tab {
  padding: 0.5em 1em;
  margin-right: 10px;
  text-transform: uppercase;
  border: 1px solid $black;

  &.active {
    color: $white;
    background: $black;
  }
}

.tab-panel {
  background: $black;
  color: $white;
}
.tab-panel-inner {
  padding: 80px 30px;
  @extend .paragraph;
}
</style>