# Documentacion de pedidos IA

 #### **P:** *como es la coneccion a una bsd mediante .php *
---

### 🧭 Conexion optima php

Este código es lo más estándar, limpio y reutilizable, usando variables genéricas y buenas prácticas básicas

## 🎨 Código

```php
$host = "localhost";
$user = "db_user";
$pass = "db_password";
$db   = "db_name";

$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Usar UTF-8 (recomendado)
$conn->set_charset("utf8");

echo "Conexión exitosa";

// Cerrar conexión (buena práctica)
$conn->close();

```
# HTML
**P:** *como aplico un modal*
---
Boton que abre modal
```html
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#miModal">
  Abrir modal
</button>
```
Modal Completo
```html
<div class="modal fade" id="miModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title">Título del modal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">
        Este es un modal hecho con Bootstrap 🚀
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Cerrar
        </button>
        <button type="button" class="btn btn-primary">
          Guardar
        </button>
      </div>

    </div>
  </div>
</div>
```
# JavaScript
**P:** *js para hacer un nav dinamico*
```js
const menuItems = [
  { name: "Inicio", link: "index.html" },
  { name: "Servicios", link: "servicios.html" },
  { name: "Portafolio", link: "portafolio.html" },
  { name: "Contacto", link: "contacto.html" }
];

const nav = document.getElementById("nav");

menuItems.forEach(item => {
  const li = document.createElement("li");
  const a = document.createElement("a");

  a.textContent = item.name;
  a.href = item.link;

  li.appendChild(a);
  nav.appendChild(li);
});
```


# Revision css

**P:** Se le pide ajustar css y revisar errores
---
```css
/* ==========================================
   BASE / LAYOUT GLOBAL
========================================== */

body {
    font-family: 'Roboto', sans-serif !important;
    scroll-behavior: smooth;
    padding-top: 80px;
}

html {
    scroll-behavior: smooth;
}

/* Secciones */
section {
    padding: 50px 0;
    display: block;
}

section h2 {
    margin-bottom: 15px;
    font-weight: 700;
}

/* Botones global */
.btn {
    transition: 0.2s ease;
}

.btn:hover {
    transform: translateY(-2px);
}
#miniNavBtn {
  z-index: 9999;
}

```
# Index Revision
---
#### **P:** *Limpia el codigo de html*
---
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portafolio</title>

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/indexstyle.css">
  <link rel="stylesheet" href="assets/css/fonts.css">
  <link rel="stylesheet" href="assets/css/cards.css">
  <link rel="stylesheet" href="assets/css/responsive.css">
</head>

<body class="bg-warning bg-opacity-25 text-dark">

<!-- ================= NAVBAR ================= -->
<nav id="mainNav" class="navbar navbar-expand-lg bg-warning fixed-top">
  <div class="container">

    <a class="navbar-brand fw-bold" href="#inicio">
      Portafolio
    </a>

    <!-- BOTÓN HAMBURGUESA -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
      ☰
    </button>

    <!-- MENÚ -->
    <div class="collapse navbar-collapse" id="navMenu">

      <div class="navbar-nav ms-auto gap-3">
        <a class="nav-link text-dark nav-hover" href="#biografia">Biografía</a>
        <a class="nav-link text-dark nav-hover" href="#habilidades">Habilidades</a>
        <a class="nav-link text-dark nav-hover" href="#tecnologias">Tecnologías</a>
        <a class="nav-link text-dark nav-hover" href="#proyectos">Proyectos</a>
        <a class="nav-link text-dark nav-hover" href="#contacto">Contacto</a>
      </div>

      <div class="ms-lg-5 mt-3 mt-lg-0">
        <button class="btn btn-dark"
                data-bs-toggle="modal"
                data-bs-target="#loginModal">
          Iniciar sesión
        </button>
      </div>

    </div>

  </div>
</nav>
<button id="miniNavBtn"
  class="btn btn-dark position-fixed top-0 start-0 m-2 d-none"
  data-bs-toggle="offcanvas"
  data-bs-target="#sideMenu">
  ☰
</button>
<!-- ================= OFFCANVAS ================= -->
<div class="offcanvas offcanvas-start bg-warning" tabindex="-1" id="sideMenu">

  <div class="offcanvas-header">
    <h5 class="offcanvas-title">Menú</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
  </div>

  <div class="offcanvas-body">
    <a class="d-block text-dark mb-3" href="#biografia">Biografía</a>
    <a class="d-block text-dark mb-3" href="#habilidades">Habilidades</a>
    <a class="d-block text-dark mb-3" href="#tecnologias">Tecnologías</a>
    <a class="d-block text-dark mb-3" href="#proyectos">Proyectos</a>
    <a class="d-block text-dark mb-3" href="#contacto">Contacto</a>

    <hr>

    <button class="btn btn-dark w-100"
            data-bs-toggle="modal"
            data-bs-target="#loginModal">
      Iniciar sesión
    </button>

  </div>

