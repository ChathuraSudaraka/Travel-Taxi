<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { onMounted, ref } from "vue";

const location = ref({
  lat: 6.9271,
  lng: 79.8612,
});
let marker = null;

onMounted(() => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "weekly",
  });

  const mapOptions = {
    center: location.value,
    zoom: 7,
  };
  // Promise for a specific library
  loader
    .importLibrary("maps")
    .then(({ Map }) => {
      const map = new Map(document.getElementById("googlemap"), mapOptions);
      marker = new google.maps.Marker({
        position: location.value,
        map,
        title: "Drag To Select The Location !",
        draggable: true,
      });
    })
    .catch((e) => {
      alert("Error", e);
    });
});

function getLocation() {
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ location: marker.getPosition() }, (results, status) => {
    if (status === "OK" && results[0]) {
      const address = results[0].formatted_address;
      alert(address);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
</script>

<template>
  <!-- Map Modal Start -->
  <dialog id="map_modal" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <h3 class="font-bold text-lg uppercase">Select The Location !</h3>

      <div class="mt-5 w-full">
        <label class="form-control w-full">
          <div class="label uppercase">
            <span class="label-text">Address</span>
          </div>
          <input
            type="text"
            placeholder="Enter The Address"
            class="input input-bordered w-full"
            id="pac-input"
          />
        </label>
        <div class="mt-4 w-full h-[400px]" id="googlemap"></div>
      </div>
      <div class="mt-5 flex justify-end">
        <button class="btn btn-neutral" @click="getLocation">Choose</button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
  <!-- Map Modal End -->
</template>
