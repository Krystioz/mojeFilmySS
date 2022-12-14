<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import Spinner from "./spinner.vue";
import DeleteModal from "./deletingModal.vue";
import EditModalVue from "./editModal.vue";
import insertModalVue from "./insertModal.vue";
import errorModalVue from "./errorModal.vue";
import ErrorModal from "./errorModal.vue";
const loading = ref(false);
const data = ref({});
const loaded = ref(false);
const errMessage = ref({});
const openErr = ref(false);

function displayReqErr(err) {
  errMessage.value = err;
  openErr.value = true;
  loading.value = false;
  console.log(err);
}

const fetchMovies = () => {
  axios
    .get("https://ssfilmyapi.azurewebsites.net/api/SSmojeFilmy", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        accept: "text/plain",
      },
    })
    .then((res) => (data.value = res.data))
    .then(() => (loading.value = false))
    .catch((err) => displayReqErr(err));
};

const fetchAddSSmovies = () => {
  loading.value = true;
  axios
    .get("/api/MyMovies", {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => res.data)
    .then((res) => returnNewMovies(res))
    .then((res) => postNewMovies(res))
    .catch((err) => displayReqErr(err));
};

function assignData(e) {
  loaded.value = true;
  loading.value = true;
  fetchMovies();
}

function setErrOpen() {
  openErr.value = false;
}

function returnNewMovies(res) {
  const result = res
    .map((el1) => ({
      title: el1.title,
      director: el1.director,
      year: el1.year,
      rate: el1.rate,
      match: data.value.some((el2) => el2.title === el1.title),
    }))
    .filter(function (obj) {
      return obj.match != true;
    });
  return result;
}

const postNewMovies = async (data) => {
  const responses = [];
  const errs = [];

  for (let i = 0; i < data.length; i++) {
    responses.push(
      await axios
        .post(
          "https://ssfilmyapi.azurewebsites.net/api/SSmojeFilmy",
          {
            title: data[i].title,
            director: data[i].director,
            year: data[i].year,
            rate: data[i].rate,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              accept: "text/plain",
            },
          }
        )
        .then((res) => res)
        .catch((err) => displayReqErr(err))
    );
  }
  console.log(responses.map((e) => e.statusText));
  assignData();
};

//NEW METHODS ON DATABASE REFACTOR

const deleteMovie = (id) => {
  loading.value = true;
  axios
    .delete(`https://ssfilmyapi.azurewebsites.net/api/SSmojeFilmy/${id}`)
    .then(() => fetchMovies())
    .catch((err) => displayReqErr(err));
};

const updateMovie = (data) => {
  loading.value = true;
  axios
    .put(`https://ssfilmyapi.azurewebsites.net/api/SSmojeFilmy/${data.id}`, {
      id: data.id,
      Title: data.title,
      director: data.director,
      year: data.year,
      rate: data.rate,
    })
    .then(() => fetchMovies())
    .catch((err) => displayReqErr(err));
};

const insertMovie = (data) => {
  loading.value = true;
  axios
    .post(`https://ssfilmyapi.azurewebsites.net/api/SSmojeFilmy`, {
      Title: data.title,
      director: data.director,
      year: data.year,
      rate: data.rate,
    })
    .then(() => fetchMovies())
    .catch((err) => displayReqErr(err));
};

onMounted(() => assignData());
</script>

<template>
  <ErrorModal
    :errMessages="errMessage"
    @closeModal="setErrOpen()"
    :open="openErr"
    :mode="'api'"
  />
  <div class="mx-6">
    <div class="flex flex-row align-center gap-4 mb-4">
      <insertModalVue
        @insertEmit="(data) => insertMovie(data)"
        actionMode="insert"
      />
      <button
        @click="fetchAddSSmovies()"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <svg
          class="fill-current w-4 h-4 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
        </svg>
        <span>Load movies</span>
      </button>
      <button
        @click="assignData()"
        class="bg-yellow-300 hover:bg-yellow-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <span>Refresh</span>
      </button>
    </div>
    <div class="flex flex-col mb-12">
      <div
        class="flex flex-col justify-center items-center align-middle"
        v-if="loading"
      >
        <h1 class="mb-2">Fetching the movies</h1>
        <Spinner />
      </div>
      <TransitionRoot
      :show="!loading"
      enter="transition-opacity duration-500"
      enter-from="opacity-0"
      enter-to="opacity-100"
    >
        <div  class="overflow-y-scroll h-96 mx-2 sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full table-auto">
                <thead class="bg-white border-b">
                  <tr class="bg bg-red-400">
                    <th
                      scope="col"
                      class="text-sm font-bold text-gray-900 px-3 py-4 text-left"
                    >
                      #id
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-0 py-4 text-left"
                    ></th>
                    <th
                      scope="col"
                      class="text-sm font-medium text-gray-900 px-0 py-4 text-left"
                    ></th>
                    <th
                      scope="col"
                      class="text-md font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      title
                    </th>
                    <th
                      scope="col"
                      class="text-md font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      director
                    </th>
                    <th
                      scope="col"
                      class="text-md font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      year
                    </th>
                    <th
                      scope="col"
                      class="text-md font-bold text-gray-900 px-6 py-4 text-left"
                    >
                      rate
                    </th>
                  </tr>
                </thead>
                <tbody v-for="(datas, index) in data" :key="index">
                  <tr class="bg-gray-100 border-b">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      {{ index + 1 }}
                    </td>
                    <td
                      class="px-0 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      <EditModalVue
                        @updateEmit="(data) => updateMovie(data)"
                        :id-movie="datas.id"
                      />
                    </td>
                    <td
                      class="px-0 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      <DeleteModal
                        @delete="(id) => deleteMovie(id)"
                        :id-movie="datas.id"
                      />
                    </td>

                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    >
                      {{ datas.title }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    >
                      {{ datas.director }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    >
                      {{ datas.year }}
                    </td>
                    <td
                      class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                    >
                      {{ datas.rate }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </TransitionRoot>
    </div>
  </div>
</template>