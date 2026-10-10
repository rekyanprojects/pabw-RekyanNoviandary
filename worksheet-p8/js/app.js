const profil = {
  nama: "Rekyan Noviandary Widyaningsih",
  nim: "25523050",
  peran: "Mahasiswa Informatika yang belajar front-end",
  keahlian: ["HTML", "CSS", "JavaScript"],
};

const judulHalaman = "Movies";
const tahun = 2026;
const jumlahFilm = 3;
let pilihanAktif = "semua";

const kalimat = `Nama saya ${profil.nama}, dan saya belajar ${profil.keahlian.length} hal.`;
console.log(kalimat);

const kota = profil.alamat?.kota ?? "Belum diisi";
console.log(kota);
console.log(typeof profil.nama, typeof jumlahFilm);

document.title = judulHalaman;
document.querySelector("#judul-halaman").textContent = judulHalaman;
document.querySelector("#identitas").textContent =
  `${profil.nama} · ${profil.nim} · ${tahun}`;

  