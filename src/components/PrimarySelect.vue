<script setup>
defineProps({
  label: {
    type: String,
    default: "label",
  },
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
  hint: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <label class="form-control w-full">
    <div class="label uppercase">
      <span class="label-text">{{ label }}</span>
      <span class="label-text-alt">{{ hint }}</span>
    </div>
    <select
      @change="$emit('update:modelValue', $event.target.value)"
      class="select select-bordered"
    >
      <option :selected="modelValue == '0'">{{ placeholder }}</option>
      <option v-for="option in options" :key="option">{{ option }}</option>
    </select>
    <div class="label">
      <span class="label-text-alt">{{ description }}</span>
    </div>
  </label>
</template>
