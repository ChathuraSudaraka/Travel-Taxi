<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { onMounted } from "vue";

onMounted(() => {
  const loader = new Loader({
    apiKey: "AIzaSyAbohbtygYyq9eKq0zVq0VWNZJuEsjf48c",
    version: "weekly",
  });

  const mapOptions = {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 7,
  };
  // Promise for a specific library
  loader
    .importLibrary("maps")
    .then(({ Map }) => {
      new Map(document.getElementById("googlemap"), mapOptions);
    })
    .catch((e) => {
      alert("Error", e);
    });
});
</script>

<template>
  <!-- Map Modal Start -->
  <dialog id="map_modal" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <h3 class="font-bold text-lg uppercase">Select The Location !</h3>
      <div class="mt-4 w-full h-[400px]" id="googlemap"></div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  <!-- Map Modal End -->
</template>
