<script>
import PrimaryInput from "@/PrimaryInput.vue";
</script>
<template>
    <!-- Number Modal Start -->
    <input type="checkbox" class="modal-toggle" />
    <div class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
            <h3 class="font-bold text-lg uppercase">Enter the Number !</h3>

            <!-- Baggages Start -->
            <div class="col-span-6 md:col-span-12 lg:col-span-6">
                <PrimaryInput label="Mobile Number" placeholder="Enter The Number" v-model="form.baggages" />
            </div>
            <!-- Baggages Start -->
            <div class="mt-5 flex justify-end">
                <button class="btn btn-neutral" @click="">Choose</button>
            </div>
        </div>
        <label class="modal-backdrop">Close</label>
    </div>
    <!-- Number Modal End -->
</template>