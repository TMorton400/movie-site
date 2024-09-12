// Base URL and API options
const apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjY0NGFhMTgwNzcwZjRmN2NlYWIzMjIwZTBjNzk1ZCIsIm5iZiI6MTcyNTM5MTk2OC44NDY5NzgsInN1YiI6IjY2YjIwNWJmZDQ2MDc2OWEzNDNhNTE2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z1I9f-H5qRf2MqztJdk5sRNytnlWWphts4wqXW9a9UQ';
const searchContainer = document.getElementById('card-display');
const movie = document.getElementById('movieInput');
const cardContainer = document.getElementById('cardContainer');

const movieOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: apiKey,
  }
};


// Fetch popular movies using async function and displays first 5 most popular movies in image containers
async function popularMovie() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', movieOptions);
    const result = await response.json();
    console.log(result.results);
    const firstFive = result.results.slice(0, 5);
    console.log(firstFive);
    displayMovies(firstFive);
  } catch (error) {
    console.error(error);
  }
}

// Display movie posters into containers used in both the popularMovie function and movieSearch function
const displayMovies = (movies) => {
  if (!searchContainer) return; // Check if container exists

  searchContainer.innerHTML = '';
  movies.forEach(movie => {

    if(!movie.poster_path) return;
    //Create flip card outer div
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip-card');
    flipCard.addEventListener('click',() => displayCard(movie.title, movie.poster_path, movie.overview, movie.release_date));


    //Create inner flip card
    const flipCardInner = document.createElement('div');
    flipCardInner.classList.add('flip-card-inner');

    const flipCardFront = document.createElement('div');
    flipCardFront.classList.add('flip-card-front');

    const imageCard = document.createElement('img');
    imageCard.classList.add('flip-card-image');
    imageCard.src = movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : 'https://via.placeholder.com/200';

    const flipCardBack = document.createElement('div');
    flipCardBack.classList.add('flip-card-back');

    const movieName = document.createElement('h1');
    movieName.innerHTML = movie.title;
    movieName.classList.add('movie-name');

    const movieDescription = document.createElement('p');
    movieDescription.innerHTML = movie.overview;
    movieDescription.classList.add('movie-description');

    const movieYear = document.createElement('p');
    movieYear.innerHTML = `Release date: ${movie['release_date']}`;
    movieYear.classList.add('movie-year');


    //add actor name too back of card
    flipCardBack.appendChild(movieName);
    flipCardBack.appendChild(movieDescription);
    flipCardBack.appendChild(movieYear);


    flipCardFront.appendChild(imageCard);
    //add front and back to inner card

    flipCardInner.appendChild(flipCardFront);
    flipCardInner.appendChild(flipCardBack);

    //add flipcardinner to flipcard
    flipCard.appendChild(flipCardInner);

    //adding flipcard to card-container
    searchContainer.appendChild(flipCard);
  });
}


//Takes user input and displays it to the movie poster
async function movieSearch(inputValue) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false&language=en-US&page=1`, movieOptions);
    const result = await response.json();
    firstFiveChoices = result.results.slice(0, 5);
    console.log(firstFiveChoices);
    displayMovies(firstFiveChoices);
  } catch (error) {
    console.error(error);
  }
}

//Click event function which when called if there is a movieValue passes the value as an argument and resets the search box
const findMovie = () => {
  const movieValue = movie.value;
  console.log(movieValue);
  if(movieValue){
    movieSearch(movieValue);
    movie.value = '';

  }
}


const displayCard = (movieTitle, moviePoster, description, movieYear) => {
  const card = document.getElementById('card-display');
  const inputContainer = document.getElementById('inputContainer');
  const name = document.getElementById('movieName');
  const container = document.getElementById('searchContainer');
  const body = document.body;

  name.innerHTML = movieTitle;
  console.log(movieTitle);

  inputContainer.remove();
  card.remove();

 /*  const imageContainer = document.createElement('div'); */

  const movieImage= document.createElement('img');
  movieImage.src = `https://image.tmdb.org/t/p/w200/${moviePoster}`;
  movieImage.classList.add('movie-image');

  container.appendChild(movieImage);
  container.style.height = 'auto';
  container.style.flexDirection = 'column';

  const movieDetails = document.createElement('p');
  movieDetails.innerHTML = description;

  const releaseDate = document.createElement('p');
  releaseDate.innerHTML = movieYear;

  container.appendChild(movieDetails);
  container.appendChild(releaseDate);
  container.appendChild(inputContainer);

}

popularMovie();