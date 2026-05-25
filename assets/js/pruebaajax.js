document.getElementById("loginForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const formData = new FormData(this);

  const res = await fetch("assets/forms/login.php", {
    method: "POST",
    body: formData
  });

  const data = await res.json();

  if (data.status === "ok") {
    window.location.href = "dashboard.php";
  } else {
    document.getElementById("errorBox").innerHTML =
      '<div class="alert alert-danger">Usuario o contraseña incorrectos</div>';
  }
});
const loginModal = document.getElementById("loginModal");

loginModal.addEventListener("hidden.bs.modal", function () {

  document.getElementById("errorBox").innerHTML = "";

  document.getElementById("loginForm").reset();

});