<script setup>
import { jsPDF } from "jspdf";
import Toastify from "toastify-js";

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
});

function print() {
  const printable = document.getElementById("printable_invoice");
  Toastify({
    text: "Downloading started",
    close: true,
    duration: 3000,
    style: {
      background:
        "linear-gradient(90deg, rgba(192,0,203,1) 0%, rgba(30,84,251,1) 50%, rgba(29,227,113,1) 100%)",
    },
  }).showToast();
  const doc = new jsPDF({
    unit: "px", // Change unit to millimeters
    format: [795, 1125], // Set format to A4
  });

  doc.html(printable, {
    callback: function (pdf) {
      pdf.save(`transfer-${props.options.tripId}.pdf`);
    },
  });
}

function formatDate(date) {
  const isDate = Object.prototype.toString.call(date) === "[object Date]";
  if (!isDate) {
    return;
  }
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];

  const day = String(date.getDate()).padStart(2, "0");
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month?.toUpperCase()} ${year}`;
}
</script>

<template>
  <!-- Print Modal Start -->
  <dialog id="invoice_modal" class="modal">
    <div class="modal-box w-11/12 max-w-4xl rounded-lg shadow-lg fixed">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <div class="p-5">
        <!-- Invoice -->
        <div id="printable_invoice" class="">
          <img src="/img/invoice-structure.jpg" class="absolute w-full" />
          <div class="relative">
            <div class="px-14 py-5" id="top-position">
              <div class="grid grid-cols-5">
                <div class="pt-2 col-span-2">
                  <img src="/img/machanlogo.png" id="logo" />
                </div>
                <div class="col-span-3 flex flex-col pt-3">
                  <div class="grid grid-cols-3">
                    <div class="text-gray-800 font-bold">Invoice Id:</div>
                    <div class="col-span-2 text-gray-500">
                      TID-{{ options.tripId }}
                    </div>
                    <div class="text-gray-800 font-bold">Invoiced Date:</div>
                    <div class="col-span-2 text-gray-500">
                      {{ formatDate(new Date()) }}
                    </div>
                    <div class="text-gray-800 font-bold">Due Date :</div>
                    <div class="col-span-2 text-gray-500">
                      {{ formatDate(new Date(options.date)) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 bg-orange-100 text-gray-700 px-14 py-3 text-sm">
              <div class="flex flex-col gap-1">
                <p class="font-bold text-orange-500 text-[16px]">machanTAXI</p>
                <p>Reliable budget taxi service in Sri Lanka</p>
                <div class="flex-col gap-1">
                  <p>
                    <strong class="mr-2">Website: </strong><a href="https://www.machantaxi.com">www.machantaxi.com</a>
                  </p>
                  <p><strong class="mr-2">FB: </strong>machantaxi</p>
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <p class="font-bold uppercase text-gray-700">
                  Customer&nbsp;&nbsp;Details
                </p>
                <p><strong>Name:</strong> {{ options.customerName }}</p>
                <p><strong>T/P:</strong> {{ options.customerMobile }}</p>
              </div>
            </div>

            <div class="px-14 py-5 text-sm text-neutral-700">
              <table class="w-full border-collapse border-spacing-0">
                <thead class="bg-[#ff5801] text-white">
                  <tr>
                    <th colspan="2" class="uppercase text-md p-2">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border-b py-3 pl-3">Trip Id</td>
                    <td class="border-b py-3 pl-2">{{ options.tripId }}</td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Fight Number</td>
                    <td class="border-b py-3 pl-2">
                      {{ options.flightNumber }}
                    </td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Date & Time</td>
                    <td class="border-b py-3 pl-2">
                      {{ formatDate(new Date(options.date)) }},
                      {{ options.time }}
                    </td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Passengers</td>
                    <td class="border-b py-3 pl-2">
                      <div class="w-full grid grid-cols-2">
                        <div class="flex gap-2">
                          <div class="text-gray-600">Adults:</div>
                          <div class="text-gray-500">{{ options.adults }}</div>
                        </div>
                        <div class="flex gap-2">
                          <div class="text-gray-600">Children:</div>
                          <div class="text-gray-500">
                            {{ options.children }}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Vehicle Type</td>
                    <td class="border-b py-3 pl-2">
                      {{ options.vehicleType }}
                    </td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Accessories</td>
                    <td class="border-b py-3 pl-2">
                      <div class="w-full grid grid-cols-2">
                        <div class="flex gap-2">
                          <div class="text-gray-600">Baggages:</div>
                          <div class="text-gray-500">
                            {{ options.baggages }}
                          </div>
                        </div>
                        <div class="flex gap-2">
                          <div class="text-gray-600">Surfboard:</div>
                          <div class="text-gray-500">
                            {{ options.surfboard }}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Pickup Location</td>
                    <td class="border-b py-3 pl-2">
                      {{ options.pickupLocation }}
                    </td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Drop Location</td>
                    <td class="border-b py-3 pl-2">
                      {{ options.dropLocation }}
                    </td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Total Distance</td>
                    <td class="border-b py-3 pl-2">{{ options.distance }}</td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Transport Time</td>
                    <td class="border-b py-3 pl-2">
                      {{ options.transportTimeH }}H
                      {{ options.transportTimeM }}M
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="grid grid-cols-12 mt-3">
                <div class="col-span-7 flex flex-col">
                  <h3 class="text-[#ff5801] text-lg font-bold">
                    THANK&nbsp;&nbsp;FOR&nbsp;&nbsp;YOUR&nbsp;&nbsp;BUSINESS
                  </h3>
                  <div class="flex flex-col px-5 gap-2 mt-2">
                    <span class="flex gap-3">
                      <div class="p-[5px] bg-[#ff5801] rounded-full flex justify-center items-center">
                        <img src="/img/icons/phone.png" class="w-[13px]" />
                      </div>
                      <p>+94 71 780 0600 (Whatsapp Hotline&rpar;</p>
                    </span>
                    <span class="flex gap-3">
                      <div class="p-[5px] bg-[#ff5801] rounded-full flex justify-center items-center">
                        <img src="/img/icons/email.png" class="w-[13px]" />
                      </div>
                      <p>machantaxisrilanka&commat;gmail&period;com</p>
                    </span>
                  </div>
                  <p class="mt-3">
                    We appreciate your business.
                    <span class="font-semibold">
                      This is a computer-generated invoice and does not require
                      a signature. </span>. If you have any questions, please do not hesitate to
                    contact us. Also refer our
                    <a href="https://machan.store/tos.html" class="text-blue-500">Terms & Conditions</a>
                  </p>
                </div>
                <div class="col-span-5 grid place-items-start grid-cols-2 p-3">
                  <div class="w-full bg-[#ff5801] col-span-full grid grid-cols-2 p-3">
                    <div class="whitespace-nowrap font-bold text-white">
                      Total:
                    </div>
                    <div class="whitespace-nowrap font-bold text-white">
                      Rs. {{ options.price }}.00
                    </div>
                  </div>
                  <div class="w-full col-span-full mt-3">
                    <h3 class="text-[#ff5801] font-bold">Payment Methods</h3>
                    <div class="pl-3 mt-2">
                      <ul>
                        <li class="list-disc">Cash To Driver (LKR Only)</li>
                        <li class="list-disc">
                          Online card payment (accept USD, charge extra 5%)
                        </li>
                        <li class="list-disc">Cryptocurrency Payment (USDT)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- End Invoice -->
      </div>

      <div class="mt-4 flex justify-end gap-2">
        <form method="dialog">
          <button class="btn btn-error">Close</button>
        </form>
        <button class="btn btn-primary" @click="print">Save</button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  <!-- Print Modal End -->
</template>

<style>
#printable_invoice {
  position: relative;
  width: 795px;
  height: 1122px;
  background-image: url("/img/invoice-structure.png");
  background-size: contain;
  background: white;
}

#top-position {
  padding-top: 100px;
}

#logo {
  height: 70px;
}
</style>
