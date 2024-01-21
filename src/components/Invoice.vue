<template>
    <!-- Print Modal Start -->
    <!-- You can open the modal using ID.showModal() method -->
    <dialog id="my_modal_4" class="modal">
        <div class="modal-box w-11/12 max-w-5xl bg-white rounded-lg shadow-lg">
            <div class="p-8 mx-auto bg-white w-96 text-black">
                <div class="min-h-16 flex justify-between items-center">
                    <div class="flex-shrink-0">
                        <img src="/img/machanlogo.jpg" alt="logo" width="120px" height="120px" />
                    </div>
                    <div class="info text-right">
                        <h2 class="text-2xl font-bold">machanTAXI</h2>
                        <h2 class="text-2xl font-bold">Sri Lanka reliable Budget Taxi Service</h2>
                    </div>
                </div>


                <div class="min-h-32 pt-10">
                    <div class="info">
                        <h2 class="text-lg font-bold mb-2">Contact Info</h2>
                        <p class="text-sm">
                            Address: street city, state 0000<br>
                            Website: www.machantaxi.com<br>
                            Phone: +94 717 800 600
                        </p>
                    </div>
                </div>

                <div class="pt-10">
                    <div id="table">
                        <table class="w-full border-collapse">
                            <tr class="bg-gray-200">
                                <td class="py-3 px-2 font-semibold"></td>
                                <td class="py-3 px-2 font-semibold"></td>
                                <td class="py-3 px-2 font-semibold"></td>
                            </tr>

                            <!-- Add more rows as needed -->

                            <tr>
                                <td class="py-2 px-4">Trip ID</td>
                                <td class="py-2 px-4">N/A</td>
                            </tr>

                            <tr>
                                <td class="py-2 px-4">Date</td>
                                <td class="py-2 px-4">N/A</td>
                            </tr>

                            <tr>
                                <td class="py-2 px-4">Time</td>
                                <td class="py-2 px-4">N/A</td>
                            </tr>
                            <tr>
                                <td class="py-2 px-4">Adults</td>
                                <td class="py-2 px-4">N/A</td>
                            </tr>
                            <tr>
                                <td class="py-2 px-4">Children</td>
                                <td class="py-2 px-4">N/A</td>
                            </tr>
                            <tr>
                                <td class="py-2 px-4">Surfboard</td>
                                <td class="py-2 px-4">N/A</td>
                            </tr>
                            <tr>
                                <td class="py-2 px-4">Baggages</td>
                                <td class="py-2 px-4">N/A</td>
                            </tr>
                            <tr>
                                <td class="py-2 px-4">vehicle Type</td>
                                <td class="py-2 px-4">N/A</td>
                            </tr>
                            <tr>
                                <td class="py-2 px-4">pickup Location</td>
                                <td class="py-2 px-4">N/A</td>
                            </tr>
                            <tr>
                                <td class="py-2 px-4">drop Location</td>
                                <td class="py-2 px-4">N/A</td>
                            </tr>
                            <tr>
                                <td class="py-2 px-4">Distance</td>
                                <td class="py-2 px-4">N/A</td>
                            </tr>
                            <tr>
                                <td class="py-2 px-4">transport Time</td>
                                <td class="py-2 px-4">N/A</td>
                            </tr>
                        </table>
                    </div>

                    <div class="mt-5">
                        <p class="text-sm"><strong></strong>

                        </p>
                    </div>
                </div>
            </div>

            <div class="modal-action mt-4 flex justify-end">
                <form method="dialog">
                    <button class="btn">
                        Save
                    </button>
                </form>
            </div>
        </div>
    </dialog>
    <!-- Print Modal End -->
</template>