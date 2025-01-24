<script setup lang="ts">

</script>

<template>
  <div class="header-wrapper">
    <div class="bullet"><span>TJT</span></div>
  </div>
</template>

<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  height: 50px;
  padding: $page-vpad $page-hpad $page-vpad $page-hpad;
  user-select: none;
  font-display: fallback;
  font-family: $sans-ui;
  color: $clr-secondary;
  font-size: 12px;
}

.bullet span {
  display: flex;
  gap: 8px;
  align-items: center;
}

.bullet span::before {
  content: "";
  display: block;
  width: 7px;
  height: 7px;
  background-color: $clr-secondary;
  border-radius: 50%;
}
</style>