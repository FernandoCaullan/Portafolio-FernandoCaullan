const nav = document.getElementById("mainNav");
const btn = document.getElementById("miniNavBtn");

window.addEventListener("scroll", () => {

  if (window.scrollY > 80) {
    nav.classList.add("hidden");
    btn.classList.remove("d-none");
  } else {
    nav.classList.remove("hidden");
    btn.classList.add("d-none");
  }

});