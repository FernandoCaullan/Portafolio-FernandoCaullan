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
const offcanvas = document.getElementById("sideMenu");
offcanvas.addEventListener("show.bs.offcanvas", () => {
  btn.style.display = "none";
});

offcanvas.addEventListener("hidden.bs.offcanvas", () => {
  if (window.scrollY > 80) {
    btn.style.display = "block";
  }
});

document.querySelectorAll('.offcanvas a[href^="#"]').forEach(link => {
  link.addEventListener('click', function () {
    const offcanvasEl = document.querySelector('.offcanvas.show');
    if (offcanvasEl) {
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
      offcanvas?.hide();
    }

    // deja que el scroll al ancla ocurra
  });
});
