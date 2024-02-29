<template>
  <header
    class="global-header"
    :class="{ open: open, bg: showBg }"
    id="header"
  >
    <div class="container">
      <UtilityFocusLock :enabled="open" class="trap-wrapper">
        <nav
          class="items-container"
          @keyup.esc="closeNav('esc')"
          aria-label="Main Navigation"
        >
          <NuxtLink to="/" class="logo mright-auto" @click="hideNav">
            Logo
          </NuxtLink>
          <div class="button-wrapper mobile-only">
            <button
              id="menu-toggle"
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

          <div class="items-wrapper">
            <div class="inner-menu"
            >
              <ul class="items" aria-label="Expanded Navigation">
                <li v-for="(item, index) in menu" :key="`nav-${index}`">
                  <a :href="`/#${item.slug}`" ref="linkRef" @click="hideNav">
                    {{ item.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </UtilityFocusLock>
    </div>
  </header>
</template>

<script setup>
import { scrollTo } from "@/composables/scrollTo.js";
// import { useWindowStore } from "@/stores/window";

const route = useRoute();
console.log(route);

const linkRef = ref([]);
const hamburgerRef = ref(null);
const isDesktop = ref(null);

const hasNav = computed(() => {
  return isDesktop.value;
});

const showBg = computed(() => {
  return true;
});

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

watchEffect(() => {
  // if (isDesktop?.value) {
  //   open.value = true;
  //   document.body.classList.remove("lock-scroll");
  // } else {
  //   open.value = false;
  // }
});

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

const hideNav = () => {
  if (!isDesktop.value) {
    closeNav();
  }
};

const resize = () => {
  isDesktop.value = window.innerWidth;
};

const skipToContent = () => {
  const anchor = document.getElementById("main");
  anchor.focus();
};

const hamburgerSR = computed(() => {
  return open.value ? "Close Navigation" : "Open Navigation";
});

onMounted(() => {
  if (process.client) {
    resize();
    window.addEventListener("resize", resize);
  }
});
</script>

<style lang="scss">
.global-header {
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 999;
  transition: 0.5s ease;
  // font-family: $title;

  @media (min-width: 768px) {
    // position: absolute;
    padding-top: 30px;
  }

  @media (max-width: 767px) {
    > .container {
      // height: $header-height;
      padding-top: 10px;
    }
  }

  &.bg {
    // background: $blue;
    // box-shadow: 0 1px 5px rgba($bluegreen, 0.5);

    .button-wrapper {
      .bar {
        // stroke: $cream;
      }
    }

    .logo {
      transition: 0.2s ease !important;
      // color: $cream;
      &:hover,
      &:focus {
      }
    }
  }


  .button-wrapper {
    height: 22px;
    width: 22px;
    margin-left: auto;
  }

  .logo {
    position: relative;
    z-index: 5;
    font-size: 26px;
    line-height: 0.85em;

    @media (max-width: 767px) {
      padding-top: 4px;
      font-size: 20px;
    }

    @media (max-width: 330px) {
      padding-top: 4px;
      font-size: 19px;
    }
  }

  a {
    border-bottom: 2px solid transparent;
    transition: 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 1em;
  }

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

  .items-container {
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
    // color: $cream;
    padding-top: $header-height;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // background: $blue;

    ul {
      padding: 90px 0 90px 4.5vw;
    }

    li {
      @media (max-width: 767px) {
        margin-bottom: 2em;

        a {
          &:hover,
          &:focus {
          }
        }
      }
    }

    @media (min-width: 768px) {
      all: unset;
      margin-left: auto;
      justify-content: flex-end;

      .container {
        padding: 0;
      }
      ul {
        padding: 0;
        display: flex;
      }

      li {
        letter-spacing: 0.1rem;
        margin-bottom: 0;
        + li {
          margin-left: 50px;
        }
      }
    }
  }

  &.open {
    .logo,
    &.bg .logo {
      @media (max-width: 767px) {
        &:hover,
        &:focus {
        }
      }
    }

    .items-container {
      pointer-events: auto;
    }

    .button-wrapper {
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