</div>

<!-- ================= CONTENIDO ================= -->
<header class="py-5 mt-5 pb-5 bg-warning bg-opacity-25 border-bottom">

  <div class="container text-center">

    <h1 class="display-5 fw-bold text-dark">
      Portafolio
    </h1>

    <p class="text-muted mb-0">
      Desarrollo web | PHP | JavaScript | Bootstrap
    </p>

  </div>
</header>
<!-- ================= BIO ================= -->
<section id="biografia" class="pt-4 pb-4 mt-3 mb-5">
  <div class="container">

    <h2 class="text-center mb-3">Biografía</h2>

    <!-- CONTENIDO DINÁMICO -->
    <div id="bio-content"></div>

  </div>
</section>

<!-- ================= SKILLS ================= -->
<section id="habilidades" class="py-4 mt-4">
  <div class="container">

    <h2 class="text-center mt-3 mb-3">Habilidades</h2>

    <!-- CONTENIDO DINÁMICO -->
    <div id="skills-content"></div>

  </div>
</section>

<!-- ================= TECNOLOGÍAS ================= -->
<section id="tecnologias" class="py-4">
  <div class="container">

    <h2 class="text-center mb-3">Tecnologías</h2>

    <!-- CONTENIDO DINÁMICO -->
    <div id="tech-content"></div>

  </div>
</section>

<!-- ================= PROYECTOS ================= -->
<section id="proyectos" class="py-4">
  <div class="container">

    <h2 class="text-center mb-3">Proyectos</h2>

    <!-- CONTENIDO DINÁMICO -->
    <div id="projects-content"></div>

  </div>
</section>


<!-- ================= CONTACTO ================= -->
<section id="contacto" class="py-5">

  <div class="container">

    <h2 class="text-center mb-4">
      Contacto
    </h2>

    <div class="row justify-content-center">

      <div class="col-lg-7">

        <div class="bg-white shadow-sm rounded-4 p-4">

          <form id="contactForm">

            <!-- NOMBRE -->
            <div class="mb-3">

              <label class="form-label">
                Nombre
              </label>

              <input type="text"
                     class="form-control"
                     name="nom_jefe"
                     required>

            </div>

            <!-- CORREO -->
            <div class="mb-3">

              <label class="form-label">
                Correo
              </label>

              <input type="email"
                     class="form-control"
                     name="email"
                     required>

            </div>

            <!-- ASUNTO -->
            <div class="mb-3">

              <label class="form-label">
                Asunto
              </label>

              <input type="text"
                     class="form-control"
                     name="dato_importa"
                     required>

            </div>

            <!-- MENSAJE -->
            <div class="mb-3">

              <label class="form-label">
                Mensaje
              </label>

              <textarea class="form-control"
                        name="msg_importa"
                        rows="5"
                        required></textarea>

            </div>

            <!-- BOTÓN -->
            <button type="submit"
                    class="btn btn-warning w-100 fw-semibold">

              Enviar mensaje

            </button>

          </form>

          <!-- RESPUESTA -->
          <div id="contactResponse"
               class="mt-3 text-center">
          </div>

        </div>

      </div>

    </div>

  </div>

</section>

<!-- ================= MODAL ================= -->
<div class="modal fade" id="loginModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">

      <div class="modal-header bg-warning">
        <h5 class="modal-title">Login Admin</h5>
        <button class="btn-close" data-bs-dismiss="modal"></button>
      </div>

      <div class="modal-body">

        <form id="loginForm" method="POST" action="assets/forms/login.php">

          <div class="mb-3">
            <label>Usuario</label>
            <input type="text" name="user" class="form-control" required>
          </div>

          <div class="mb-3">
            <label>Contraseña</label>
            <input type="password" name="pass" class="form-control" required>
          </div>

          <button type="submit" class="btn btn-warning w-100">
            Entrar
          </button>

        </form>

      </div>

    </div>
  </div>
</div>

