<script setup>
import PrimaryInput from "@/components/PrimaryInput.vue";
import { ref } from "vue";

const number = ref("");
</script>

<template>
  <!-- Number Modal Start -->
  <dialog id="number_modal" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h3 class="font-bold text-lg uppercase">Enter the Number !</h3>

      <!-- Baggages Start -->
      <div class="mt-5 col-span-6 md:col-span-12 lg:col-span-6">
        <PrimaryInput
          label="Mobile Number"
          placeholder="Enter The Number"
          v-model="number"
        />
      </div>
      <!-- Baggages Start -->
      <div class="mt-5 flex justify-end">
        <button class="btn btn-neutral" @click="$emit('send', number)">
          Send
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  <!-- Number Modal End -->
</template>
