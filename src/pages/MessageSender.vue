<script setup>
import PrimaryInput from "@/components/PrimaryInput.vue";
import ToggleTheme from "@/components/ThemeSwitch.vue";
import PrimarySelect from "@/components/PrimarySelect.vue";
import MapModal from "@/components/MapModal.vue";
import Invoice from "@/components/Invoice.vue";
import NumberModal from "@/components/NumberModal.vue";

import Toastify from "toastify-js";
import { useDark } from "@vueuse/core";
import { computed, onMounted, ref, watch } from "vue";

const isDark = useDark();
const vehicles = [
  "Mini Car",
  "Sedan Car",
  "Buddy Van",
  "Van F/R",
  "Van H/R",
  "Bus",
];

const printable = ref({});
const copy_icon = ref("md-contentcopy-round");
const trip_id_start = ref("");
const form = ref({
  tripId: "",
  customerName: "",
  customerMobile: "",
  date: "",
  time: "",
  adults: "",
  children: "",
  flightNumber: "",
  vehicleType: "",
  baggages: "",
  pickupLocation: "",
  dropLocation: "",
  surfboard: "Not Available",
  distance: "",
  transportTimeH: "",
  transportTimeM: "",
  price: "",
});
const pickupLocationUrl = ref("");
const dropLocationUrl = ref("");

watch(
  [() => form.value.pickupLocation, () => form.value.dropLocation],
  (
    [pickupLocationOld, dropLocationOld],
    [pickupLocationNew, dropLocationNew]
  ) => {
    if (
      pickupLocationOld !== pickupLocationNew ||
      dropLocationOld !== dropLocationNew
    ) {
      calcRoute();
    }
  }
);

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

const pickup_modal = ref(false);
const drop_modal = ref(false);

function setupMsg() {
  let form_copy = { ...form.value };
  let keys = Object.keys(form_copy);
  keys.forEach((key) => {
    if (form_copy[key] === "") {
      form_copy[key] = "N/A";
    }
  });
  const text = `
Trip ID: ${trip_id_start.value}${form_copy.tripId}
Customer Name: ${form_copy.customerName}
Customer Mobile No: ${form_copy.customerMobile}
Date: ${form_copy.date}
Time: ${form_copy.time}
Flight Number: ${form_copy.flightNumber}\n
Adults: ${form_copy.adults}
Children: ${form_copy.children}
Surfboard: ${form_copy.surfboard}
Baggages: ${form_copy.baggages}
Vehicle Type: ${form_copy.vehicleType}\n
Pickup Location: ${pickupLocationUrl.value ? pickupLocationUrl.value : "N/A"}\n
Drop Location: ${dropLocationUrl.value ? dropLocationUrl.value : "N/A"}\n
Distance: ${form_copy.distance}KM
Transport Time: ${form_copy.transportTimeH}H ${form_copy.transportTimeM}M\n
Total Price: Rs ${form_copy.price}
  `.trim();
  return text;
}

function copy() {
  const text = setupMsg();
  navigator.clipboard.writeText(text);
  copy_icon.value = "bi-check-circle";
  Toastify({
    text: "Copied to clipboard",
    close: true,
    duration: 3000,
    style: {
      background:
        "linear-gradient(90deg, rgba(192,0,203,1) 0%, rgba(30,84,251,1) 50%, rgba(29,227,113,1) 100%)",
    },
  }).showToast();
  setTimeout(() => {
    copy_icon.value = "md-contentcopy-round";
  }, 1500);
}

function getNumber() {
  document.getElementById("number_modal").showModal();
  return;
}

