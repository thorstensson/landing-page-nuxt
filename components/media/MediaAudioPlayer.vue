<script setup lang="ts">

/**
 * An even more slimmed down version of the player.
 * TODO: when portfolio is done, revisit this for improvements
 * (should I use Audio class?)
 */

import { ref, useTemplateRef, reactive, watch, onMounted, computed } from 'vue'
import { gsap } from 'gsap'
import {
    PlayIcon,
    PauseIcon,
    ChevronRightIcon,
    ChevronLeftIcon,
} from '@heroicons/vue/24/solid'

import SpectrumVisualizer from './MediaAudioVisualizer.vue'
import { useStoreRef } from '@/composable/useStoreRef'

const spectrum = useTemplateRef('spectrum')
const audioEl = useTemplateRef('audio-element')

const trackTime = ref<string>("00:00")
const trackDuration = ref<string>("00.00")
const trackIndex = ref<number>(0)
const currentTrack = ref<string>("")
const isPlaying = ref<boolean>(false)

const PATH = useRuntimeConfig().public.s3Path

// The panel width, if track text wider then GSAP yoyo
const TRACK_WIDTH = 160;

//Add tracks here; no plans to make a DOM playlist
const playlist = reactive([
    { artist: "Ernes Guevara", track: "Ernes Guevara - Lost (Original Mix).mp3" },
    {
        artist: "Stockholm Syndrome, Young Squage",
        track: "EMPHI - Stockholm Syndrome (Original Mix).mp3",
    },
    { artist: "EMPHI", track: "EMPHI - Pair of Dice (Original Mix).mp3" },
])

// Check for remaining tracks
const ifTrackNext = computed(() => {
    return trackIndex.value < playlist.length - 1
})

const ifTrackPrev = computed(() => {
    return trackIndex.value > 0
})

// Check for current track
const currTrack = computed(() => {
    return playlist[trackIndex.value].track
})

const togglePlay = () => {
    isPlaying.value = !isPlaying.value
    if (isPlaying.value && audioEl.value) {
        playTrack()
    } else if (audioEl.value) {
        audioEl.value.pause()
    }
}

// For previous and next we need to know if track is playing when we press them
const nextTrack = () => {
    if (ifTrackNext.value && !isPlaying.value) {
        trackIndex.value++
        currentTrack.value = currTrack.value
    } else if (ifTrackNext.value) {
        isPlaying.value = true
        trackIndex.value++
        playTrack()
    }
}

const prevTrack = () => {
    if (ifTrackPrev.value && !isPlaying.value) {
        trackIndex.value--
        currentTrack.value = currTrack.value
    } else if (ifTrackPrev.value) {
        isPlaying.value = true
        trackIndex.value--
        playTrack()
    }
}

const playTrack = () => {
    // Vueuse, easy cancel. oncanplaythrough does not work on mobile, loadedmetadata does???
    const cancelcan = useEventListener(
        audioEl.value as unknown as MaybeRef,
        "loadedmetadata",
        () => {
            audioEl.value?.play()
            cancelcan()
        }
    )
    // Synchronous, so we do this after adding event
    isPlaying.value = true
    audioEl.value!.currentTime = 0
    currentTrack.value = currTrack.value
    audioEl.value?.load()
}

// E from v-on listener
const timeUpdate = () => {
    setTimes()
}

const setTimes = () => {
    const m = ('0' + Math.floor((audioEl.value!.currentTime / 60) % 60)).slice(
        -2
    )
    const s = ('0' + Math.floor(audioEl.value!.currentTime % 60)).slice(-2)
    trackTime.value = `${m}:${s}`
}

// E from v-on listener
const durationUpdate = () => {
    const m = ("0" + Math.floor((audioEl.value!.duration / 60) % 60)).slice(-2)
    const s = ("0" + Math.floor(audioEl.value!.duration % 60)).slice(-2)
    trackDuration.value = `${m}:${s}`
}

const onTrackEnded = () => {
    if (ifTrackNext.value && spectrum.value) {
        trackIndex.value++
        playTrack()
    } else if (audioEl.value && spectrum.value) {
        isPlaying.value = false
        trackIndex.value = 0
        audioEl.value.pause()
        audioEl.value.currentTime = 0
        currentTrack.value = currTrack.value
    }
}


onMounted(() => {
    const { addElem } = useStoreRef()
    addElem("audioEl", audioEl)
    currentTrack.value = currTrack.value
})
</script>

<template>
    <div class="player-wrapper">
        <audio type="audio/mp3" :src="`${PATH}/${currentTrack}`" preload="auto" v-on:timeupdate="timeUpdate"
            v-on:durationchange="durationUpdate" v-on:ended="onTrackEnded" ref="audio-element"
            crossorigin="anonymous"></audio>
        <div class="controls">
            <PlayIcon @click="togglePlay" class="controls__play" :class="{ 'controls__play--show': !isPlaying }" />
            <PauseIcon @click="togglePlay" class="controls__pause" :class="{ 'controls__pause--show': isPlaying }" />
            <ChevronLeftIcon @click="prevTrack" class="controls__prev" :class="{ 'controls__prev--end': !ifTrackPrev }">
            </ChevronLeftIcon>
            <ChevronRightIcon @click="nextTrack" class="controls__next"
                :class="{ 'controls__next--end': !ifTrackNext }">
            </ChevronRightIcon>
        </div>
        <div v-if="audioEl">
            <MediaAudioVisualizer ref="spectrum" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.currstate {
    color: white;
    position: fixed;
    width: 100px;
    top: 100px;
    left: 0px;
    z-index: 900;
    font-size: 20px;
}

body {
    -webkit-overflow-scrolling: none;
    overflow: hidden;
    overscroll-behavior: none;
}

.player-wrapper {
    position: relative;
    width: 240px;
    height: 70px;
    -webkit-overflow-scrolling: none;
    overflow: hidden;
    overscroll-behavior: none;
    text-transform: uppercase;
}

.player-wrapper * {
    font-display: fallback;
    font-family: $sans-ui;
    font-optical-sizing: $sans-ui-optic;
    font-size: 12px;
    font-weight: 250;
}

.controls {
    position: absolute;
    top: 0;
    height: inherit;
    width: inherit;
    text-align: center;


    &__play,
    &__pause {
        position: absolute;
        display: none;
        width: 34px;
        height: auto;
        /*compensate for svg block*/
        right: -5px;
        bottom: -3px;
        color: #f8f9fa;
        cursor: pointer;
        transition: color 0.3s ease-in-out;

        &--show {
            display: block;
        }
    }

    &__play:hover,
    &__pause:hover {
        color: $clr-quinary;
    }

    &__prev,
    &__next {
        position: absolute;
        width: 30px;
        height: auto;
        right: 44px;
        bottom: -2px;
        color: #f8f9fa;
        cursor: pointer;
        transition: color 0.3s ease-in-out;

        &--end {
            opacity: 0.5;
        }
    }

    &__next {
        right: 24px;
    }

    &__next:hover,
    &__prev:focus {
        color: $clr-quinary;
    }
}
</style>
