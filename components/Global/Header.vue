<template>
  <header class="global-header" :class="{ open: open }">
    <div class="container">
      <UtilityFocusLock :enabled="open" class="trap-wrapper">
        <nav
          class="primary-navigation"
          @keyup.esc="closeNav('esc')"
          aria-label="Main Navigation"
        >
          <NuxtLink to="/" class="logo mright-auto" @click="hideNav">
            Logo
          </NuxtLink>
          <div class="button-wrapper mobile-only">
            <button
              aria-haspopup="true"
              class="hamburger"
              ref="hamburgerRef"
              @click="toggleNav"
              :aria-expanded="open.toString()"
            >
              <span class="sr-only">{{ hamburgerSR }}</span>
              <svg
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="19"
                viewBox="0 0 22 19"
                fill="none"
              >
                <path
                  class="bar-1 bar"
                  d="M1 1.5H21"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  class="bar-2 bar"
                  d="M1 9.5H21"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  class="bar-3 bar"
                  d="M1 17.5H21"
                  stroke="black"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>

       
        </nav>
      </UtilityFocusLock>
    </div>
  </header>
</template>

<script setup>
const route = useRoute();

const linkRef = ref([]);
const hamburgerRef = ref(null);

const menu = [
  {
    title: "Work",
    slug: "work",
    children: [
      { title: "One", slug: "one" },
      { title: "Two", slug: "two" },
      { title: "Three", slug: "three" },
    ],
  },
  { title: "Contact", slug: "contact" },
  {
    title: "About",
    slug: "about",
    children: [
      { title: "One", slug: "about-one" },
      { title: "Two", slug: "about-two" },
      { title: "Three", slug: "about-three" },
    ],
  },
];

const open = ref(false);

const toggleNav = () => {
  if (open.value) closeNav();
  else openNav();
};

const openNav = () => {
  open.value = true;
  nextTick(() => {
    document.body.classList.add("lock-scroll");
    const focus = linkRef.value[0];
    focus.focus();
  });
};

const closeNav = (action) => {
  open.value = false;
  document.body.classList.remove("lock-scroll");
  if (action === "esc") {
    nextTick(() => {
      hamburgerRef.value.focus();
    });
  }
};

const hideNav = (action) => {
  open.value = false;
  document.body.classList.remove("lock-scroll");
};

const skipToContent = () => {
  const anchor = document.getElementById("main");
  anchor.focus();
};

const hamburgerSR = computed(() => {
  return open.value ? "Close Navigation" : "Open Navigation";
});

onMounted(() => {});
</script>

<style lang="scss">
.global-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;

  @media (min-width: 768px) {
    position: static;
    padding-top: 30px;
  }

  @media (max-width: 767px) {
    > .container {
      height: $header-height;
      padding-top: 10px;
    }
  }

  .hamburger-wrapper {
    height: 22px;
    width: 22px;
    margin-left: auto;
    .hamburger {
      display: block;
      z-index: 9;
      position: relative;
      width: 100%;
      height: 100%;

      svg {
        display: inline-block;
        width: 100%;
      }

      .bar {
        transition: 0.2s ease;
        // stroke: $rust;
      }
    }
  }

  .logo {
    position: relative;
    z-index: 5;
    font-size: 26px;
    line-height: 0.85em;
  }

  a {
    border-bottom: 2px solid transparent;
    transition: 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 1em;
  }

  .primary-navigation {
    width: 100%;
    -webkit-overflow-scrolling: touch;
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    @media (min-width: 768px) {
      align-items: flex-end;
    }
  }

  .items-wrapper {
    background: $white;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    overflow: auto;
    padding-top: $header-height;

    ul {
      padding: 60px 20px;
    }


    @media (min-width: 768px) {
      all: unset;
      margin-left: auto;
      justify-content: flex-end;

      ul {
        padding: 0;
        display: flex;
      }

      li {
        margin-bottom: 0;
      }
    }
  }

  &.open {
    .hamburger-wrapper {
      .bar {
        &.bar-1 {
          transform: translate(4px, 1px) rotate(45deg);
        }

        &.bar-2 {
          opacity: 0;
        }

        &.bar-3 {
          transform: translate(-9px, 5px) rotate(-45deg);
        }
      }
    }
  }
}
</style>