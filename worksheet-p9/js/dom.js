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
  movieList.textContent = "";

  if (list.length === 0) {
    emptyMessage.hidden = false;
    return;
  }
  emptyMessage.hidden = true;

  const fragment = document.createDocumentFragment();
  list.forEach((movie) => fragment.append(buildRow(movie)));  // 3. isi lagi
  movieList.append(fragment);
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

const form = document.querySelector("#movie-form");
const titleInput = document.querySelector("#movie-title");
const yearInput = document.querySelector("#movie-year");
const genreSelect = document.querySelector("#movie-genre");
const ratingInput = document.querySelector("#movie-rating");
const saveButton = form.querySelector("button[type='submit']");

const rules = [
  {
    field: titleInput,
    check: (v) => v !== "",
    message: "Enter the movie title.",
  },
  {
    field: yearInput,
    check: (v) => v !== "" && Number.isInteger(Number(v)) && Number(v) >= 1900 && Number(v) <= 2026,
    message: "Enter a year from 1900 to 2026.",
  },
  {
    field: genreSelect,
    check: (v) => v !== "",
    message: "Choose a genre from the list.",
  },
  {
    field: ratingInput,
    check: (v) => v !== "" && Number.isInteger(Number(v)) && Number(v) >= 1 && Number(v) <= 10,
    message: "Enter a whole number from 1 to 10.",
  },
];

function validateField(rule) {
  const error = document.querySelector(`#${rule.field.id}-error`);
  const valid = rule.check(rule.field.value.trim());
  error.textContent = valid ? "" : rule.message;
  if (valid) {
    rule.field.removeAttribute("aria-invalid");
  } else {
    rule.field.setAttribute("aria-invalid", "true");
  }
  return valid;
}

function allValid() {
  return rules.every((rule) => rule.check(rule.field.value.trim()));
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const results = rules.map(validateField);
  const valid = results.every(Boolean);
  saveButton.disabled = !valid;

  if (!valid) {
    rules.find((rule) => !rule.check(rule.field.value.trim())).field.focus();
    return;
  }

  movies.push({
    title: titleInput.value.trim(),
    year: Number(yearInput.value),
    genre: genreSelect.selectedOptions[0].textContent,
    rating: Number(ratingInput.value),
  });
  form.reset();
  saveButton.disabled = false;
  renderMovies(movies);
  markActiveButton(document.querySelector('#filter-row [data-genre="all"]'));
});

form.addEventListener("input", (event) => {
  const rule = rules.find((r) => r.field === event.target);
  if (!rule) return;
  validateField(rule);
  saveButton.disabled = !allValid();
});