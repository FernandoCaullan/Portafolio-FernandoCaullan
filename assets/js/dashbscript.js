const API = "/api/perfil";

// cambiar secciones
function showSection(section) {
    document.querySelectorAll(".cms-section").forEach(s => {
        s.classList.add("d-none");
    });

    document.getElementById(section).classList.remove("d-none");

    if (section === "bio") {
        cargarBio();
    }
}

// cargar biografía
async function cargarBio() {
    const res = await fetch(`${API}/GET_perfil.php`);
    const data = await res.json();

    const container = document.getElementById("bio-container");

    if (data.status === "empty") {
        container.innerHTML = `
            <button class="btn btn-success" onclick="mostrarFormBio()">
                ➕ Agregar biografía
            </button>
        `;
        return;
    }

    const bio = data.data;

    container.innerHTML = `
        <p><b>Nombre:</b> ${bio.nom_bio}</p>
        <p><b>Mini:</b> ${bio.mini_bio}</p>
        <p><b>Descripción:</b> ${bio.detalle_bio}</p>
        <img src="${bio.img_bio}" width="120"/>

        <br><br>

        <button class="btn btn-primary" onclick="editarBio()">
            Editar
        </button>

        <button class="btn btn-danger" onclick="eliminarBio()">
            Eliminar
        </button>
    `;
}

// formulario crear
function mostrarFormBio() {
    document.getElementById("bio-container").innerHTML = `
        <input id="nom" class="form-control mb-2" placeholder="Nombre">
        <input id="mini" class="form-control mb-2" placeholder="Mini bio">
        <textarea id="desc" class="form-control mb-2" placeholder="Descripción"></textarea>
        <input id="img" class="form-control mb-2" placeholder="Imagen URL">

        <button class="btn btn-success" onclick="crearBio()">
            Guardar
        </button>
    `;
}

// CREATE
async function crearBio() {
    await fetch(`${API}/POST_perfil.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nom_bio: nom.value,
            mini_bio: mini.value,
            detalle_bio: desc.value,
            img_bio: img.value
        })
    });

    cargarBio();
}

// UPDATE demo
async function editarBio() {
    await fetch(`${API}/PUT_perfil.php`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nom_bio: "Editado",
            mini_bio: "Editado",
            detalle_bio: "Editado desde dashboard",
            img_bio: "/img/perfil.jpg"
        })
    });

    cargarBio();
}

// DELETE
async function eliminarBio() {
    await fetch(`${API}/DELETE_perfil.php`, {
        method: "DELETE"
    });

    cargarBio();
}

// init
showSection("bio");