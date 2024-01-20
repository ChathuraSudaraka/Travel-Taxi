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
    class="px-6 py-2 bg-slate-900 hover:bg-slate-950 dark:bg-slate-50 dark:hover:bg-slate-100 rounded text-gray-200 dark:text-gray-700 uppercase font-semibold duration-300 active:scale-105"
    @click="$emit('click')"
  >
    {{ label }}
  </button>
</template>
