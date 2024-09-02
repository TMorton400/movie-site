// Base URL and API options
const apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDZlZjdiODMxYjkyYjAwYWY3ZWIyNGEzNWRlZWEyNCIsIm5iZiI6MTcyNDY4MDkyMC4xMTY0ODgsInN1YiI6IjY2YjIwNWJmZDQ2MDc2OWEzNDNhNTE2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xL8VAl_bFNdwTqteT3GqlLPoFuSxil--K6xPLHL8qaI';
const searchContainer = document.getElementById('card-display');

const actorOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: apiKey,
  }
};

// Function to fetch popular actors
async function popularActor() {
  try {
    const response = await fetch('https://api.themoviedb.org/3/person/popular?language=en-US&page=1', actorOptions);
    const result = await response.json();
    const firstFiveActors = result.results.slice(0, 5);
    console.log(firstFiveActors);
    displayActors(firstFiveActors);
  } catch (error) {
    console.error(error);
  }
}

// Function to display popular actors
const displayActors = (actors) => {
  if (!searchContainer) return; // Check if container exists

  actors.forEach(actor => {
    const actorCard = document.createElement('div');
    const actorImage = document.createElement('img');

    actorImage.src = actor.profile_path ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}` : 'https://via.placeholder.com/200';
    actorImage.classList.add('actor-image');

    actorCard.appendChild(actorImage);
    searchContainer.appendChild(actorCard);
  });
}


const popMenu= () => {
  let x = document.getElementById("list");
  let y =document.getElementById("navBar");
  if(x.style.display === "none"){
    x.style.display = "flex";
    y.style.height = "300px";
  }
  else{
    x.style.display = "none";
    y.style.height = "165px";
  }
}

popularActor();