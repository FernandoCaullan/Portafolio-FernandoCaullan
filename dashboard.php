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
    <title>Dashboard</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/css/style.css">
</head>

<body class="bg-body-tertiary">

<!-- NAVBAR -->
<nav class="navbar bg-warning-subtle border-bottom border-warning shadow-sm px-3">

    <span class="navbar-brand fw-bold text-warning-emphasis">
        Panel Admin
    </span>

    <button class="btn btn-outline-danger fw-semibold"
            data-bs-toggle="modal"
            data-bs-target="#logoutModal">
        Cerrar sesión
    </button>
</nav>

<!-- CONTENIDO -->
<div class="container mt-5">

    <!-- PANEL PRINCIPAL -->
    <div class="bg-warning-subtle border border-warning rounded-4 p-4 shadow-sm">

        <h2 class="fw-bold text-warning-emphasis">
            Bienvenido 👋 <?= $_SESSION['user'] ?>
        </h2>

        <p class="text-secondary">
            Selecciona una opción para administrar el contenido
        </p>

        
        <!-- BOTONES (MENU TIPO DASHBOARD) -->
        <div class="row g-3 mt-3">

            <div class="col-12 col-md-6 col-lg-3">

                <button class="btn btn-outline-warning w-100 py-3 fw-semibold menu-btn"
                        onclick="loadSection('bio')">
                    Biografía
                </button>

            </div>

            <div class="col-12 col-md-6 col-lg-3">

                <button class="btn btn-outline-warning w-100 py-3 fw-semibold menu-btn"
                        onclick="loadSection('skills')">
                    Habilidades
                </button>

            </div>

            <div class="col-12 col-md-6 col-lg-3">

                <button class="btn btn-outline-warning w-100 py-3 fw-semibold menu-btn"
                        onclick="loadSection('tech')">
                    Tecnologías
                </button>

            </div>

            <div class="col-12 col-md-6 col-lg-3">

                <button class="btn btn-outline-warning w-100 py-3 fw-semibold menu-btn"
                        onclick="loadSection('projects')">
                    Proyectos
                </button>

            </div>

        </div>

    </div>

    <!-- CONTENEDOR DINÁMICO DEL CRUD -->
    <div id="app" class="mt-5"></div>

</div>

<!-- MODAL LOGOUT -->
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

<!-- SCRIPTS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/biocrud.js"></script>
<script src="assets/js/skillscrud.js"></script>

</body>
</html>