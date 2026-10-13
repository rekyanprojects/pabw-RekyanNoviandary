const profil = {
  nama: "Rekyan Noviandary Widyaningsih",
  nim: "25523050",
  peran: "Mahasiswa Informatika yang belajar front-end",
  keahlian: ["HTML", "CSS", "JavaScript"],
};

const pageTitle = "Movies";
const year = 2026;
const numberOfMovies = 3;
let pilihanAktif = "semua";

const sentence = `Nama saya ${profil.nama}, dan saya belajar ${profil.keahlian.length} hal.`;
console.log(sentence);

const city = profil.alamat?.kota ?? "Belum diisi";
console.log(city);
console.log(typeof profil.nama, typeof numberOfMovies);

document.title = pageTitle;
document.querySelector("#page-title").textContent = pageTitle;
document.querySelector("#identity").textContent =
  `${profil.nama} · ${profil.nim} · ${year}`;

const buatPerkenalan = ({ nama, peran }) => `${nama} — ${peran}`;
const formatKeahlian = (daftar) => daftar.join(" · ");

console.log(buatPerkenalan(profil));
console.log(buatPerkenalan({ nama: "Rekyan", peran: "Mahasiswa" }));
console.log(formatKeahlian(profil.keahlian));
console.log(formatKeahlian(["Action", "Comedy"]));

const listOfMovie = [
  { title: "Exit", year: 2019, genre: "Comedy", rating: 9 },
  { title: "Midnight Runner", year: 2017, genre: "Comedy", rating: 9 },
  { title: "The Shadow's Edge", year: 2025, genre: "Action", rating: 9 },
];

console.table(profil.keahlian);
console.table(listOfMovie);

const comedy = listOfMovie.filter((film) => film.genre === "Comedy");
console.table(comedy);

const exit = listOfMovie.find((film) => film.title === "Exit");
console.log(exit);

const justTheTitle = listOfMovie.map((film) => film.title);
console.log(justTheTitle.length === listOfMovie.length);

const terurut = [...listOfMovie].sort((a, b) => a.year - b.year);
console.log(terurut[0].title, listOfMovie[0].title); // data asli tidak berubah

document.querySelector("#table-contents").innerHTML = listOfMovie
  .map((film) => `
    <tr>
      <th scope="row">${film.title}</th>
      <td>${film.year}</td>
      <td>${film.genre}</td>
      <td>${film.rating}/10</td>
    </tr>`)
  .join("");