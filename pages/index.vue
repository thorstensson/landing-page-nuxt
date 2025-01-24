<script setup lang="ts">

definePageMeta({
    layout: 'default'
});

const scrollConfig = reactive({
    text: "Hi there! New portfolio coming March 1. Swedish developer, addicted to Vue / Nuxt. I care for simplicity & iterated ideas.  Now open to a new full-time role. Saludos! Thomas, Barcelona...",
    speed: "60s",
})
</script>

<template>
    <div>
        <FormW3Contact></FormW3Contact>
        <UITextScroller :speed="scrollConfig.speed" :text="scrollConfig.text"></UiTextScroller>
    </div>
</template>

<style></style>