function sendMsg(number) {
  if (number.trim() == "") {
    Toastify({
      text: "Mobile Number Is Required",
      close: true,
      duration: 3000,
      style: {
        background:
          "linear-gradient(90deg, rgba(203,0,0,1) 0%, rgba(251,30,144,1) 50%, rgba(227,123,29,1) 100%)",
      },
    }).showToast();
    return;
  }
  var mobile = number;
  const message = setupMsg();
  const url = `${import.meta.env.VITE_BACKEND_URL}/api/sendMessage.php`;

  const formData = new FormData();
  formData.append("message", message);
  formData.append("mobile", mobile);

  // remove spaces in mobile and also remove first character if it's +
  mobile = mobile.replace(/\s/g, "");
  if (mobile[0] == "+") {
    mobile = mobile.slice(1);
  }

  console.log(mobile);

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      const res = JSON.parse(xhr.responseText);
      if (res.status == "success") {
        Toastify({
          text: "Message Sent Successfully",
          close: true,
          duration: 3000,
          style: {
            background:
              "linear-gradient(90deg, rgba(192,0,203,1) 0%, rgba(30,84,251,1) 50%, rgba(29,227,113,1) 100%)",
          },
        }).showToast();
      } else {
        Toastify({
          text: "Error While Sending Message.",
          close: true,
          duration: 3000,
          style: {
            background:
              "linear-gradient(90deg, rgba(203,0,0,1) 0%, rgba(251,30,144,1) 50%, rgba(227,123,29,1) 100%)",
          },
        }).showToast();
      }
    }
  };

  xhr.open("POST", url);
  xhr.send(formData);
}

function reset() {
  form.value = {
    tripId: "",
    customerName: "",
    customerMobile: "",
    date: "",
    time: "",
    adults: "",
    children: "",
    flightNumber: "",
    vehicleType: "0",
    baggages: "",
    pickupLocation: "",
    dropLocation: "",
    surfboard: "Not Available",
    distance: "",
    transportTimeH: "",
    transportTimeM: "",
    price: "",
  };
  pickupLocationUrl.value = "";
  dropLocationUrl.value = "";
}

async function calcRoute() {
  if (form.value.pickupLocation === "" || form.value.dropLocation === "") {
    return;
  }
  const directionsService = new google.maps.DirectionsService();
  await directionsService.route(
    {
      origin: form.value.pickupLocation,
      destination: form.value.dropLocation,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
    },
    (response, status) => {
      if (status === "OK") {
        const distance = response.routes[0].legs[0].distance.text;
        const duration = response.routes[0].legs[0].duration.text;
        form.value.distance = (parseInt(distance) * 1.60934).toString();
        const time = duration.split(" ");
        if (time.length > 2) {
          form.value.transportTimeH = time[0];
          form.value.transportTimeM = time[2];
        } else {
          form.value.transportTimeH = "0";
          form.value.transportTimeM = time[0];
        }
      } else {
        alert("Directions request failed due to " + status);
      }
    }
  );
}

function setPickupLocation(location) {
  form.value.pickupLocation = location.place;
  pickupLocationUrl.value = location.url;
}

function setDropLocation(location) {
  form.value.dropLocation = location.place;
  dropLocationUrl.value = location.url;
}

