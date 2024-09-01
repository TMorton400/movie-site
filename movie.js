// Base URL and API options
const apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDZlZjdiODMxYjkyYjAwYWY3ZWIyNGEzNWRlZWEyNCIsIm5iZiI6MTcyNDY4MDkyMC4xMTY0ODgsInN1YiI6IjY2YjIwNWJmZDQ2MDc2OWEzNDNhNTE2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xL8VAl_bFNdwTqteT3GqlLPoFuSxil--K6xPLHL8qaI';
const searchContainer = document.getElementById('card-display');

const movieOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: apiKey,
  }
};


// Fetch popular movies
async function popularMovie() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular', movieOptions);
    const result = await response.json();
    console.log(result.results);
    const firstFive = result.results.slice(0, 5);
    console.log(firstFive);
    displayMovies(firstFive);
  } catch (error) {
    console.error(error);
  }
}

// Display popular movies
const displayMovies = (movies) => {
  if (!searchContainer) return; // Check if container exists

  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    const movieImage = document.createElement('img');

    movieImage.src = movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : 'https://via.placeholder.com/200';
    movieImage.classList.add('movie-image');

    movieCard.appendChild(movieImage);
    searchContainer.appendChild(movieCard);
  });
}

popularMovie();