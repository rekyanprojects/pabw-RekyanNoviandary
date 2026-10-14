import { movies } from "./app.js";

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