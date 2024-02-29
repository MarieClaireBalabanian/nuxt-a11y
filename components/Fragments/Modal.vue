<template>
  <div>
    <button ref="triggerRef" @click="handleModal(true)" class="button">
      {{ modalButtonText }}
    </button>

    <Teleport to="body">
      <transition name="modalTransition" appear>
        <div
          v-if="open"
          class="modal bg-black"
          @keyup.esc="handleModal(false)"
          @click.self="handleModal(false)"
        >
          <UtilityFocusLock class="focus-trap" :enabled="open">
            <div class="modal-wrapper">
              <div
                class="modal-content"
                role="dialog"
                aria-modal="true"
                tabindex="-1"
                ref="modalRef"
                aria-labelledby="modal-title"
              >
                <button class="close" @click.stop="handleModal(false)">
                  <span class="sr-only">Close Modal</span>
                </button>
                <div class="container">
                  <slot></slot>
                </div>
              </div>
            </div>
          </UtilityFocusLock>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
const props = defineProps({
  modalButtonText: {
    type: String,
    required: true,
  },
});

const open = ref(false);
const triggerRef = ref(null);
const modalRef = ref(null);

watch(open, (newOpen) => {
  handleModal(newOpen);
});

const handleModal = (val) => {
  console.log("hi");
  const app = document.getElementById("app");
  if (val) {
    document.body.classList.add("lock-scroll");
    app.setAttribute("aria-hidden", true);
    nextTick(() => {
      if (modalRef?.value) modalRef.value.focus();
    });
  } else {
    document.body.classList.remove("lock-scroll");
    app.setAttribute("aria-hidden", false);
    nextTick(() => {
      if (triggerRef?.value) triggerRef.value.focus();
    });
  }
  open.value = val;
};
</script>

<style lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  overflow: auto;
  height: 100vh;
  width: 100vw;
  z-index: 9999;
  display: flex;
  flex-direction: column;

  > .focus-trap {
    width: 100%;
  }

  .modal-content {
    min-height: 100vh;
  }

  .close {
    background: $white;
    border: 0;
    display: block;
    cursor: pointer;
    height: 35px;
    width: 35px;
    padding: 0;
    z-index: 1000;
    position: fixed;
    top: 0;
    right: 0;
    margin-left: auto;
    border: 1px solid $black;
    border-top: none;

    &::before,
    &::after {
      position: absolute;
      display: block;
      content: "";
      height: 2px;
      left: 8px;
      top: 16px;
      width: 20px;
      background: $black;
    }

    &::before {
      transform: rotate(-45deg);
    }

    &::after {
      transform: rotate(45deg);
    }

    &:hover,
    &:focus {
      border-radius: 2px;
      background: $red;
      &::before,
      &::after {
        background: $white;
      }
    }
  }

  &.modalTransition-enter-active,
  &.modalTransition-leave-active {
    transition: transform 0.7s ease;
  }

  &.modalTransition-enter-from,
  &.modalTransition-leave-to {
    transform: translate3d(-100%, 0, 0);
  }

  &.modalTransition-enter-to,
  &.modalTransition-leave {
    transform: translate3d(0, 0, 0);
  }
}
</style>