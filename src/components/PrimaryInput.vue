<script setup>
defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  modelValue: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <input
    :type="type"
    class="border border-gray-300 rounded-md px-4 py-2 w-full outline-none focus:ring-2 focus:ring-primary-dark"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
