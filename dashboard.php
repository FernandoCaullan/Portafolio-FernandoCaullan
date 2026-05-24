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
    <title>CMS Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

<!-- NAV -->
<nav class="navbar bg-warning-subtle border-bottom border-warning px-3">
    <span class="navbar-brand fw-bold">
        CMS Panel
    </span>

    <button class="btn btn-outline-danger"
            data-bs-toggle="modal"
            data-bs-target="#logoutModal">
        Cerrar sesión
    </button>
</nav>

<!-- BOTONES -->
<div class="container mt-4">

    <div class="btn-group w-100 mb-4">
        <button class="btn btn-warning" onclick="showSection('bio')">
            Biografía
        </button>

        <button class="btn btn-outline-warning" onclick="showSection('skills')">
            Skills
        </button>

        <button class="btn btn-outline-warning" onclick="showSection('tech')">
            Tecnologías
        </button>

        <button class="btn btn-outline-warning" onclick="showSection('projects')">
            Proyectos
        </button>
    </div>

    <!-- BIODATA -->
    <section id="bio" class="cms-section">

        <div class="p-4 border rounded bg-white shadow-sm">

            <h3>🧑 Biografía</h3>

            <div id="bio-container">Cargando...</div>

        </div>

    </section>

    <!-- SKILLS -->
    <section id="skills" class="cms-section d-none">
        <div class="p-4 border rounded bg-white shadow-sm">
            <h3>🧰 Skills</h3>
            <p>Próximamente...</p>
        </div>
    </section>

    <!-- TECH -->
    <section id="tech" class="cms-section d-none">
        <div class="p-4 border rounded bg-white shadow-sm">
            <h3>⚙️ Tecnologías</h3>
            <p>Próximamente...</p>
        </div>
    </section>

    <!-- PROJECTS -->
    <section id="projects" class="cms-section d-none">
        <div class="p-4 border rounded bg-white shadow-sm">
            <h3>💼 Proyectos</h3>
            <p>Próximamente...</p>
        </div>
    </section>

</div>

<!-- LOGOUT -->
<div class="modal fade" id="logoutModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-danger-subtle">
        <h5>Cerrar sesión</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body text-center">
        <form method="POST" action="assets/forms/logout.php">
            <button class="btn btn-danger w-100">
                Confirmar logout
            </button>
        </form>
      </div>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

<script src="dashbscript.js"></script>

</body>
</html>