function showInvoice() {
  const form_copy = { ...form.value };
  form_copy.pickupLocationUrl = pickupLocationUrl.value;
  form_copy.dropLocationUrl = dropLocationUrl.value;
  if (form_copy.tripId != "") {
    form_copy.tripId = `${trip_id_start.value}${form_copy.tripId}`;
  }

  const keys = Object.keys(form_copy);
  keys.forEach((key) => {
    if (form_copy[key] == "") {
      form_copy[key] = "N/A";
    }
  });
  printable.value = form_copy;
  const invoice = document.querySelector("#invoice_modal");
  invoice.showModal();
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
            <PrimaryInput
              label="Flight number"
              placeholder="Enter Flight No"
              v-model="form.flightNumber"
            />
          </div>
          <!-- Flight number End -->

          <!-- Customer Start -->
          <div class="col-span-12 md:col-span-6">
            <PrimaryInput
              label="Customer Name"
              placeholder="Enter the customer name"
              v-model="form.customerName"
            />
          </div>
          <div class="col-span-12 md:col-span-6">
            <PrimaryInput
              label="Customer Mobile No"
              placeholder="Enter the customer mobile number"
              v-model="form.customerMobile"
            />
          </div>
          <!-- Customer End -->

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
          <div class="col-span-6 md:col-span-6 lg:col-span-4 flex flex-col">
            <PrimarySelect
              label="Vehicle Type"
              placeholder="Select Vehicle Type"
              :options="vehicles"
              v-model="form.vehicleType"
            />
          </div>
          <!-- Vehicle Type End -->

          <!-- Baggages Start -->
          <div class="col-span-6 md:col-span-6 lg:col-span-4">
            <PrimaryInput
              label="Baggages"
              placeholder="Enter Baggages"
              v-model="form.baggages"
            />
          </div>
          <!-- Baggages Start -->

          <!-- Surfboard Start -->
          <div class="col-span-12 md:col-span-6 lg:col-span-4">
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

          <!-- Location Start -->
          <div class="col-span-12 md:col-span-6">
            <label class="form-control w-full">
              <div class="label uppercase">
                <span class="label-text">Pickup location</span>
              </div>
              <div
                @click="pickup_modal = true"
                class="w-full whitespace-nowrap cursor-pointer h-[3rem] rounded-lg flex items-center px-5 overflow-x-scroll bg-gray-200 dark:bg-[#1d232a] border border-gray-300 dark:border-gray-700"
              >
                {{ form.pickupLocation }}
              </div>
            </label>
          </div>
          <div class="col-span-12 md:col-span-6">
            <label class="form-control w-full">
              <div class="label uppercase">
                <span class="label-text">Drop location</span>
              </div>
              <div
                @click="drop_modal = true"
                class="w-full whitespace-nowrap cursor-pointer h-[3rem] rounded-lg flex items-center px-5 overflow-x-scroll bg-gray-200 dark:bg-[#1d232a] border border-gray-300 dark:border-gray-700"
              >
                {{ form.dropLocation }}
              </div>
            </label>
          </div>
          <!-- Location End -->

          <!-- Price STart -->
          <!-- <div class="col-span-12 md:col-span-4">
            <PrimaryInput
              label="Price"
              placeholder="Enter The Price"
              v-model="form.price"
            />
          </div> -->
          <!-- Price End -->

          <!-- Distance Start -->
          <div class="col-span-12 md:col-span-4 lg:col-span-3">
            <PrimaryInput
              label="Total Distance"
              placeholder="Enter The Distance"
              messure="KM"
              v-model="form.distance"
            />
          </div>
          <!-- Distance End -->

          <!-- Time Start -->
          <div class="col-span-12 md:col-span-8 lg:col-span-5">
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

          <!-- Pricing Start -->
          <div class="col-span-12 lg:col-span-4">
            <PrimaryInput
              label="Price"
              placeholder="Enter The Price"
              v-model="form.price"
            />
          </div>
          <!-- Pricing End -->

          <!-- Button Set Start -->
          <div
            class="col-span-12 flex flex-col md:flex-row justify-center md:justify-end gap-4"
          >
            <button class="btn btn-error order-4 md:order-1" @click="reset">
              Reset
            </button>
            <button
              class="btn btn-success order-3 md:order-2"
              @click="showInvoice"
            >
              Print
            </button>
            <button class="btn btn-primary order-2 md:order-3" @click="copy">
              <v-icon :name="copy_icon" />
              Copy To Clipboard
            </button>
            <button
              class="btn btn-neutral order-1 md:order-4"
              @click="getNumber"
            >
              Send Message
              <v-icon name="io-send" />
            </button>
          </div>
          <!-- Button Set End -->
        </div>
      </div>
    </div>
    <MapModal
      :is-open="pickup_modal"
      @onclose="pickup_modal = false"
      @get-location="setPickupLocation"
      unique-id="pickup-location"
    />
    <MapModal
      :is-open="drop_modal"
      @onclose="drop_modal = false"
      @get-location="setDropLocation"
      unique-id="drop-location"
    />
    <Invoice :options="printable" />
    <NumberModal @send="sendMsg" />
    <ToggleTheme />
  </div>
</template>

<style scoped></style>
