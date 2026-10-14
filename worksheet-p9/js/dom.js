import { listOfMovie as movies } from "./app.js";

const movieList = document.querySelector("#table-contents");
const emptyMessage = document.querySelector("#empty-message");

function buildRow(movie) {
  const tr = document.createElement("tr");
  tr.className = "movie-row";

  [movie.title, movie.year, movie.genre, movie.rating].forEach((value) => {
    const td = document.createElement("td");
    td.textContent = value; 
    tr.append(td);
  });

  return tr;
}

function renderMovies(list) {
  movieList.textContent = "";                 // B.2
  const fragment = document.createDocumentFragment();
  list.forEach((movie) => fragment.append(buildRow(movie)));
  movieList.append(fragment);
  emptyMessage.hidden = list.length > 0;
}

renderMovies(movies);

const filterRow = document.querySelector("#filter-row");

function markActiveButton(activeButton) {
  document.querySelectorAll("#filter-row button").forEach((button) => {
    button.classList.toggle("active", button === activeButton);
  });
}

filterRow.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const genre = button.dataset.genre;
  const selected = movies.filter(
    (movie) => genre === "all" || movie.genre.toLowerCase() === genre
  );

  renderMovies(selected);
  markActiveButton(button);
});

markActiveButton(document.querySelector('#filter-row [data-genre="all"]'));