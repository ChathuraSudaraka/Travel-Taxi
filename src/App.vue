<script setup>
import PrimaryInput from "@/components/PrimaryInput.vue";
import ToggleTheme from "@/components/ThemeSwitch.vue";
import PrimarySelect from "@/components/PrimarySelect.vue";
import MapModal from "@/components/MapModal.vue";

import { useDark } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";

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

const copy_icon = ref("md-contentcopy-round");
const trip_id_start = ref("");
const form = {
  tripId: "",
  date: "",
  time: "",
  adults: "",
  children: "",
  vehicleType: "",
  baggages: "",
  pickupLocation: "",
  dropLocation: "",
  surfboard: "",
  distance: "",
  transportTimeH: "",
  transportTimeM: "",
};

onMounted(() => {
  trip_id_start.value = generateUniqueId();
});

const theme = computed(() => {
  return isDark.value ? "dark" : "light";
});

function generateUniqueId() {
  const timestamp = new Date();
  const date = timestamp.getDate();
  const month = timestamp.getMonth() + 1;
  const year = timestamp.getFullYear();

  return `${year}${month}${date}`;
}

function showMap() {
  const mapModal = document.getElementById("map_modal");
  mapModal.showModal();
}

function copy() {
  console.log(form);
  let form_copy = { ...form };
  let keys = Object.keys(form_copy);
  keys.forEach((key) => {
    if (form_copy[key] === "") {
      form_copy[key] = "N/A";
    }
  });
  const text = `
  Trip ID: ${trip_id_start.value}${form_copy.tripId}
  Date: ${form_copy.date}
  Time: ${form_copy.time}
  Adults: ${form_copy.adults}
  Children: ${form_copy.children}
  Vehicle Type: ${form_copy.vehicleType}
  Baggages: ${form_copy.baggages}
  Pickup Location: ${form_copy.pickupLocation}
  Drop Location: ${form_copy.dropLocation}
  Surfboard: ${form_copy.surfboard}
  Distance: ${form_copy.distance}
  Transport Time: ${form_copy.transportTimeH}H ${form_copy.transportTimeM}M
  `;
  navigator.clipboard.writeText(text);
  copy_icon.value = "bi-check-circle";
  setTimeout(() => {
    copy_icon.value = "md-contentcopy-round";
  }, 1500);
}
</script>

