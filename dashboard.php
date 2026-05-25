<?php
session_start();

if (!isset($_SESSION["user"])) {
    header("Location: index.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet" href="assets/css/fonts.css">
    <link rel="stylesheet" href="assets/css/cards.css">
    
    <!-- 🔥 CSS IMPORTANTE -->
    <link rel="stylesheet" href="assets/css/dashstyle.css">
</head>

<body class="bg-body-tertiary layout-normal>">

<!-- NAVBAR -->
<nav class="navbar bg-warning-subtle border-bottom border-warning shadow-sm">
    <div class="container-fluid flex-column flex-md-row gap-2">

        <span class="navbar-brand fw-bold text-warning-emphasis mb-0">
            Panel Admin
        </span>

        <button class="btn btn-outline-danger fw-semibold"
                data-bs-toggle="modal"
                data-bs-target="#logoutModal">
            Cerrar sesión
        </button>

    </div>
</nav>
<div class="modal fade" id="logoutModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content border-0 shadow-lg rounded-4">

            <div class="modal-header bg-danger-subtle border-bottom border-danger">
                <h5 class="modal-title text-danger-emphasis fw-bold">
                    Cerrar sesión
                </h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body text-center">
                <p class="text-secondary">
                    ¿Seguro que quieres cerrar sesión?
                </p>

                <form method="POST" action="assets/forms/logout.php">
                    <button type="submit"
                            class="btn btn-danger w-100 fw-semibold">
                        Sí, cerrar sesión
                    </button>
                </form>
            </div>

        </div>
    </div>
</div>
<!-- CONTENIDO -->
<main class="dashboard-main">

<div class="container mt-4">

    <div class="bg-warning-subtle border border-warning rounded-4 p-3 p-md-4 shadow-sm">

        <h2 class="fw-bold text-warning-emphasis">
            Bienvenido 👋 <?= $_SESSION['user'] ?>
        </h2>

        <p class="text-secondary mb-0">
            Selecciona una opción para administrar el contenido
        </p>

        <div class="row g-3 mt-3 row-cols-1 row-cols-sm-2 row-cols-lg-4">

            <div class="col">
                <button class="btn btn-outline-warning w-100 py-3 py-md-4 fw-semibold"
                        onclick="loadSection('bio')">
                    Biografía
                </button>
            </div>

            <div class="col">
                <button class="btn btn-outline-warning w-100 py-3 py-md-4 fw-semibold"
                        onclick="loadSection('skills')">
                    Habilidades
                </button>
            </div>

            <div class="col">
                <button class="btn btn-outline-warning w-100 py-3 py-md-4 fw-semibold"
                        onclick="loadSection('tech')">
                    Tecnologías
                </button>
            </div>

            <div class="col">
                <button class="btn btn-outline-warning w-100 py-3 py-md-4 fw-semibold"
                        onclick="loadSection('projects')">
                    Proyectos
                </button>
            </div>

        </div>

    </div>

    <!-- CONTENIDO DINÁMICO -->
    <div id="app"></div>

</div>

</main>

<!-- FOOTER -->
<footer class="dashboard-footer bg-dark text-light pt-4 pb-3 border-top border-warning">
  <div class="container">

    <div class="row text-center text-md-start">

      <div class="col-md-4 mb-3">
        <h5 class="fw-bold text-warning">Portafolio</h5>
        <p class="mb-0">
          Desarrollado con PHP, JS, BD y Bootstrap
        </p>
      </div>

      <div class="col-md-4 mb-3">
        <h6 class="fw-semibold text-warning">Contacto</h6>
        <p class="mb-1">Email: FERNANND@NOQUIEROREGALARME.com</p>
        <p class="mb-0">WhatsApp: +56 9 0000 0000</p>
      </div>

      <div class="col-md-4 mb-3">
        <h6 class="fw-semibold text-warning">Redes sociales</h6>

        <a href="#" class="text-light d-block text-decoration-none">Instagram</a>
        <a href="https://github.com/FernandoCaullan" class="text-light d-block text-decoration-none">GitHub</a>
      </div>

    </div>

    <hr class="border-warning">

    <div class="text-center small">
      © <span id="year"></span> FNCV Marca Registrada
    </div>

  </div>
</footer>

<script>
  document.getElementById("year").textContent = new Date().getFullYear();
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

<script src="assets/js/biocrud.js"></script>
<script src="assets/js/skillscrud.js"></script>
<script src="assets/js/techcrud.js"></script>
<script src="assets/js/projectscrud.js"></script>

</body>
</html>