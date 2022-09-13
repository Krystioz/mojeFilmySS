<script setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";
import { ref } from "vue";
const open = ref(false);
const loaded = ref(false);
const props = defineProps({
  idMovie: Number,
});
const emit = defineEmits(["delete"]);

function deleteEmit() {
  emit("delete", props.idMovie);
}

function deleteMode() {
  loaded.value = true;
  open.value = true;
}

// function confirmDelete() {
//   if (!loaded.value) {
//     return;
//   }
//   deleteMovie(props.idMovie);
//   open.value = false;
// }
</script>

<template>
  <div>
    <TransitionRoot as="template" :show="open">
      <Dialog as="div" class="relative z-10" @close="open = false">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div
            class="flex min-h-full flex-col items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative flex flex-col transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
              >
                <div class="flex flex-col items-center justify-between my-auto">
                  <ExclamationTriangleIcon class="h-12 mt-12" />
                  <h2 class="text-lg my-12">
                    Are you sure want to delete the movie ?
                  </h2>
                  <div class="flex flex-row gap-12 mb-12">
                    <button
                      @click="open = false"
                      type="button"
                      class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Cancel
                    </button>
                    <button
                      @click="deleteEmit()"
                      type="button"
                      class="inline-block px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <div>
      <button
        @click="deleteMode()"
        type="button"
        class="inline-block px-4 py-1 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Delete
      </button>
    </div>
  </div>
</template>
