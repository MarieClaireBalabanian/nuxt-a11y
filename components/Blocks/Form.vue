<template>
  <section>
    <div class="container">
      <form @submit.prevent="submit" aria-label="Send us a mesage">
        <Transition name="list">
          <div
            id="form-errors"
            tabindex="-1"
            class="form-errors mb-40"
            v-if="srOnlyErrors.length"
            aria-atomic="true"
            aria-live="agressive"
          >
            <ol class="text-red paragraph-small" aria-label="Form Errors">
              <li
                class="text-left"
                v-for="(error, index) in srOnlyErrors"
                :key="`error-${index}`"
              >
                {{ index + 1 }}. {{ error }}
              </li>
            </ol>
          </div>
        </Transition>

        <div class="fields mb-40 m-auto">
          <FragmentsFormsInput
            v-model="formInputs.name.val"
            :label="formInputs.name.label"
            labelStyle="absolute"
            :error="formInputs.name.errors"
            name="name"
            autocomplete="name"
            required
          />
          <FragmentsFormsInput
            v-model="formInputs.email.val"
            :label="formInputs.email.label"
            labelStyle="absolute"
            :error="formInputs.email.errors"
            name="email"
            autocomplete="email"
            required
          />
            <FragmentsFormsSelect
            v-model="formInputs.state.val"
            :label="formInputs.state.label"
            :error="formInputs.state.errors"
            :options="stateOptions"
            labelStyle="absolute"
            name="state"
            placeholder="Select a State"
            required
          />
          <FragmentsFormsTextarea
              v-model="formInputs.message.val"
              :label="formInputs.message.label"
              labelStyle="absolute"
              :error="formInputs.message.errors"
              name="message"
              inputType="textarea"
              required
            />
          
        </div>

        <div class="actions text-center">
          <button
            type="submit"
            :disabled="submitting"
            ref="submitButton"
            class="button"
          >
            {{ submitting ? "Submitting" : "Submit" }}
          </button>
        </div>
        <p
          v-if="success"
          role="status"
          class="success-message text-center text-white h3"
          tabindex="-1"
          ref="successMessageRef"
        >
          Thanks for reaching out!
        </p>
      </form>
    </div>
  </section>
</template>

<script setup>
import validators from "~/composables/validators";
import { scrollTo } from "../../composables/scrollTo.js";

const attrs = useAttrs();
const block = attrs.block;

const requiredFields = ["name", "email", "message"];
const srOnlyErrors = ref([]);
const formErrorsRef = ref(null);

const formInputs = ref({
  email: {
    val: "",
    errors: null,
    validators: [validators.email, validators.required],
    label: "Email",
  },
  name: {
    val: "",
    errors: null,
    validators: [validators.required],
    label: "Name",
  },
  message: {
    val: "",
    errors: null,
    validators: [validators.required],
    label: "Message",
  },
  state: {
    val: "",
    errors: null,
    validators: [validators.required],
    label: "Select",
  },
});

const submitting = ref(false);
const success = ref(false);
const successMessageRef = ref(null);

const stateOptions = [
  { name: "Washington", value: "WA" },
  { name: "Illinois", value: "IL" },
  { name: "Georgia", value: "GA" },
  { name: "Kentucky", value: "KY" },
];

const validateForm = () => {
  let valid = true;
  // Validates the whole form, including unique required validation
  requiredFields.forEach((fieldName) => {
    formInputs.value[fieldName].errors = null;
    if (!validators.required.fn(formInputs.value[fieldName].val)) {
      valid = false;
      let message = `${formInputs.value[fieldName].label} is required.`;
      formInputs.value[fieldName].errors = message;
      srOnlyErrors.value.push(message);
    } else {
      formInputs.value[fieldName].validators.forEach((validator) => {
        if (!validator.fn(formInputs.value[fieldName].val)) {
          valid = false;
          formInputs.value[fieldName].errors = validator.message;
          srOnlyErrors.value.push(validator.message);
        }
      });
    }
  });
  return valid;
};

const submit = () => {
  srOnlyErrors.value = [];
  submitting.value = true;
  if (validateForm()) {
    success.value = true;
    submitting.value = false;
    nextTick(() => {
      successMessageRef.value.focus();
      requiredFields.forEach((fieldName) => {
        formInputs.value[fieldName].val = "";
      });
    });
  } else {
    success.value = false;
    submitting.value = false;
    nextTick(() => {
      scrollTo("form-errors", "smooth");
    });
  }
};
</script>

<style lang="scss">
.block-form {
  background: $green;
  .fields {
    grid-gap: 15px;
  }

  .form-errors {
    text-align: center;
    outline: none;

    ol {
      display: inline-block;
      width: auto;
      background: $red;
      padding: 10px 30px;
      color: $white;
    }
  }

  .success-message {
    margin-top: 30px;
  }

  @media (min-width: 768px) {
    .fields {
      max-width: 800px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      > .form-field:not(:last-child) {
        width: calc(50% - 1rem);
      }
      > .form-field:last-child {
        width: 100%;
      }
    }
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }
}
</style>
