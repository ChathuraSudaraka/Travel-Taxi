<script setup>
defineProps({
  label: {
    type: String,
    default: "Click",
  },
});
</script>

<template>
  <button
    class="px-6 py-2 bg-primary-dark hover:bg-secondary-dark rounded text-gray-200 uppercase font-semibold duration-300 active:scale-105"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>
