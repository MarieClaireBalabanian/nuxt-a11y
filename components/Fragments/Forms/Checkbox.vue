<template>
  <div class="section" >
    <!-- <button class="accordion-trigger bold" @click="openItem">
      <svgs-plus v-show="!open" />
      <svgs-minus v-show="open" />
      {{ name }}
      <span v-if="activeItems.length > 0">({{ activeItems.length }})</span>
    </button>

    <transition
      name="grow"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div class="inner" v-show="open" ref="inner">
        <div class="content">
          <div class="all checkbox-wrapper">
            <input
              type="checkbox"
              :id="`${slug}-all`"
              @click="selectAll"
              :checked="allSelected"
            />
            <label for="`${slug}-all`">{{
              allSelected ? "Deselect All" : "Select All"
            }}</label>
          </div>
          <div class="checkboxes">
            <div v-for="item in items" class="checkbox-wrapper">
              <input
                type="checkbox"
                :id="`${slug}-${item.id}`"
                :value="item.id"
                v-model="activeItems"
                :checked="activeItems.includes(item.id)"
              />
              <label :for="`${slug}-${item.id}`">{{ item.title }}</label>
            </div>
          </div>
        </div>
      </div>
    </transition> -->
    hi
  </div>
</template>


