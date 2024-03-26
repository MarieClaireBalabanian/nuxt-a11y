<template>
  <div
    class="form-field iniput"
    :class="[
      { error: error, 'has-value': !!modelValue, focused: focused },
      inputType,
    ]"
  >
    <label :for="name" :class="[{ 'sr-only': srOnlyLabel }, labelStyle]">
      {{ label }}<span v-if="required" aria-hidden="true">*</span>
    </label>

    <input
      ref="inputRef"
      :type="inputType"
      :value="modelValue"
      @focus="focused = true"
      @input="$emit('update:modelValue', $event.target.value)"
      :aria-required="required.toString()"
      :aria-invalid="error ? true : null"
      :autocomplete="autocomplete ? autocomplete : null"
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
  inputType: {
    type: String,
    required: false,
    default: "text",
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
  autocomplete: {
    type: [String, Boolean],
    required: false,
    default: false,
  },
  focusOnMount: {
    tyoe: Boolean,
    required: false,
    default: false,
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
});

const focused = ref(null);

const inputRef = ref(null);
defineExpose({
  inputRef
})

const { focusOnMount, modelValue } = toRefs(props);
onMounted(() => {
  if (process.client) {
    if (focusOnMount?.value) {
      inputRef.value.focus();
    }
  }
});
</script>