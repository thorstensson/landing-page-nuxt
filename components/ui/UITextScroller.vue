<script setup lang="ts">
defineProps<{
    text?: string
    speed?: string
}>()
</script>

<template>
    <div class="scroll-items">
        <span class="marquee scroll-items__item">{{ text }}</span>
        <span class="marquee scroll-items__item">{{ text }}</span>
    </div>
</template>

<style lang="scss" scoped>
.scroll-items {
    display: flex;
    overflow-x: hidden;
    align-items: center;
    transform: translateZ(0);
    will-change: transform;
    align-self: flex-end;
    bottom: 100px;
    position: absolute;
    user-select: none;

    &__item {
        max-width: none;
        will-change: transform;
        padding-left: 100px;
        overflow-x: hidden;
        color: $clr-secondary;
        font-display: fallback;
        font-family: $sans-text;
        font-size: clamp-calc(480px, 1920px, 60px, 180px);
        font-weight: 400;
        white-space: nowrap;
        animation: marquee v-bind('speed') linear infinite;
    }

    @include this-and-above('lg') {
        bottom: 170px;
    }
}

@keyframes marquee {
    0% {
        transform: translate(0, 0);
    }

    100% {
        transform: translate(-100%, 0);
    }
}
</style>