<template>
  <div
    class="flex min-h-screen justify-center bg-gray-100 dark:bg-[#141414] bg-[url(/img/1.png)] bg-cover bg-center"
    :data-theme="theme"
  >
    <div class="container p-5 pt-10">
      <div
        class="p-5 md:p-8 lg:p-10 rounded-lg shadow-lg bg-[#f8fafc99] dark:bg-[#0f0f12e3] dark:shadow-black"
      >
        <div class="grid grid-cols-12 gap-3">
          <!-- Trid ID Start -->
          <div class="col-span-12 lg:col-span-6">
            <label class="form-control w-full">
              <div class="label uppercase">
                <span class="label-text">Trip ID</span>
              </div>
              <div class="grid grid-cols-12">
                <div
                  class="col-span-5 md:col-span-4 lg:col-span-3 input-bordered border-r-0 flex justify-center items-center bg-gray-200 dark:bg-[#1d232a] rounded-l-lg"
                >
                  <span class="font-bold">
                    {{ trip_id_start }}
                  </span>
                </div>
                <div class="col-span-7 md:col-span-8 lg:col-span-9">
                  <input
                    type="text"
                    placeholder="Enter The Trip ID"
                    class="input input-bordered border-l-0 rounded-l-none w-full"
                    v-model="form.tripId"
                  />
                </div>
              </div>
            </label>
          </div>
          <!-- Trid ID End -->

          <!-- Flight number Start -->
          <div class="col-span-12 md:col-span-12 lg:col-span-6">
            <PrimaryInput label="Flight number" placeholder="Enter Flight No" />
          </div>
          <!-- Flight number End -->

          <!-- Trip Date & Time Start -->
          <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <PrimaryInput label="Date" type="date" v-model="form.date" />
          </div>
          <div class="col-span-12 md:col-span-6 lg:col-span-3">
            <PrimaryInput label="Time" type="time" v-model="form.time" />
          </div>
          <!-- Trid Date & Time end -->

          <!-- Passengers Start -->
          <div
            class="col-span-12 md:col-span-6 lg:col-span-6 grid grid-cols-2 gap-3"
          >
            <div class="col-span-1">
              <PrimaryInput
                type="number"
                label="Adults"
                placeholder="Adults Count"
                keyboard="numeric"
                v-model="form.adults"
              />
            </div>
            <div class="col-span-1">
              <PrimaryInput
                type="number"
                label="Children"
                placeholder="Children Count"
                keyboard="numeric"
                v-model="form.children"
              />
            </div>
          </div>
          <!-- Passengers End -->

          <!-- Vehicle Type Start -->
          <div class="col-span-6 md:col-span-6 lg:col-span-6 flex flex-col">
            <PrimarySelect
              label="Vehicle Type"
              placeholder="Select Vehicle Type"
              :options="vehicles"
              v-model="form.vehicleType"
            />
          </div>
          <!-- Vehicle Type End -->

          <!-- Baggages Start -->
          <div class="col-span-6 md:col-span-12 lg:col-span-6">
            <PrimaryInput
              label="Baggages"
              placeholder="Enter Baggages"
              v-model="form.baggages"
            />
          </div>
          <!-- Baggages Start -->

          <!-- Location Start -->
          <div class="col-span-12 md:col-span-6">
            <label class="form-control w-full">
              <div class="label uppercase">
                <span class="label-text">Pickup location</span>
              </div>
              <div
                @click="showMap"
                class="w-full h-[3rem] rounded-lg flex items-center px-5 overflow-x-scroll bg-gray-200 dark:bg-[#1d232a] border border-gray-300 dark:border-gray-700"
              ></div>
            </label>
          </div>
          <div class="col-span-12 md:col-span-6">
            <label class="form-control w-full">
              <div class="label uppercase">
                <span class="label-text">Drop location</span>
              </div>
              <div
                @click="showMap"
                class="w-full h-[3rem] rounded-lg flex items-center px-5 overflow-x-scroll bg-gray-200 dark:bg-[#1d232a] border border-gray-300 dark:border-gray-700"
              ></div>
            </label>
          </div>
          <!-- Location End -->

          <!-- Surfboard Start -->
          <div class="col-span-12 md:col-span-3">
            <label for="surfboard" class="label text-sm uppercase"
              >Surfboard</label
            >
            <div class="grid grid-cols-2 place-items-center">
              <div class="flex items-center gap-3">
                <input
                  type="radio"
                  name="surfboard"
                  class="radio"
                  value="Available"
                  v-model="form.surfboard"
                />
                <label for="yes">Yes</label>
              </div>
              <div class="flex items-center gap-3">
                <input
                  type="radio"
                  name="surfboard"
                  class="radio"
                  checked
                  value="Not Available"
                  v-model="form.surfboard"
                />
                <label for="yes">No</label>
              </div>
            </div>
          </div>
          <!-- Surfboard End -->

          <!-- Distance Start -->
          <div class="col-span-12 md:col-span-3">
            <PrimaryInput
              label="Total Distance"
              placeholder="Enter The Distance"
              messure="KM"
              v-model="form.distance"
            />
          </div>
          <!-- Distance End -->

          <!-- Time Start -->
          <div class="col-span-12 md:col-span-6">
            <label for="time" class="label uppercase text-sm"
              >Transport Time</label
            >
            <div class="grid grid-cols-2 gap-3">
              <div class="col-span-1">
                <PrimaryInput
                  type="number"
                  placeholder="Hours"
                  keyboard="numeric"
                  messure="H"
                  v-model="form.transportTimeH"
                />
              </div>
              <div class="col-span-1">
                <PrimaryInput
                  type="number"
                  placeholder="Minutes"
                  keyboard="numeric"
                  messure="M"
                  v-model="form.transportTimeM"
                />
              </div>
            </div>
          </div>
          <!-- Time End -->

          <!-- Button Set Start -->
          <div
            class="col-span-12 flex flex-col md:flex-row justify-center md:justify-end gap-4"
          >
            <button class="btn btn-error order-3 md:order-1">Reset</button>
            <button class="btn btn-primary order-2">Print</button>
            <button class="btn btn-neutral order-1 md:order-3" @click="copy">
              <v-icon :name="copy_icon" />
              Copy To Clipboard
            </button>
          </div>
          <!-- Button Set End -->
        </div>
      </div>
    </div>
    <MapModal />
    <ToggleTheme />
  </div>
</template>

<style scoped></style>