<!-- ================= FOOTER ================= -->
<footer class="bg-dark text-light pt-4 pb-3 mt-5 border-top border-warning">

  <div class="container">

    <div class="row text-center text-md-start">

      <!-- Marca -->
      <div class="col-md-4 mb-3">
        <h5 class="fw-bold text-warning">Portafolio</h5>
        <p class="mb-0">
          Desarrollado como una web, con php, js,bd y css ademas de un uso de bootstrap
        </p>
      </div>

      <!-- Contacto adicional -->
      <div class="col-md-4 mb-3">
        <h6 class="fw-semibold text-warning">Datos de contacto extra</h6>
        <p class="mb-1">Email: FERNANND@NOQUIEROREGALARME.com</p>
        <p class="mb-0">WhatsApp: +56 9 0000 0000</p>
      </div>

      <!-- Redes sociales -->
      <div class="col-md-4 mb-3">
        <h6 class="fw-semibold text-warning">Redes sociales</h6>

        <a href="#" class="text-light d-block text-decoration-none">Instagram</a>
        <a href="https://github.com/FernandoCaullan" class="text-light d-block text-decoration-none">GitHub</a>
      </div>

    </div>

    <hr class="border-warning">

    <!-- Copyright -->
    <div class="text-center small">

      © <span id="year"></span> FNCV Marca Registrada. Todos los derechos reservados.

    </div>

  </div>

</footer>

<script>
  document.getElementById("year").textContent = new Date().getFullYear();
</script>
<!-- ================= SCRIPTS ================= -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/scriptnav.js"></script>
<script src="assets/js/pruebaajax.js"></script>
<script src="assets/js/indexcontent.js"></script>
<script src="assets/js/formcontacto.js"></script>

</body>
</html>
```
#### **P:** *No me funciona el ajaax*
```
4. POSIBLE error más común (MUY probable en tu caso)
❌ No estás cargando jQuery
```
En tu HTML NO aparece esto:
```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
```

👉 Si en pruebaajax.js o formcontacto.js usas $o$.ajax`, entonces:

💥 NO FUNCIONA NADA
#### **P:** *formato de colores para bootstrap*
```
🎨 Colores principales en Bootstrap

Bootstrap usa esta paleta base:

primary → azul
secondary → gris
success → verde
danger → rojo
warning → amarillo/naranjo
info → celeste
light → claro
dark → oscuro
body → color del texto del body
```
#### **P:** *manera de hacer un html responsivo con bootstrap*
```
Bootstrap ya viene pensado para responsive. La clave es usar correctamente:

container
row
col-*
breakpoints (sm, md, lg, xl)
utilidades responsive (d-md-none, flex-lg-row, etc.)
```
#### **P:** *no quiero pensar mas hasme un footer*
```html
<footer style="background:#222; color:#fff; padding:40px 20px; text-align:center;">
    <div style="max-width:1200px; margin:auto;">
        
        <h2 style="margin-bottom:10px;">Mi Sitio Web</h2>
        
        <p style="margin-bottom:20px;">
            © 2026 Todos los derechos reservados.
        </p>

        <div style="margin-bottom:20px;">
            <a href="#" style="color:#fff; margin:0 10px; text-decoration:none;">Inicio</a>
            <a href="#" style="color:#fff; margin:0 10px; text-decoration:none;">Servicios</a>
            <a href="#" style="color:#fff; margin:0 10px; text-decoration:none;">Contacto</a>
        </div>

        <div>
            <a href="#" style="color:#fff; margin:0 10px;">Facebook</a>
            <a href="#" style="color:#fff; margin:0 10px;">Instagram</a>
            <a href="#" style="color:#fff; margin:0 10px;">Twitter</a>
        </div>

    </div>
</footer>
```
#### **P:** *tengo 2 archivos y quiero probar el ajaax para un modal*

```html
Tu AJAX está casi correcto, pero en tu HTML no existe ningún elemento con id errorBox, y por eso cuando falle el login tendrás un error JavaScript.

Dentro del modal agrega un contenedor para mostrar mensajes.

Por ejemplo, debajo del botón:

<button type="submit" class="btn btn-warning w-100">
  Entrar
</button>

<div id="errorBox" class="mt-3"></div>

Quedaría así:

<form id="loginForm" method="POST" action="assets/forms/login.php">

  <div class="mb-3">
    <label>Usuario</label>
    <input type="text" name="user" class="form-control" required>
  </div>

  <div class="mb-3">
    <label>Contraseña</label>
    <input type="password" name="pass" class="form-control" required>
  </div>

  <button type="submit" class="btn btn-warning w-100">
    Entrar
  </button>

  <div id="errorBox" class="mt-3"></div>

</form>
```
#### **P:** *un tema es que el mensaje no desaparece si cierro el modal, se mantiene*

```js
const loginModal = document.getElementById("loginModal");

loginModal.addEventListener("hidden.bs.modal", function () {

  document.getElementById("errorBox").innerHTML = "";

  document.getElementById("loginForm").reset();

});
```
## Sintaxis de md 


---
#### **P:** *sintaxis de md*
---

```md

# Título 1
## Título 2
### Título 3
#### Título 4
##### Título 5
###### Título 6
Texto normal

**negrita**
*cursiva*
~~tachado~~
- Item 1
- Item 2
  - Sub item
```

> **Notas:** Existen diferencias respecto a las request, algunos datos fueron modificados o son usados como referencia.

