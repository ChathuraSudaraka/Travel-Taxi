<script setup>
import { Loader } from "@googlemaps/js-api-loader";
import { onMounted, ref, watch } from "vue";

const emit = defineEmits(["onclose", "get-location"]);
const props = defineProps({
  isOpen: Boolean,
  uniqueId: {
    type: String,
    required: true,
  },
});

const selected_url = ref("");
const status = ref(props.isOpen);
watch(status, (value) => {
  if (!value) {
    emit("onclose");
  }
});
watch(
  () => props.isOpen,
  (value) => {
    status.value = value;
  }
);

const location = ref({
  lat: 6.9271,
  lng: 79.8612,
});
const streetRef = ref();
let marker = null;

onMounted(() => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "weekly",
    libraries: ["places"],
  });

  const mapOptions = {
    center: location.value,
    zoom: 7,
  };
  // Promise for a specific library
  loader
    .importLibrary("maps")
    .then(({ Map }) => {
      const map = new Map(
        document.getElementById(`${props.uniqueId}-googlemap`),
        mapOptions
      );
      marker = new google.maps.Marker({
        position: location.value,
        map,
      });

      // auto complete address
      const autocomplete = new google.maps.places.Autocomplete(
        streetRef.value,
        {
          types: ["establishment"],
          fields: ["address_components", "geometry", "icon", "name", "url"],
          bounds: map.getBounds(),
          location: map.getCenter(),
        }
      );

      // add event listener to autocomplete place change
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          alert(
            "No details available for input: '" +
            place.name +
            "'. Please Try Again !"
          );
          return;
        }
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
        }

        selected_url.value = place.url;
        marker.setPosition(place.geometry.location);
      });
    })
    .catch((e) => {
      console.log("Error", e);
    });
});

async function getLocation() {
  const geocoder = new google.maps.Geocoder();
  let output = {};
  await geocoder.geocode(
    { location: marker.getPosition() },
    (results, status) => {
      if (status === "OK" && results[0]) {
        let lat = marker.getPosition().lat();
        let lng = marker.getPosition().lng();

        output.url = selected_url.value;
        output.place = results[0].formatted_address;
      } else {
        output = "try again !";
      }
      emit("get-location", output);
    }
  );
  status.value = false;
}
</script>

<template>
  <!-- Map Modal Start -->
  <input type="checkbox" v-model="status" :id="uniqueId" class="modal-toggle" />
  <div :id="uniqueId" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
      <h3 class="font-bold text-lg uppercase">Select The Location !</h3>

      <div class="mt-5 w-full">
        <label class="relative form-control w-full">
          <div class="label uppercase">
            <span class="label-text">Address</span>
          </div>
          <input type="text" placeholder="Enter The Address" class="input input-bordered w-full" ref="streetRef" />
        </label>
        <div class="mt-4 w-full h-[400px]" :id="`${uniqueId}-googlemap`"></div>
      </div>
      <div class="mt-5 flex justify-end">
        <button class="btn btn-neutral" @click="getLocation">Choose</button>
      </div>
    </div>
    <label class="modal-backdrop" :for="uniqueId">Close</label>
  </div>
  <!-- Map Modal End -->
</template>
