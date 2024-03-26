<template>
  <div
    class="form-field select-container"
    :class="{ 'has-value': modelValue !== '0'}"
  >
    <label :for="name" class="sr-only">{{ label }}</label>
    <select
      ref="select"
      @change="$emit('update:modelValue', $event.target.value)"
      :id="name"
      :aria-describedby="error ? name + '-error' : null"
      :aria-required="required ? true : false.toString()"
      :aria-invalid="error ? true : null"
    >
      <option v-if="placeholder" value="0" disabled>{{ placeholder }}</option>
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
        :title="option.name"
        :aria-selected="option.value === modelValue ? true : null"
      >
        {{ option.name }}
      </option>
    </select>
    <SvgsSelectArrow class="arrow" />
  </div>
</template>


<script setup>
const emit = defineEmits(['update:modelValue'])

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
  labelStyle: {
    type: String,
    required: false,
    default: "static",
  },
  error: {
    type: String,
    required: false,
  },
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: [String, Boolean],
    required: false,
    default: false
  }
});

const { modelValue, options, placeholder } = toRefs(props)

onMounted(() => {
  if (!placeholder.value) updateValue(options.value[0].value)
  else updateValue("0")
})
</script>  

<style lang="scss">
.select-container {
  &.form-field {
    select {
      background: $white;
      color: $black;
    }

    .arrow {
      position: absolute;
      right: 5px;
      top: 50%;
      transform: translateY(-50%);
      pointer-events: none;
    }
  }
}

</style>