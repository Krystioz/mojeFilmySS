<script setup>
import { ref } from "vue";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import {
  required,
  minLength,
  maxLength,
  integer,
  between,
} from "@vuelidate/validators";
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
import Spinner from "./spinner.vue";
import ErrorModal from "./errorModal.vue";

const props = defineProps({
  idMovie: Number,
});
const emit = defineEmits(["insertEmit"]);
const open = ref(false);
const loaded = ref(false);
const openErr = ref(false);
const errMessage = ref({});
const status = ref("none");

const movieData = ref({
  title: "",
  director: "",
  year: 0,
  rate: 0,
});

const movieDataBase = {
  title: "",
  director: "",
  year: 0,
  rate: 0,
};

const validateRules = {
  title: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(200),
  },
  director: { minLength: minLength(3), maxLength: maxLength(20) },
  year: {
    minLength: minLength(3),
    maxLength: maxLength(4),
    integer,
    between: between(1900, 2200),
  },
  rate: {
    minLength: minLength(1),
    maxLength: maxLength(2),
    integer,
    between: between(1, 10),
  },
};

const v$ = useVuelidate(validateRules, movieData);

function emmitingInsert() {
  emit("insertEmit", movieData.value);
}

function insertConfirm() {
  if (!loaded.value) {
    alert("movies not loaded yet!");
    return;
  }
  emmitingInsert();
  open.value = false;
}

function insertMode() {
  loaded.value = true;
  open.value = true;
}

const submitMovie = async () => {
  const result = await v$.value.$validate();
  if (result) {
    insertConfirm();
  } else {
    openErr.value = true;
    errMessage.value = v$.value.$errors;
  }
};

function setErrOpen() {
  openErr.value = false;
}
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
                <div
                  v-if="loaded"
                  class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                >
                  <h1 class="text-center">Add movie</h1>

                  <form @submit.prevent="submitMovie" action="">
                    <div class="mb-6">
                      <label
                        for="base-input"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Title</label
                      >
                      <input
                        v-model="movieData.title"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div class="mb-6">
                      <label
                        for="base-input"
                        class="block mb-2 text-sm font-medium text-gray-900"
                        >Director</label
                      >
                      <input
                        v-model="movieData.director"
                        type="text"
                        id="base-input"
                        class="bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                    </div>
                    <div class="flex flex-row gap-4 justify-between">
                      <div class="mb-6">
                        <label
                          for="base-input"
                          class="block mb-2 text-sm font-medium text-black-900"
                          >Year of production</label
                        >
                        <input
                          type="text"
                          v-model="movieData.year"
                          id="base-input"
                          class="bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                      <div class="mb-6">
                        <label
                          for="base-input"
                          class="block mb-2 text-sm font-medium text-gray-900"
                          >Rating</label
                        >
                        <input
                          type="text"
                          id="base-input"
                          v-model="movieData.rate"
                          class="bg-gray-50 border border-gray-300 text-black-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div
                      class="px-4 py-3 sm:flex mt-auto sm:flex-row-reverse sm:px-6"
                    >
                      <ErrorModal
                        :errMessages="errMessage"
                        @closeModal="setErrOpen()"
                        :open="openErr"
                        :mode="'validation'"
                      />

                      <button
                        type="submit"
                        class="inline-block ml-6 px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                      >
                        Insert
                      </button>
                      <button
                        type="button"
                        class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        @click="
                          () => {
                            open = false;
                            load = false;
                          }
                        "
                        ref="cancelButtonRef"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>

                <div
                  class="bg-white flex flex-col items-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
                  v-if="loaded == false"
                >
                  <h2 class="mb-2">Loading movie data..</h2>
                  <Spinner />
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <div>
      <button
        @click="insertMode()"
        class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 hover:border-blue-500 rounded"
      >
        Add new
      </button>
    </div>
  </div>
</template>
