<template>
    <section class="search-container">
        <div class="search-form-container" v-show="searchOpen">
            <h2 class="text-white text-center">What are you looking for?</h2>
            <form @submit.prevent="submitSearch" role="search" aria-label="Site Search Form" aria-description="Search site by keywords">
                <FragmentsFormsInput
                    v-model="query"
                    label="Enter keywords"
                    labelStyle="absolute"
                    name="site-search"
                    inputType="search"
                    ref="searchInputRef"
                />
                <button type="submit" aria-label="submit your search">
                    <SvgsSearch class="yellow" />
                </button>
            </form>
        </div>
        <button
          ref="searchTriggerRef"
          type="button"
          class="search icon"
          @click.prevent="toggleSearch"
          :class="{ 'open': searchOpen }"
          :aria-label="searchOpen ? 'Hide Search Form' : 'Show Search Form'"
        >
          <SvgsSearch v-show="!searchOpen" />
          <SvgsX v-show="searchOpen" />
        </button>
    </section> 
</template>

<script setup>
    const router = useRouter();

    const searchOpen = ref(false);
    const query = ref("");
    const searchTriggerRef = ref(null)
    const searchInputRef = ref(null)

    const submitSearch = () => {
      router.push(`/search?q=${query.value}`);
    };

    const toggleSearch = () => {
      searchOpen.value = !searchOpen.value;
      const nextFocus = searchOpen.value ?  searchInputRef.value.inputRef : searchTriggerRef.value;
        nextTick(() => {
            if (nextFocus) nextFocus.focus();
        })
    };
</script>


<style lang="scss">
.search-container {
    position: relative;
    .search-form-container {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba($black, .7);
        padding: 30px;
    }

    .icon {
        position: absolute;
        top: 0;
        right: 0;
    }

    svg {
        width: 24px;
        height: 24px;
    }

    form {
        display: flex;
        .form-field {
            border: 1px solid white;
            flex-grow: 1;
            input, label.absolute {
                color: $white;
                background: transparent;
            }
        }
    }
}
</style>