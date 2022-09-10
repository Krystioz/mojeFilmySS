<template>
  <header>
    <nav
      class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between"
    >
      <div class="px-6 w-full flex flex-wrap items-center justify-between">
        <div class="flex items-center">
          <button
            class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContentY"
            aria-controls="navbarSupportedContentY"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              class="w-5"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="navbar-collapse collapse grow items-center"
          id="navbarSupportedContentY"
        >
          <ul class="navbar-nav mr-auto lg:flex lg:flex-row">
            <li class="nav-item">
              <a
                class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                href="/"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                >Home</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                href="https://github.com/Krystioz?tab=repositories"
                target="_blank"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                >Github</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                href="https://github.com/Krystioz?tab=repositories"
                target="_blank"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                >Frontend</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                href="https://github.com/Krystioz?tab=repositories"
                target="_blank"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                >Backend</a
              >
            </li>

            <li class="nav-item mb-2 lg:mb-0">
              <a
                class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                href="https://ssfilmyapi.azurewebsites.net/swagger/index.html"
                target="_blank"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                >Api</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div
      class="text-center bg-cover bg-bottom bg-[url('src/assets/movie-theater.jpg')] bg-gray-50 text-white py-20 px-6 mb-12"
    >
      <h1 class="text-5xl font-bold mt-0 mb-6">Movies database</h1>
      <h3 class="text-3xl font-bold mb-8">Feel free to look around</h3>
    </div>
  </header>
</template>