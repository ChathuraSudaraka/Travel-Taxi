<template>
  <div class="flex min-h-screen justify-center bg-gray-100 dark:bg-[#141414] bg-[url(/img/1.png)] bg-fixed bg-cover bg-left-bottom" :data-theme="theme">
    <div class="container p-5 pt-10">
      <div class="p-5 md:p-8 lg:p-10 rounded-lg shadow-lg bg-[#f8fafc99] dark:bg-[#0f0f12e3] dark:shadow-black">
        <div class="grid grid-cols-12 gap-3">
          <!-- Trip ID -->
          <div class="col-span-12 lg:col-span-6">
            <PrimaryInput label="Trip ID" placeholder="Enter The Trip ID" />
          </div>
          <!-- Date and Time -->
          <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <PrimaryInput label="Date" type="date" />
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <PrimaryInput label="Time" type="time" />
          </div>
          <!-- Adults and Children Count -->
          <div class="col-span-12 md:col-span-6 lg:col-span-8 grid grid-cols-2 gap-3">
            <div class="col-span-1">
              <PrimaryInput type="number" label="Adults" placeholder="Adults Count" keyboard="numeric" />
            </div>
            <div class="col-span-1">
              <PrimaryInput type="number" label="Children" placeholder="Children Count" keyboard="numeric" />
            </div>
          </div>
          <!-- Surfboard and Baggages -->
          <div class="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col">
            <label for="surfboard" class="label text-sm uppercase">Surfboard</label>
            <div class="grid grid-cols-2 place-items-center">
              <div class="flex items-center gap-3 ">
                <input type="radio" name="surfboard" class="radio" />
                <label for="yes">Yes</label>
              </div>
              <div class="flex items-center gap-3">
                <input type="radio" name="surfboard" class="radio" checked />
                <label for="no">No</label>
              </div>
            </div>
          </div>
          <div class="col-span-12 md:col-span-12 lg:col-span-4">
            <PrimaryInput label="Baggages" placeholder="Enter Baggages" />
          </div>
          <!-- Vehicle Type and Pickup/Drop Location -->
          <div class="col-span-12 md:col-span-4">
            <PrimarySelect label="Vehicle Type" placeholder="Select Vehicle Type" :options="vehicles" />
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-6">
            <PrimaryInput label="Pickup Location" placeholder="Enter Pickup Location" />
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-6">
            <PrimaryInput label="Drop Location" placeholder="Enter Drop Location" />
          </div>
          <!-- Total Distance and Transport Time -->
          <div class="col-span-12 md:col-span-3 lg:col-span-2">
            <PrimaryInput label="Total Distance" placeholder="Enter The Distance" measure="KM" />
          </div>
          <div class="col-span-12 md:col-span-5 lg:col-span-4">
            <label for="time" class="label uppercase text-sm">Transport Time</label>
            <div class="grid grid-cols-2 gap-3">
              <div class="col-span-1">
                <PrimaryInput type="number" placeholder="Hours" keyboard="numeric" measure="H" />
              </div>
              <div class="col-span-1">
                <PrimaryInput type="number" placeholder="Minutes" keyboard="numeric" measure="M" />
              </div>
            </div>
          </div>
          <!-- Buttons -->
          <div class="col-span-12 flex flex-col lg:flex-row justify-center lg:justify-end gap-3">
            <button class="btn btn-error lg:mr-2">Reset</button>
            <button class="btn btn-primary lg:mr-2">Print</button>
            <button class="btn btn-neutral">
              <v-icon name="md-contentcopy-round" />
              Copy To Clipboard
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ToggleTheme />
</template>

<script setup>
import PrimaryInput from "@/components/PrimaryInput.vue";
import PrimarySelect from "@/components/PrimarySelect.vue";
import ToggleTheme from "@/components/ThemeSwitch.vue";
import { useDark } from "@vueuse/core";
import { computed } from "vue";

const isDark = useDark();
const vehicles = [
  "Car", "Truck", "Motorcycle", "Bicycle", "Bus", "Scooter", "Boat", "Airplane",
  "Helicopter", "Train", "Subway", "RV", "Jet Ski", "Quad Bike", "Electric Scooter",
];

const theme = computed(() => {
  return isDark.value ? "dark" : "light";
});
</script>

<style scoped>
</style>
