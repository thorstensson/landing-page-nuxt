<script setup lang="ts"></script>

<template>
  <div>
    <UIGitCorner />
    <CommonHeader />
    <div class="landing-wrapper">
      <slot />
    </div>
    <CommonFooter />
  </div>
</template>

<style scoped>
.landing-wrapper {
  min-height: calc(100vh - 130px);
}

.landing-wrapper,
.landing-wrapper>*:first-child {
  width: 100%;
}
</style>
