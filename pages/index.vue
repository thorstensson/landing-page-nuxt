<script setup lang="ts">

definePageMeta({
    layout: 'default'
});

const scrollConfig = reactive({
    text: "New portfolio March 2021. I care for creating experiences where there’s space to breathe and reflect. Some agencies I’ve worked with: Wunderman ● Gamesys ● PokerStars ● WWF ● McCann ● IG … Open to a new role; would like to work more with Nuxt & Vue. ",
    speed: "70s",
})
</script>

<template>
    <div>
        <FormW3Contact></FormW3Contact>
        <UITextScroller :speed="scrollConfig.speed" :text="scrollConfig.text"></UiTextScroller>
    </div>
</template>

<style></style>