<script setup>
import axios from "axios";
import { ref } from "vue";
import Spinner from "./spinner.vue";
import MovieModal from "./movieModal.vue";
let loading = ref(false);
let data = ref({});
let loaded = ref(false);

const fetchMovies = () => {
  axios
    .get("https://ssfilmyapi.azurewebsites.net/api/SSmojeFilmy", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        accept: "text/plain",
      },
    })
    .then((res) => (data.value = res.data))
    .then((res) => console.log(res))
    .then(() => setTimeout(() => (loading.value = false), 100));
};

const fetchSSmovies = () => {
  axios
    .get("https://filmy.programdemo.pl/MyMovies")
    .then((res) => console.log(res));
};

async function assignData() {
  loaded.value = true;
  loading.value = true;
  fetchMovies();
}
</script>

<template>
  <button class="p-2" @click="fetchSSmovies()">asdasd</button>
  <div class="mx-6">
    <div class="flex flex-row align-center gap-4 mb-4">
      <MovieModal @refresh="assignData()" actionMode="insert" />
      <button
        @click="assignData()"
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
    </div>
    <div class="flex flex-col mb-12">
      <div
        class="flex flex-col justify-center items-center align-middle"
        v-if="loading"
      >
        <h1 class="mb-2">Fetching the movies</h1>
        <Spinner />
      </div>
      <div v-else class="overflow-y-scroll mx-2 sm:-mx-6 lg:-mx-8">
        <div v-if="loaded" class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
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
                    <MovieModal
                      @refresh="assignData()"
                      :id-movie="datas.id"
                      actionMode="update"
                    />
                  </td>
                  <td
                    class="px-0 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    <MovieModal
                      @refresh="assignData()"
                      :id-movie="datas.id"
                      actionMode="delete"
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
    </div>
  </div>
</template>
