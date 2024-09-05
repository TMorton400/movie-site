// Base URL and API options
const apiKey = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjY0NGFhMTgwNzcwZjRmN2NlYWIzMjIwZTBjNzk1ZCIsIm5iZiI6MTcyNTM5MTk2OC44NDY5NzgsInN1YiI6IjY2YjIwNWJmZDQ2MDc2OWEzNDNhNTE2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z1I9f-H5qRf2MqztJdk5sRNytnlWWphts4wqXW9a9UQ';
const searchContainer = document.getElementById('card-display');
const actor = document.getElementById('actorSearch');

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


  searchContainer.innerHTML = '';

  actors.forEach(actor => {
    const actorCard = document.createElement('div');
    const actorImage = document.createElement('img');

    actorImage.src = actor.profile_path ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}` : 'https://via.placeholder.com/200';
    actorImage.classList.add('actor-image');

    actorCard.appendChild(actorImage);
    searchContainer.appendChild(actorCard);
  });
}

async function actorSearch(inputValue) {
  try {
    const response  = await fetch(`https://api.themoviedb.org/3/search/person?query=${inputValue}&include_adult=false&language=en-US&page=1`, actorOptions);
    const result = await response.json();
    firstFiveChoices = result.results.slice(0, 5);
    console.log(firstFiveChoices);
    displayActors(firstFiveChoices);
  } catch(error) {
    console.error(error);
  }
}

const findActors = () => {
  const actorValue = actor.value;
  console.log(actorValue);

  if(actorValue){
    actorSearch(actorValue);
    actor.value = '';
  }
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