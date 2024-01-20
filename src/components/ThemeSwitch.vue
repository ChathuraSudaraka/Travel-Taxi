<script setup>
import { useDark, useToggle } from "@vueuse/core";
import { computed } from "vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const bgImage = computed(() => {
  return isDark.value ? "dark" : "light";
});
</script>

<template>
  <div class="fixed shadow-md bg-slate-200 dark:bg-slate-900">
    <div class="toggle cursor-pointer" @click="toggleDark()">
      <div class="img w-full h-full duration-300" :class="bgImage"></div>
    </div>
  </div>
</template>

<style scoped>
.fixed {
  width: 70px;
  height: 60px;
  top: 50px;
  right: 0;
  border-radius: 30px 0 0 30px;
  padding: 5px;
}

.toggle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary);
  padding: 2px;
  transition: padding 0.2s ease-in-out;
}

.toggle:hover .img {
  transform: rotate(360deg);
}

.img {
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}

.dark {
  background-image: url("/img/dark-theme.png");
}

.light {
  background-image: url("/img/light-theme.png");
}
</style>
