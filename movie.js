let searchContainer = document.getElementById('card-display');

url = 'https://api.themoviedb.org/3/movie/popular'
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDZlZjdiODMxYjkyYjAwYWY3ZWIyNGEzNWRlZWEyNCIsIm5iZiI6MTcyNDY4MDkyMC4xMTY0ODgsInN1YiI6IjY2YjIwNWJmZDQ2MDc2OWEzNDNhNTE2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xL8VAl_bFNdwTqteT3GqlLPoFuSxil--K6xPLHL8qaI'
    }
  };

//Finding popular movies for display
async function popularMovie(){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.results);
        const firstFive = result.results.slice(0,5);
        console.log(firstFive);
        getMovieCard(firstFive);
    } catch (error) {
        console.error(error);
    }
}

//displaying movie in cards
const getMovieCard = (data) => {
    data.forEach(name => {
        const movieCard = document.createElement('div');
        const titleCard = document.createElement('h2'); 
        const movieImage = document.createElement('img');

        movieImage.src = name.poster_path ? `https://image.tmdb.org/t/p/w200/${name.poster_path}` : 'https://via.placeholder.com/200';
        movieImage.classList.add('movie-image');

        movieCard.appendChild(titleCard)
        movieCard.appendChild(movieImage);
        searchContainer.appendChild(movieCard);
    })
}


popularMovie();




