<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
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
  keyboard: {
    type: String,
    default: "default",
  },
  messure: {
    type: String,
    default: "",
  },
});

const isMessure = computed(() => {
  return props.messure !== "";
});
</script>

<template>
  <label class="form-control w-full">
    <div v-if="label" class="label uppercase">
      <span class="label-text">{{ label }}</span>
      <span class="label-text-alt">{{ hint }}</span>
    </div>
    <div class="relative flex">
      <input
        :type="type"
        :placeholder="placeholder"
        :inputmode="keyboard"
        :modelValue="modelValue"
        class="input input-bordered w-full"
        :class="{
          'pr-12': isMessure,
        }"
      />
      <div
        v-if="isMessure"
        class="absolute w-12 h-full flex justify-center items-center bg-gray-200 dark:bg-gray-800 rounded-r-lg top-0 right-0"
      >
        {{ messure }}
      </div>
    </div>
    <div class="label">
      <span class="label-text-alt">{{ description }}</span>
    </div>
  </label>
</template>
