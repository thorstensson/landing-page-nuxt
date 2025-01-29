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
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<style>
html,
body {
    background-color: #0F0F0f;
    margin: 0;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    -o-font-smoothing: antialiased;
}

body {
    position: relative;
    overflow-x: hidden;
    /*would like vh but eh safaris bottom bar grr, thanks Apple*/
    min-height: 100%
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

.-bottom-screen-element {
    position: fixed;
    bottom: 0;
    bottom: env(safe-area-inset-bottom);
}
</style>