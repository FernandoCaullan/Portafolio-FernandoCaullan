const API = "api/biografia";

// =======================
// 📌 MENÚ (router)
// =======================
function loadSection(section) {

    if (section === "bio") {
        renderBio();
    }
}

// =======================
// 📌 RENDER PRINCIPAL
// =======================
async function renderBio() {

    const app = document.getElementById("app");

    const res = await fetch(API + "/GET_bio.php");
    const data = await res.json();

    if (data.status === "empty") {
        showBioEmpty();
        return;
    }

    showBioView(data.data);
}

// =======================
// 📌 EMPTY STATE
// =======================
function showBioEmpty() {

    document.getElementById("app").innerHTML = `
        <div class="card p-4 shadow-sm border-warning rounded-4 text-center">

            <h5 class="text-warning-emphasis mb-3">
                No hay biografía aún
            </h5>

            <button class="btn btn-warning px-4 rounded-3"
                    onclick="showBioForm()">
                ➕ Crear biografía
            </button>

        </div>
    `;
}

// =======================
// 📌 VIEW STATE
// =======================
function showBioView(bio) {

    window.lastBio = bio;

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning">

            <h4 class="fw-bold text-warning-emphasis mb-2">
                ${bio.nom_bio}
            </h4>

            <p class="text-secondary mb-1">
                ${bio.mini_bio}
            </p>

            <p class="mb-3">
                ${bio.detalle_bio}
            </p>

            <img src="${bio.img_bio}"
                 class="rounded mb-3"
                 style="width:120px;height:120px;object-fit:cover;">

            <div class="d-flex gap-2">

                <button class="btn btn-outline-warning btn-soft"
                        onclick="showBioEditForm()">
                    ✏️ Editar
                </button>

                <button class="btn btn-outline-danger btn-soft"
                        onclick="deleteBio()">
                    🗑 Eliminar
                </button>

            </div>

        </div>
    `;
}

// =======================
// 📌 CREATE FORM
// =======================
function showBioForm() {

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning">

            <h4 class="text-warning-emphasis fw-bold mb-3">
                ➕ Nueva biografía
            </h4>

            <input id="nom_bio"
                   class="form-control mb-3 rounded-3"
                   placeholder="Nombre">

            <input id="mini_bio"
                   class="form-control mb-3 rounded-3"
                   placeholder="Intro">

            <textarea id="detalle_bio"
                      class="form-control mb-3 rounded-3"
                      rows="4"
                      placeholder="Detalle"></textarea>

            <input id="img_bio"
                   class="form-control mb-4 rounded-3"
                   placeholder="Imagen URL">

            <button class="btn btn-warning btn-soft w-100 mb-2"
                    onclick="guardarBio()">
                💾 Guardar
            </button>

            <button class="btn btn-outline-warning btn-soft w-100"
                    onclick="renderBio()">
                ↩ Cancelar
            </button>

        </div>
    `;
}

// =======================
// 📌 EDIT FORM
// =======================
function showBioEditForm() {

    const bio = window.lastBio;

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning">

            <h4 class="text-warning-emphasis fw-bold mb-3">
                ✏️ Editar biografía
            </h4>

            <input id="nom_bio"
                   class="form-control mb-3 rounded-3"
                   value="${bio.nom_bio}">

            <input id="mini_bio"
                   class="form-control mb-3 rounded-3"
                   value="${bio.mini_bio}">

            <textarea id="detalle_bio"
                      class="form-control mb-3 rounded-3"
                      rows="4">${bio.detalle_bio}</textarea>

            <input id="img_bio"
                   class="form-control mb-4 rounded-3"
                   value="${bio.img_bio}">

            <button class="btn btn-outline-warning btn-soft w-100 mb-2"
                    onclick="updateBio()">
                💾 Guardar cambios
            </button>

            <button class="btn btn-outline-warning btn-soft w-100"
                    onclick="renderBio()">
                ↩ Cancelar
            </button>

        </div>
    `;
}

// =======================
// 📌 CREATE
// =======================
async function guardarBio() {

    const data = {
        nom_bio: document.getElementById("nom_bio").value,
        mini_bio: document.getElementById("mini_bio").value,
        detalle_bio: document.getElementById("detalle_bio").value,
        img_bio: document.getElementById("img_bio").value
    };

    await fetch(API + "/POST_bio.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    renderBio();
}

// =======================
// 📌 UPDATE
// =======================
async function updateBio() {

    const data = {
        nom_bio: document.getElementById("nom_bio").value,
        mini_bio: document.getElementById("mini_bio").value,
        detalle_bio: document.getElementById("detalle_bio").value,
        img_bio: document.getElementById("img_bio").value
    };

    await fetch(API + "/PUT_bio.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    renderBio();
}

// =======================
// 📌 DELETE
// =======================
async function deleteBio() {

    if (!confirm("¿Seguro que quieres eliminar la biografía?")) return;

    await fetch(API + "/DELETE_bio.php", {
        method: "POST"
    });

    renderBio();
}