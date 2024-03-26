<template>
  <div
    class="form-field textarea"
    :class="{ error: error, 'has-value': !!modelValue, focused: focused }"
  >
    <label :for="name" :class="[{ 'sr-only': srOnlyLabel }, labelStyle]">
      {{ label }}<span v-if="required" aria-hidden="true">*</span>
    </label>

    <textarea
      :value="modelValue"
      @focus="focused = true"
      @input="$emit('update:modelValue', $event.target.value)"
      :aria-required="required.toString()"
      :aria-invalid="error ? true : null"
      :id="name"
      :name="name"
    />
    <p class="error text-white" v-if="error" :id="name + '-error'">{{ error }}</p>
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
  srOnlyLabel: {
    type: Boolean,
    required: false,
    default: false,
  },
  labelStyle: {
    type: String,
    required: false,
    default: "absolute",
  },
  error: {
    type: String,
    required: false,
  },
});

const focused = ref(null);

</script>