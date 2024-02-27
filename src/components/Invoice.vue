<script setup>
import { jsPDF } from "jspdf";
import Toastify from "toastify-js";
import "../hook/Invoice.css"

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
      setTimeout(() => {
        copy_icon.value = "md-contentcopy-round";
      }, 1500);
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
      <div class="flex content-center justify-center">
        <!-- Invoice -->
        <div id="printable_invoice" class="">
          <img src="/img/invoice-structure.png" class="absolute w-full" />
          <div class="px-14 py-10" id="top-position">
            <table class="w-full border-collapse border-spacing-0">
              <tbody>
                <tr>
                  <td class="w-full align-top">
                    <div>
                      <img src="/img/machanlogo.png" id="logo" />
                    </div>
                  </td>

                  <td class="align-top">
                    <div class="text-sm">
                      <table class="border-collapse border-spacing-0">
                        <tbody>
                          <tr>
                            <td class="border-r pr-4">
                              <div>
                                <p class="whitespace-nowrap text-slate-400 text-right">Date</p>
                                <p class="whitespace-nowrap font-bold text-main text-right">feb 26, 2024</p>
                              </div>
                            </td>
                            <td class="pl-4">
                              <div>
                                <p class="whitespace-nowrap text-slate-400 text-right">Invoice #</p>
                                <p class="whitespace-nowrap font-bold text-main text-right">BRA-00335</p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bg-slate-100 px-14 py-6 text-sm">
            <table class="w-full border-collapse border-spacing-0">
              <tbody>
                <tr>
                  <td class="w-1/2 align-top">
                    <div class="text-sm text-neutral-600">
                      <p>Phone: +94 705321516</p>
                      <p>Email: example@gmail.com</p>
                      <p>Addres: Example, 117 road</p>
                    </div>
                  </td>
                  <td class="w-1/2 align-top text-right">
                    <div class="text-sm text-neutral-600">
                      <p class="font-bold">Customer Details</p>
                      <p>Number: +94 705321516</p>
                      <p>Date: 2024/12/55</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="px-14 py-10 text-sm text-neutral-700">
            <table class="w-full border-collapse border-spacing-0">
              <thead>
                <tr>
                  <td class="border-b-2 border-main pb-3 pl-3 font-bold text-main">Item</td>
                  <td class="border-b-2 border-main pb-3 pl-2 font-bold text-main">Property</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="border-b py-3 pl-3">sssssssssss</td>
                  <td class="border-b py-3 pl-2">services</td>
                </tr>
                <tr>
                  <td colspan="7">
                    <table class="w-full border-collapse border-spacing-0">
                      <tbody>
                        <tr>
                          <td class="w-full"></td>
                          <td>
                            <table class="w-full border-collapse border-spacing-0">
                              <tbody>
                                <tr>
                                  <td class="border-b p-3">
                                    <div class="whitespace-nowrap text-slate-400">Net total:</div>
                                  </td>
                                  <td class="border-b p-3 text-right">
                                    <div class="whitespace-nowrap font-bold text-main">Rs.320.00</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="p-3">
                                    <div class="whitespace-nowrap text-slate-400">VAT total:</div>
                                  </td>
                                  <td class="p-3 text-right">
                                    <div class="whitespace-nowrap font-bold text-main">Rs.64.00</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td class="bg-main p-3">
                                    <div class="whitespace-nowrap font-bold text-white">Total:</div>
                                  </td>
                                  <td class="bg-main p-3 text-right">
                                    <div class="whitespace-nowrap font-bold text-white">Rs.384.00</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="px-14 text-sm text-neutral-700" style="display: flex; flex-wrap: wrap;">
            <div style="flex: 1; margin-right: 20px;">
              <p class="text-main font-bold">THANK YOU FOR YOUR BUSINESS</p>
              <span>
                <v-icon name="Fa-Phone-Alt" />
                <p>Phone</p>
              </span>
              <span>
                <v-icon name="Fa-Phone-Alt" />
                <p>Email</p>
              </span>
              <span>
                <v-icon name="Fa-Phone-Alt" />
                <p>Website</p>
              </span>
            </div>
            <div class="text-right px-2 py-20 text-sm text-neutral-700" style="flex: 1;">
              <p>__________________________</p>
              <p class="text-main font-bold pr-12">NAME</p>
              <p class="italic pr-6">COMPANY CEO</p>
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
body {
  background: rgb(204, 204, 204);
}

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
  height: 100px;
}

@media print {

  body,
  page[size="a4"] {
    margin: 0;
    box-shadow: 0;
  }
}
</style>
