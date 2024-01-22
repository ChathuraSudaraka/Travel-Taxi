<template>
  <!-- Print Modal Start -->
  <dialog id="invoice_modal" class="modal">
    <div class="modal-box w-11/12 max-w-5xl rounded-lg shadow-lg">

      <body class="">
        <!-- Invoice -->
        <div class="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
          <div class="sm:w-11/12 lg:w-3/4 mx-auto">
            <!-- Card -->
            <div class="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dark:bg-gray-800">
              <!-- Grid -->
              <div class="flex justify-between">
                <div>

                  <img src="/img/machanlogo.png" alt="" class="w-32 h-30" width="26" height="26">

                  <!-- <h1 class="mt-2 text-lg md:text-xl font-semibold text-blue-600 dark:text-white">Preline Inc.
                  </h1> -->
                </div>
                <!-- Col -->

                <div class="text-end">
                  <h2 class="text-2xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200">Sri Lanka reliable
                    Budget Taxi Service</h2>
                </div>
                <!-- Col -->
              </div>
              <!-- End Grid -->


              <!-- Table -->
              <div class="mt-6">
                <div class="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-gray-700">

                  <!-- <div class="hidden sm:block border-b border-gray-200 dark:border-gray-700"></div> -->

                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                      <p class="font-medium text-gray-800 dark:text-gray-200">Trip ID</p>
                    </div>
                    <div>
                      <p class="sm:text-end text-gray-800 dark:text-gray-200">N/A</p>
                    </div>
                  </div>

                  <div class="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>

                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                      <p class="font-medium text-gray-800 dark:text-gray-200">Date</p>
                    </div>
                    <div>
                      <p class="sm:text-end text-gray-800 dark:text-gray-200">N/A</p>
                    </div>
                  </div>

                  <div class="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>

                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                      <p class="font-medium text-gray-800 dark:text-gray-200">Time</p>
                    </div>
                    <div>
                      <p class="sm:text-end text-gray-800 dark:text-gray-200">N/A</p>
                    </div>
                  </div>

                  <div class="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>
                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                      <p class="font-medium text-gray-800 dark:text-gray-200">Adults</p>
                    </div>
                    <div>
                      <p class="sm:text-end text-gray-800 dark:text-gray-200">N/A</p>
                    </div>
                  </div>

                  <div class="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>
                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                      <p class="font-medium text-gray-800 dark:text-gray-200">Children</p>
                    </div>
                    <div>
                      <p class="sm:text-end text-gray-800 dark:text-gray-200">N/A</p>
                    </div>
                  </div>

                  <div class="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>
                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                      <p class="font-medium text-gray-800 dark:text-gray-200">Surfboard</p>
                    </div>
                    <div>
                      <p class="sm:text-end text-gray-800 dark:text-gray-200">N/A</p>
                    </div>
                  </div>

                  <div class="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>
                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                      <p class="font-medium text-gray-800 dark:text-gray-200">Baggages</p>
                    </div>
                    <div>
                      <p class="sm:text-end text-gray-800 dark:text-gray-200">N/A</p>
                    </div>
                  </div>

                  <div class="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>
                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                      <p class="font-medium text-gray-800 dark:text-gray-200">Vehicle Type</p>
                    </div>
                    <div>
                      <p class="sm:text-end text-gray-800 dark:text-gray-200">N/A</p>
                    </div>
                  </div>

                  <div class="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>
                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                      <p class="font-medium text-gray-800 dark:text-gray-200">Pickup Location</p>
                    </div>
                    <div>
                      <p class="sm:text-end text-gray-800 dark:text-gray-200">N/A</p>
                    </div>
                  </div>

                  <div class="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>
                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                      <p class="font-medium text-gray-800 dark:text-gray-200">Drop Location</p>
                    </div>
                    <div>
                      <p class="sm:text-end text-gray-800 dark:text-gray-200">N/A</p>
                    </div>
                  </div>

                  <div class="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>
                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                      <p class="font-medium text-gray-800 dark:text-gray-200">Distance</p>
                    </div>
                    <div>
                      <p class="sm:text-end text-gray-800 dark:text-gray-200">N/A</p>
                    </div>
                  </div>

                  <div class="sm:hidden border-b border-gray-200 dark:border-gray-700"></div>

                  <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    <div class="col-span-full sm:col-span-2">
                      <p class="font-medium text-gray-800 dark:text-gray-200">Transport Time</p>
                    </div>
                    <div>
                      <p class="sm:text-end text-gray-800 dark:text-gray-200">N/A</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- End Table -->

              <div class="mt-8 sm:mt-12">
                <h4 class="text-lg font-semibold text-gray-800 dark:text-gray-200">Thank you!</h4>
                <p class="text-gray-500">If you have any questions concerning this invoice, use the following
                  contact information:</p>
                <div class="mt-2">
                  <p class="block text-sm font-medium text-gray-800 dark:text-gray-200">www.machantaxi.com</p>
                  <p class="block text-sm font-medium text-gray-800 dark:text-gray-200">+94 717 800 600</p>
                </div>
              </div>

              <p class="mt-5 text-sm text-gray-500">© 2024 machanTaxi.</p>
            </div>
            <!-- End Card -->

          </div>
        </div>
        <!-- End Invoice -->
      </body>

      <div class="modal-action mt-4 flex justify-end">
        <form method="dialog">
          <button class="btn">Save</button>
        </form>
      </div>
    </div>
  </dialog>
  <!-- Print Modal End -->
</template>
