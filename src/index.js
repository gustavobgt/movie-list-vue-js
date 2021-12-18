const API_KEY = 'api_key=45f31e9ac804875663bd3354d9c20d50';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

var app = new Vue({
  el: '#app',
  data: {
    currentRoute: '/home',
    isLoading: true,
    moviesList: [],
  },
  methods: {
    switchPage: function (pageName) {
      this.currentRoute = pageName;
    },
    getMoviesList: async function () {
      const response = await fetch(API_URL);
      const json = await response.json();

      this.moviesList = json.results;
      this.isLoading = false;
    },
    saveMovieAsFavorite: function (movieTitle) {
      let currentFavoriteMoviesList = JSON.parse(
        localStorage.getItem('favoriteMoviesList')
      );
      if (!currentFavoriteMoviesList) {
        currentFavoriteMoviesList = [];
      }

      if (currentFavoriteMoviesList.includes(movieTitle)) {
        alert(`Este filme já está na sua lista de favoritos!`);
        return;
      }

      currentFavoriteMoviesList.push(movieTitle);

      localStorage.setItem(
        'favoriteMoviesList',
        JSON.stringify(currentFavoriteMoviesList)
      );
      alert(`Você salvou o filme ${movieTitle} como favorito!`);
    },
  },
  mounted: async function () {
    await this.getMoviesList();
  },
});
