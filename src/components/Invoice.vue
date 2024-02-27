<script setup>
import { jsPDF } from "jspdf";
import Toastify from "toastify-js";

const props = defineProps({
  items: {
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
      pdf.save(`transfer-${props.items.tripId}.pdf`);
    },
  });
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
              <div class="grid grid-cols-2">
                <div class="pt-2">
                  <img src="/img/machanlogo.png" id="logo" />
                </div>
                <div class="flex flex-col pt-3">
                  <div class="grid grid-cols-2">
                    <div class="text-gray-800 font-bold">Invoice Id:</div>
                    <div class="text-gray-500">BRA-00335</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="text-gray-800 font-bold">Invoiced Date:</div>
                    <div class="text-gray-500">feb 26, 2024</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="text-gray-800 font-bold">Due Date :</div>
                    <div class="text-gray-500">feb 30, 2024</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="grid grid-cols-3 bg-orange-100 text-gray-700 px-14 py-3 text-sm"
            >
              <div class="col-span-2 flex-col gap-1">
                <p><strong>Phone:</strong> +94 705321516</p>
                <p><strong>Email:</strong> example@gmail.com</p>
                <p><strong>Addres:</strong> Example, 117 road</p>
              </div>
              <div class="flex flex-col gap-1">
                <p class="font-bold uppercase text-gray-700">
                  Customer Details
                </p>
                <p><strong>Name:</strong> Chathura Sudaraka</p>
                <p><strong>Number:</strong> +94 705321516</p>
              </div>
            </div>

            <div class="px-14 py-5 text-sm text-neutral-700">
              <table class="w-full border-collapse border-spacing-0">
                <thead class="bg-[#ff5801] text-white">
                  <tr>
                    <td class="font-bold uppercase text-md px-5 py-2">Label</td>
                    <td class="font-bold uppercase text-md px-5 py-2">Value</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="border-b py-3 pl-3">Trip Id</td>
                    <td class="border-b py-3 pl-2">120120</td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Date & Time</td>
                    <td class="border-b py-3 pl-2">2024 Dec 12, 10:00 AM</td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Passengers</td>
                    <td class="border-b py-3 pl-2">
                      <div class="w-full grid grid-cols-2">
                        <div class="flex gap-2">
                          <div class="text-gray-600">Adults:</div>
                          <div class="text-gray-500">5</div>
                        </div>
                        <div class="flex gap-2">
                          <div class="text-gray-600">Children:</div>
                          <div class="text-gray-500">2</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Vehicle Type</td>
                    <td class="border-b py-3 pl-2">Buddy Van</td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Baggages</td>
                    <td class="border-b py-3 pl-2">5</td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Pickup Location</td>
                    <td class="border-b py-3 pl-2">120120</td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Drop Location</td>
                    <td class="border-b py-3 pl-2">120120</td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Total Distance</td>
                    <td class="border-b py-3 pl-2">120120</td>
                  </tr>
                  <tr>
                    <td class="border-b py-3 pl-3">Transport Time</td>
                    <td class="border-b py-3 pl-2">5H 23M</td>
                  </tr>
                </tbody>
              </table>
              <div class="grid grid-cols-12 mt-3">
                <div class="col-span-7 flex flex-col">
                  <h3 class="text-[#ff5801] text-lg font-bold">
                    THANK YOU FOR YOUR BUSINESS
                  </h3>
                  <div class="flex flex-col px-5 gap-2 mt-2">
                    <span class="flex gap-3">
                      <div
                        class="p-[5px] bg-[#ff5801] rounded-full flex justify-center items-center"
                      >
                        <img 
                          src="/img/icons/phone.png"
                          class="w-[13px]"
                        />
                      </div>
                      <p>+94 77 111 2223</p>
                    </span>
                    <span class="flex gap-3">
                      <div
                        class="p-[5px] bg-[#ff5801] rounded-full flex justify-center items-center"
                      >
                      <img 
                          src="/img/icons/email.png"
                          class="w-[13px]"
                        />
                      </div>
                      <p>johndoe@example.com</p>
                    </span>
                  </div>
                  <p class="mt-3">
                    Please send payment within 30 days of receiving this
                    invoice. There will be 10% interest charge per month on late
                    invoice.
                  </p>
                </div>
                <div class="col-span-5 grid grid-cols-2 p-3">
                  <div
                    class="border-t border-t-gray-300 col-span-full grid grid-cols-2 p-3"
                  >
                    <div class="font-bold">Sub Total:</div>
                    <div class="">Rs. 800.00</div>
                  </div>
                  <div
                    class="border-t border-t-gray-300 col-span-full grid grid-cols-2 p-3"
                  >
                    <div class="font-bold">Net Vat:</div>
                    <div class="">Rs. 200.00</div>
                  </div>
                  <div class="bg-[#ff5801] col-span-full grid grid-cols-2 p-3">
                    <div class="whitespace-nowrap font-bold text-white">
                      Total:
                    </div>
                    <div class="whitespace-nowrap font-bold text-white">
                      Rs. 1000.00
                    </div>
                  </div>
                  <div class="col-span-full flex flex-col items-center mt-3">
                    <div
                      class="w-full border-b border-b-gray-400 border-dashed flex justify-center pb-2"
                    >
                      <img
                        src="/img/signature.png"
                        alt="signature"
                        class="h-10"
                      />
                    </div>
                    <p class="text-[#ff5801] mt-2 italic">John Doe</p>
                    <p class="font-bold">COMPANY CEO</p>
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
