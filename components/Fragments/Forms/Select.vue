<template>
  <div class="form-field select-container" :class="{ 'has-value': !!modelValue }">
    <label :for="name" class="sr-only">{{ label }}</label>
    <select
      ref="select"
      @change="$emit('update:modelValue', $event.target.value)"
      :id="name"
      :name="name"
      :aria-describedby="error ? name + '-error' : null"
      :aria-required="required ? true : false.toString()"
      :aria-invalid="error ? true : null"

    >
      <option
        v-for="option in options"
        :disabled="option.disabled"
        :value="option.value"
        :key="option.value"
        :selected="option.name === modelValue || option.value === modelValue"
        :title="option.name"
      >
        {{ option.name }}
      </option>
    </select>
    <div class="arrow">
      <svg
        focusable="false"
        width="14"
        height="8"
        viewBox="0 0 14 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.0313 1.12793L7.02138 6.12793L1.66992 1.12793"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>
    </div>
  </div>
</template>


<script setup>
const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
  required: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    required: false,
  },
  options: {
    type: Array,
    required: true,
  }
});
</script>

<style lang="scss">
  .form-field {
    select {
      background: $white;
      color: $black;
    }
  }


</style>