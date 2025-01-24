<script setup lang="ts">
import { NuxtLoadingIndicator } from '#components'

const isMounted = ref<boolean>(false);

defineOgImage({
    component: 'main',
    url: 'https://thomasthorstensson.net/og.png'
})

onMounted(() => {
    isMounted.value = true
})
</script>

<template>
    <div class="hide" :class="{ 'on-ready': isMounted }">
        <NuxtLayout>
            <NuxtPage :transition="{
                name: 'layout',
                mode: 'out-in'
            }" />
        </NuxtLayout>
        <NuxtLoadingIndicator color="#67d360" :throttle="0" />
    </div>
</template>

<style>
html,
body {
    background-color: black;
    margin: 0;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
}

body {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
}

.hide {
    opacity: 0;
    filter: blur(10px);
    transition: all 1s;
}

.on-ready {
    opacity: 1;
    filter: blur(0px)
}
</style>