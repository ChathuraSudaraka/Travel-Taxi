<script setup>
import { jsPDF } from "jspdf";

const props = defineProps({
  items: {
    type: Object,
    required: true,
  },
});

function print() {
  const printable = document.getElementById("printable_invoice");

  const doc = new jsPDF({
    unit: "px",
    format: [900 , 999],
  });

  doc.html(printable, {
    callback: function (pdf) {
      pdf.save("invoice.pdf");
    },
  });
}
</script>

<template>
  <!-- Print Modal Start -->
  <dialog id="invoice_modal" class="modal">
    <div class="modal-box w-11/12 max-w-4xl rounded-lg shadow-lg">
      <div class="">
        <!-- Invoice -->
        <div class="" id="printable_invoice">
          <div class="">
            <!-- Card -->
            <page class="p-4 rounded-xl" size="A5">
              <!-- Grid -->
              <div class="flex justify-between">
                <div>
                  <img src="/img/machanlogo.png" alt="" class="w-32 h-30" width="26" height="26" />

                  <!-- <h1 class="mt-2 text-lg md:text-xl font-semibold text-blue-600 dark:text-white">Preline Inc.
                  </h1> -->
                </div>
                <!-- Col -->

                <div class="text-end">
                  <h2 class="text-2xl md:text-2xl font-semibold text-gray-800">
                    Sri Lanka reliable Budget Taxi Service
                  </h2>
                </div>
                <!-- Col -->
              </div>
              <!-- End Grid -->

              <!-- Table -->
              <div class="mt-6">
                <div class="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">

                  <div class="grid grid-cols-5 gap-2">
                    <div class="col-span-2">
                      <p class="font-medium text-gray-800">Trip ID</p>
                    </div>
                    <div>
                      <p class="text-start text-gray-800">
                        {{ items.tripId }}
                      </p>
                    </div>
                  </div>

                  <div class="grid grid-cols-5 gap-2">
                    <div class="col-span-2">
                      <p class="font-medium text-gray-800">Date</p>
                    </div>
                    <div>
                      <p class="text-start text-gray-800">{{ items.date }}</p>
                    </div>
                  </div>

                  <div class="grid grid-cols-5 gap-2">
                    <div class="col-span-2">
                      <p class="font-medium text-gray-800">Time</p>
                    </div>
                    <div>
                      <p class="text-start text-gray-800">{{ items.time }}</p>
                    </div>
                  </div>

                  <div class="grid grid-cols-5 gap-2">
                    <div class="col-span-2">
                      <p class="font-medium text-gray-800">Adults</p>
                    </div>
                    <div>
                      <p class="text-start text-gray-800">
                        {{ items.adults }}
                      </p>
                    </div>
                  </div>

                  <div class="grid grid-cols-5 gap-2">
                    <div class="col-span-2">
                      <p class="font-medium text-gray-800">Children</p>
                    </div>
                    <div>
                      <p class="text-start text-gray-800">
                        {{ items.children }}
                      </p>
                    </div>
                  </div>

                  <div class="grid grid-cols-5 gap-2">
                    <div class="col-span-2">
                      <p class="font-medium text-gray-800">Surfboard</p>
                    </div>
                    <div class="col-span-2">
                      <p class="text-start text-gray-800">
                        {{ items.surfboard }}
                      </p>
                    </div>
                  </div>

                  <div class="grid grid-cols-5 gap-2">
                    <div class="col-span-2">
                      <p class="font-medium text-gray-800">Baggages</p>
                    </div>
                    <div>
                      <p class="text-start text-gray-800">
                        {{ items.baggages }}
                      </p>
                    </div>
                  </div>

                  <div class="grid grid-cols-5 gap-2">
                    <div class="col-span-2">
                      <p class="font-medium text-gray-800">Vehicle Type</p>
                    </div>
                    <div>
                      <p class="text-start text-gray-800">
                        {{ items.vehicleType }}
                      </p>
                    </div>
                  </div>

                  <div class="grid grid-cols-5 gap-2">
                    <div class="col-span-2">
                      <p class="font-medium text-gray-800">Pickup Location</p>
                    </div>
                    <div class="col-span-3">
                      <a class="text-start text-blue-600" :href="items.pickupLocationUrl">
                        {{ items.pickupLocationUrl?.trim() }}
                      </a>
                    </div>
                  </div>

                  <div class="grid grid-cols-5 gap-2">
                    <div class="col-span-2">
                      <p class="font-medium text-gray-800">Drop Location</p>
                    </div>
                    <div class="col-span-3">
                      <a class="text-start text-blue-600" :href="items.dropLocationUrl">
                        {{ items.dropLocationUrl?.trim() }}
                      </a>
                    </div>
                  </div>

                  <div class="grid grid-cols-5 gap-2">
                    <div class="col-span-2">
                      <p class="font-medium text-gray-800">Distance</p>
                    </div>
                    <div>
                      <p class="text-start text-gray-800">
                        {{ items.distance }} KM
                      </p>
                    </div>
                  </div>

                  <div class="grid grid-cols-5 gap-2">
                    <div class="col-span-2">
                      <p class="font-medium text-gray-800">Transport Time</p>
                    </div>
                    <div class="col-span-2">
                      <p class="text-start text-gray-800">
                        {{ items.transportTimeH }}H {{ items.transportTimeM }}M
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- End Table -->

              <div class="mt-8">
                <h4 class="text-lg font-semibold text-gray-800">Thank you!</h4>
                <p class="text-gray-500">
                  If you have any questions concerning this invoice, use the
                  following contact information:
                </p>
                <div class="mt-2">
                  <p class="block text-sm font-medium text-gray-800">
                    www.machantaxi.com
                  </p>
                  <p class="block text-sm font-medium text-gray-800">
                    +94 717 800 600
                  </p>
                </div>
              </div>

              <p class="mt-5 text-sm text-gray-500">© 2024 machanTaxi.</p>
            </page>
            <!-- End Card -->
          </div>
        </div>
        <!-- End Invoice -->
      </div>

      <div class="mt-4 flex justify-end">
        <button class="btn" @click="print">Save</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  <!-- Print Modal End -->
</template>

<style>
body {
  background: rgb(204, 204, 204);
}

page[size="A5"] {
  background: white;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5cm;
}

@media print {

  body,
  page[size="A4"] {
    margin: 0;
    box-shadow: 0;
  }
}
</style>