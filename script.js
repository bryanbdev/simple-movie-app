const movieCardTemplate = document.querySelector("[data-movie-template]");
const movieCardContainer = document.querySelector(
  "[data-movie-cards-container]"
);
const searchInput = document.querySelector("[data-search]");

// .then(response => response.json())
// .then(data => console.log(data))
// .catch(err => console.log(err));

const movieData = "./movies.json";

// store object data in empty array
let movies = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  movies.forEach((movie) => {
    // if string includes set value to true
    const isVisible = movie.title.toLowerCase().includes(value); // returns boolean (true/false)

    // toggle the "hide" classname for the element
    // if value true add "hide" classname else remove "hide" classname
    movie.element.classList.toggle("hide", !isVisible);
  });
});

// get data from JSON file
async function getMovies(fileJSON) {
  try {
    const response = await fetch(fileJSON); //fetch the api JSON file
    const data = await response.json(); // convert data to JSON to we can read it

    // loops through each object in the movies.js file array
    movies = data.map((movie) => {
      //clones all the content inside the template tag
      const card = movieCardTemplate.content.cloneNode(true).children[0];
      // console.log(card);

      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");

      // insert the data into html elements
      header.textContent = movie.title;
      body.textContent = `Rating: ${movie.rating}`;

      // attach elements to appropriate elements in DOM so they show client-side
      movieCardContainer.append(card);

      return {
        title: movie.title,
        rating: movie.rating,
        element: card,
      };
    });

    // console.log(data);
  } catch (error) {
    console.log(`Error Message: ${error}`);
  }
}

getMovies(movieData); //evoke function get moviesAPI data
