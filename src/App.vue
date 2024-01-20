<script setup>
import PrimaryInput from "@/components/PrimaryInput.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import ToggleTheme from "@/components/ThemeSwitch.vue";
</script>

<template>
  <div class="flex justify-center">
    <div class="container pt-10">
      <div class="grid gap-3">
        <PrimaryInput placeholder="Enter your First Name" />
        <PrimaryInput placeholder="Enter your Last Name" />
        <PrimaryButton />
        <ToggleTheme />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
