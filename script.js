// ==== script.js (perbaikan) ====

/* Efek ngetik */
const text = "Terimakasih udah mau sabar menghadapi aku, dengan sepenuh hati💖";
let i = 0;
function typing() {
  if (i < text.length) {
    document.getElementById("typing-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 70);
  }
}
typing();

/* Pilihan tempat date dengan jawaban bervariasi */
function pilihDate() {
  const dateOption = document.getElementById("dateOption").value;

  const respon = {
    "dinner romantis": [
      "Seruu, banget makan sama kamu sembari di liatin mbok mijah😍",
      "Hemmm kira kira kita makan malam apa ya, Kamu lagi mood makan apa? 😚",
      "Duh aku dah kenyang, ngeliat kamu yang duduk manis di depan ku 😳",
      "Dinnermu favorit, tapi kamu tetap menu utama di hatiku 🍽️💖"
    ],
    "minum matcha bareng": [
      "Matcha tuh rasanya pait, tapi kalo minum bareng kamu rasanya jadi manis 💚",
      "Yuk boleh, aku juga sembari mau cerita keseharian aku ke kamu.. ☕💞",
      "Minum matcha bareng kamu tuh kaya rasa tenang yang aku cari 🍵",
      "Kalo matcha-nya dingin, semoga kamu tetap hangat di sisiku 😚"
    ],
    "jalan sore": [
      "Bolehh banget, kita jalan sore di taman biar kita bisa sehat. 🥰",
      "Menarik melihat senja sama kamuu 🌇💞",
      "Walapun capek jalan kaki, yang penting jalannya bareng kamu 💕",
      "Bolehh, nanti kalo cape bilang aja ya, nanti tak gendong 😍"
    ]
  };

  const list = respon[dateOption] || ["Yuk kita cari tempat seru bareng!"];
  const randomRespon = list[Math.floor(Math.random() * list.length)];

  // Tampilkan hasil di elemen responDate dengan efek ngetik ringan
  const output = document.getElementById("responDate");
  if (!output) {
    // fallback ke alert kalau elemen tidak ditemukan
    alert(randomRespon);
    return;
  }

  output.innerText = "";
  let j = 0;
  const typer = setInterval(() => {
    if (j < randomRespon.length) {
      output.innerText += randomRespon.charAt(j);
      j++;
    } else {
      clearInterval(typer);
    }
  }, 30);
}

/* Tebak-tebakan dengan jawaban (jawab = array kemungkinan jawaban, semua lowercased) */
const tebakList = [
  { tanya: "Apa warna favoritku? 💜", jawab: ["hitam"] },
  { tanya: "Apa makanan favoritku? 🍜", jawab: ["nasi goreng babat", "nasi goreng"] },
  { tanya: "Siapa pacar ku? 😚", jawab: ["gavi","gaviano","nito gaviano"] },
  { tanya: "Apa club bola favorit ku 😆", jawab: ["manchester united", "man united", "man utd", "mu"] },
  { tanya: "Apa lagu yang kita denger bareng 😊", jawab: ["terbuang dalam waktu", "terbuang dlm waktu"] }
];

let currentQuestion = null;

/* Tampilkan soal random */
function tanya() {
  const random = Math.floor(Math.random() * tebakList.length);
  currentQuestion = tebakList[random];
  document.getElementById("tebak").innerText = currentQuestion.tanya;
  document.getElementById("hasilJawaban").innerText = "";
  document.getElementById("jawaban").value = "";
}

/* Normalisasi input: lowercase + trim + hapus tanda baca kecil */
function normalize(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,!?']/g, "");
}

/* Cek jawaban user */
function cekJawaban() {
  const raw = document.getElementById("jawaban").value;
  const userAnswer = normalize(raw);
  const hasil = document.getElementById("hasilJawaban");

  if (!currentQuestion) {
    hasil.innerText = "Kamu belum dapat pertanyaan 😅";
    return;
  }

  // cek exact match terhadap salah satu opsi jawaban (normalisasi juga)
  const matchExact = currentQuestion.jawab.some(opt => normalize(opt) === userAnswer);

  // cek contains (opsional) untuk menerima potongan jawaban
  const matchContains = currentQuestion.jawab.some(opt => {
    const normOpt = normalize(opt);
    return userAnswer.includes(normOpt) || normOpt.includes(userAnswer);
  });

  if (matchExact || matchContains) {
    hasil.innerText = "Wahh benar banget! 🥰 Ihh jadi makin sayang!";
    hasil.style.color = "#2d9a6a";
  } else {
    hasil.innerText = `Hehe, belum tepat 😝 Contoh jawaban yang benar: "${currentQuestion.jawab[0]}"`;
    hasil.style.color = "#ff4d94";
  }
}

/* Animasi hati jatuh */
function createHearts() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (14 + Math.random() * 24) + "px";
  heart.style.animationDuration = (3 + Math.random() * 4) + "s";

  document.getElementById("hearts").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}
setInterval(createHearts, 300);

/* Panggil tanya() sekali saat load supaya ada pertanyaan awal */
window.addEventListener("DOMContentLoaded", () => {
  tanya();
});

// Tombol untuk putar dan hentikan musik 🎵
const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
let isPlaying = false;

musicButton.addEventListener("click", () => {
  if (!isPlaying) {
    music.play();
    isPlaying = true;
    musicButton.innerText = "🔇 Matikan Musik 💔";
  } else {
    music.pause();
    isPlaying = false;
    musicButton.innerText = "🎶 Putar Musik 💞";
  }
});

