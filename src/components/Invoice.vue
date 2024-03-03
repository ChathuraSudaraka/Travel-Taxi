<script setup>
import { jsPDF } from "jspdf";
import Toastify from "toastify-js";
import { ref } from "vue";
import UnpaidInvoice from "./UnpaidInvoice.vue";
import PaidInvoice from "./PaidInvoice.vue";

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
});

const active_tab = ref(1);

function getUnpaidPDF() {
  const unpaid = document.getElementById("unpaid_invoice");

  const unpaid_doc = new jsPDF({
    unit: "px", // Change unit to millimeters
    format: [795, 1125], // Set format to A4
  });

  Toastify({
    text: "Processing Unpaid PDF",
    close: true,
    duration: 3000,
    style: {
      background:
        "linear-gradient(90deg, rgba(192,0,203,1) 0%, rgba(30,84,251,1) 50%, rgba(29,227,113,1) 100%)",
    },
  }).showToast();

  // Download Unpaid Pdf
  unpaid_doc.html(unpaid, {
    callback: function (pdf) {
      // Add a hyperlink to the generated PDF
      pdf.textWithLink(
        "HERE", // Text to display
        185, // X coordinate
        1016, // Y coordinate
        {
          url: "https://machan.store/tos.html", // URL to link
          target: "_blank", // Open in a new tab
        }
      );
      pdf.textWithLink(
        "Visit", // Text to display
        650, // X coordinate
        670, // Y coordinate
        {
          url: props.options.pickupLocationUrl, // URL to link
          target: "_blank", // Open in a new tab
        }
      );
      pdf.textWithLink(
        "Visit", // Text to display
        650, // X coordinate
        717, // Y coordinate
        {
          url: props.options.dropLocationUrl, // URL to link
          target: "_blank", // Open in a new tab
        }
      );
      pdf.save(`transfer-${props.options.tripId}-unpaid.pdf`);
    },
  });
}

function getPaidPDF() {
  const paid = document.getElementById("paid_invoice");

  const paid_doc = new jsPDF({
    unit: "px", // Change unit to millimeters
    format: [795, 1125], // Set format to A4
  });

  Toastify({
    text: "Processing paid PDF",
    close: true,
    duration: 3000,
    style: {
      background:
        "linear-gradient(90deg, rgba(192,0,203,1) 0%, rgba(30,84,251,1) 50%, rgba(29,227,113,1) 100%)",
    },
  }).showToast();

  // Download Paid Pdf
  paid_doc.html(paid, {
    callback: function (pdf) {
      // Add a hyperlink to the generated PDF
      pdf.textWithLink(
        "HERE", // Text to display
        185, // X coordinate
        1016, // Y coordinate
        {
          url: "https://machan.store/tos.html", // URL to link
          target: "_blank", // Open in a new tab
        }
      );
      pdf.textWithLink(
        "Visit", // Text to display
        650, // X coordinate
        670, // Y coordinate
        {
          url: props.options.pickupLocationUrl, // URL to link
          target: "_blank", // Open in a new tab
        }
      );
      pdf.textWithLink(
        "Visit", // Text to display
        650, // X coordinate
        717, // Y coordinate
        {
          url: props.options.dropLocationUrl, // URL to link
          target: "_blank", // Open in a new tab
        }
      );
      pdf.save(`transfer-${props.options.tripId}-paid.pdf`);
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
      <div class="p-5 flex flex-col">
        <!-- Tab Start -->
        <div
          class="w-full grid grid-cols-2 gap-3 p-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg"
        >
          <div
            @click="active_tab = 1"
            class="flex justify-center py-2 rounded-lg cursor-pointer"
            :class="{
              'bg-gray-300/50 dark:bg-gray-950/70': active_tab == 1,
            }"
          >
            Unpaid Invoice
          </div>
          <div
            @click="active_tab = 2"
            class="flex justify-center py-2 rounded-lg cursor-pointer"
            :class="{
              'bg-gray-300/50 dark:bg-gray-950/70': active_tab == 2,
            }"
          >
            Paid Invoice
          </div>
        </div>
        <!-- Tab End -->

        <span class="my-4 border-t border-gray-400 dark:border-gray-700"></span>

        <!-- Invoices Start -->
        <div v-show="active_tab == 1">
          <UnpaidInvoice :options="options" />
        </div>
        <div v-show="active_tab == 2">
          <PaidInvoice :options="options" />
        </div>
        <!-- Invoices End -->
      </div>

      <div class="mt-4 flex justify-end gap-2">
        <form method="dialog">
          <button class="btn btn-error">Close</button>
        </form>
        <button class="btn btn-primary" @click="getUnpaidPDF">Save Unpaid PDF</button>
        <button class="btn btn-success" @click="getPaidPDF">Save Paid PDF</button>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  <!-- Print Modal End -->
</template>

<style>
#unpaid_invoice,
#paid_invoice {
  position: relative;
  width: 795px;
  height: 1122px;
  background-image: url("/img/invoice-structure.png");
  background-size: contain;
  background: white;
}

#letterSpace {
  letter-spacing: 0.1px;
}

#top-position {
  padding-top: 100px;
}

#logo {
  height: 70px;
}
</style>
