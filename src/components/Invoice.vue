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
    <div class="modal-box w-11/12 max-w-4xl rounded-lg shadow-lg">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <div class="">
        <!-- Invoice -->
        <div id="printable_invoice" class="">
          <img src="/img/invoice-structure.png" class="absolute w-full" />
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

@media print {
  body,
  page[size="a4"] {
    margin: 0;
    box-shadow: 0;
  }
}
</style>
