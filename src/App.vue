<script setup>
import PrimaryInput from "@/components/PrimaryInput.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import ToggleTheme from "@/components/ThemeSwitch.vue";
import PrimarySelect from "@/components/PrimarySelect.vue";

import { useDark } from "@vueuse/core";
import { computed } from "vue";

const isDark = useDark();
const vehicles = [
  "Car",
  "Truck",
  "Motorcycle",
  "Bicycle",
  "Bus",
  "Scooter",
  "Boat",
  "Airplane",
  "Helicopter",
  "Train",
  "Subway",
  "RV",
  "Jet Ski",
  "Quad Bike",
  "Electric Scooter",
];

const theme = computed(() => {
  return isDark.value ? "dark" : "light";
});
</script>

<template>
  <div class="flex min-h-screen justify-center bg-gray-100 dark:bg-[#141414] bg-[url(/img/1.png)] bg-cover bg-center"
    :data-theme="theme">
    <div class="container p-5 pt-10">
      <div class="p-5 md:p-8 lg:p-10 rounded-lg shadow-lg bg-[#f8fafc99] dark:bg-[#0f0f12e3] dark:shadow-black">
        <div class="grid grid-cols-12 gap-3">
          <!-- Trid ID Start -->
          <div class="col-span-12 lg:col-span-6">
            <PrimaryInput label="Trip ID" placeholder="Enter The Trip ID" />
          </div>
          <!-- Trid ID End -->

          <!-- Trip Date & Time Start -->
          <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <PrimaryInput label="Date" type="date" />
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <PrimaryInput label="Time" type="time" />
          </div>
          <!-- Trid Date & Time end -->

          <!-- Passengers Start -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4 grid grid-cols-2 gap-3">
            <div class="col-span-1">
              <PrimaryInput type="number" label="Adults" placeholder="Adults Count" keyboard="numeric" />
            </div>
            <div class="col-span-1">
              <PrimaryInput type="number" label="Children" placeholder="Children Count" keyboard="numeric" />
            </div>
          </div>
          <!-- Passengers End -->

          <!-- Vehicle Type Start -->
          <div class="col-span-6 md:col-span-6 lg:col-span-4 flex flex-col">
            <PrimarySelect label="Vehicle Type" placeholder="Select Vehicle Type" :options="vehicles" />
          </div>
          <!-- Vehicle Type End -->

          <!-- Baggages Start -->
          <div class="col-span-6 md:col-span-12 lg:col-span-4">
            <PrimaryInput label="Baggages" placeholder="Enter Baggages" />
          </div>
          <!-- Baggages Start -->

          <!-- Location Start -->
          <div class="col-span-12 md:col-span-6">
            <PrimaryInput label="Pickup Location" placeholder="Enter Pickup Location" />
          </div>
          <div class="col-span-12 md:col-span-6">
            <PrimaryInput label="Drop Location" placeholder="Enter Drop Location" />
          </div>
          <!-- Location End -->

          <!-- Surfboard Start -->
          <div class="col-span-12 md:col-span-4">
            <label for="surfboard" class="label text-sm uppercase">Surfboard</label>
            <div class="grid grid-cols-2 place-items-center">
              <div class="flex items-center gap-3">
                <input type="radio" name="surfboard" class="radio" />
                <label for="yes">Yes</label>
              </div>
              <div class="flex items-center gap-3">
                <input type="radio" name="surfboard" class="radio" checked />
                <label for="yes">No</label>
              </div>
            </div>
          </div>
          <!-- Surfboard End -->

          <!-- Distance Start -->
          <div class="col-span-12 md:col-span-3">
            <PrimaryInput label="Total Distance" placeholder="Enter The Distance" messure="KM" />
          </div>
          <!-- Distance End -->

          <!-- Time Start -->
          <div class="col-span-12 md:col-span-5">
            <label for="time" class="label uppercase text-sm">Transport Time</label>
            <div class="grid grid-cols-2 gap-3">
              <div class="col-span-1">
                <PrimaryInput type="number" placeholder="Hours" keyboard="numeric" messure="H" />
              </div>
              <div class="col-span-1">
                <PrimaryInput type="number" placeholder="Minutes" keyboard="numeric" messure="M" />
              </div>
            </div>
          </div>
          <!-- Time End -->

          <!-- Button Set Start -->
          <div class="col-span-12 flex flex-col lg:flex-row justify-center lg:justify-end gap-4">
            <button class="btn btn-error">Reset</button>
            <button class="btn btn-primary">Print</button>
            <button class="btn btn-neutral">
              <v-icon name="md-contentcopy-round" />
              Copy To Clipboard
            </button>
          </div>
          <!-- Button Set End -->
        </div>
      </div>
    </div>
  </div>
  <ToggleTheme />
</template>

<style scoped></style>
