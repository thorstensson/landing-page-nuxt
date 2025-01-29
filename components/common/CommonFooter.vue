<template>
  <div class="footer-wrapper">
    <div><a target='_blank' href='https://discordapp.com/users/1326292436187611199'>DISCORD</a> <a target='_blank'
        href='https://thomasthorstensson.photography'>/ WP</a></div>
    <MediaAudioPlayer />
  </div>
</template>

<style lang="scss" scoped>
.footer-wrapper {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 80px;
  padding: $page-vpad $page-hpad $page-vpad $page-hpad;
  user-select: none;
  font-display: fallback;
  font-family: $sans-ui;
  color: $secondary;
  font-display: fallback;
  font-size: 12px;
}

a {
  transition: color 0.3s ease-in-out;
}

a:hover {
  color: $accent;
}
</style>
