const TECH_API = "api/tecno";

// =======================
// 📌 ROUTER
// =======================

function loadSection(section) {
    if (section === "tech") {
        renderTech();
    }
    if (section === "bio") {
        renderBio();
    }

    if (section === "skills") {
        renderSkills();
    }
}
// =======================
// 📌 RENDER
// =======================
async function renderTech() {

    const app = document.getElementById("app");

    const res = await fetch(TECH_API + "/GET_tech.php");
    const data = await res.json();

    if (data.status === "empty") {
        showTechEmpty();
        return;
    }

    if (data.status === "error") {
        app.innerHTML = `<p>Error: ${data.message}</p>`;
        return;
    }

    showTechView(data.data);
}

// =======================
// 📌 EMPTY STATE
// =======================
function showTechEmpty() {

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning text-center">

            <h5 class="text-warning-emphasis mb-3">
                No hay tecnologías aún
            </h5>

            <button class="btn btn-warning btn-soft px-4"
                    onclick="showTechForm()">
                ➕ Agregar tecnología
            </button>

        </div>
    `;
}

// =======================
// 📌 VIEW LIST
// =======================
function showTechView(tech) {

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning">

            <h4 class="fw-bold text-warning-emphasis mb-3">
                Tecnologías
            </h4>

            <div class="list-group mb-3">

                ${tech.map(t => `
                    <div class="list-group-item d-flex justify-content-between align-items-center">

                        <div class="d-flex align-items-center gap-2">

                            <img src="${t.img_icono}"
                                 width="28"
                                 height="28"
                                 style="object-fit:contain;">

                            <div>
                                <span class="fw-medium d-block">
                                    ${t.nom_Tec}
                                </span>

                                <small class="text-muted">
                                    ${t.porcentaje}%
                                </small>
                            </div>

                        </div>

                        <div class="d-flex gap-2">

                            <button class="btn btn-outline-warning btn-soft btn-sm"
                                    onclick="editTech(${t.id})">
                                ✏️ Editar
                            </button>

                            <button class="btn btn-outline-danger btn-soft btn-sm"
                                    onclick="deleteTech(${t.id})">
                                🗑 Eliminar
                            </button>

                        </div>

                    </div>
                `).join("")}

            </div>

            <button class="btn btn-warning btn-soft w-100"
                    onclick="showTechForm()">
                ➕ Nueva tecnología
            </button>

        </div>
    `;
}

// =======================
// 📌 CREATE FORM
// =======================
function showTechForm() {

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning">

            <h4 class="fw-bold text-warning-emphasis mb-3">
                ➕ Nueva tecnología
            </h4>

            <input id="nom_Tec"
                   class="form-control mb-3 rounded-3"
                   placeholder="Nombre tecnología">

            <input id="porcentaje"
                   type="number"
                   class="form-control mb-3 rounded-3"
                   placeholder="% Dominio">

            <input id="img_icono"
                   class="form-control mb-4 rounded-3"
                   placeholder="URL icono">

            <button class="btn btn-warning btn-soft w-100 mb-2"
                    onclick="saveTech()">
                💾 Guardar
            </button>

            <button class="btn btn-outline-warning btn-soft w-100"
                    onclick="renderTech()">
                ↩ Cancelar
            </button>

        </div>
    `;
}

// =======================
// 📌 CREATE
// =======================
async function saveTech() {

    const data = {
        nom_Tec: document.getElementById("nom_Tec").value,
        porcentaje: document.getElementById("porcentaje").value,
        img_icono: document.getElementById("img_icono").value
    };

    await fetch(TECH_API + "/POST_tech.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    renderTech();
}

// =======================
// 📌 EDIT
// =======================
async function editTech(id) {

    const res = await fetch(TECH_API + "/GET_onlytech.php?id=" + id);
    const tech = await res.json();

    if (tech.status !== "success") {
        alert(tech.message || "Error cargando tecnología");
        return;
    }

    const data = tech.data;

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning">

            <h4 class="fw-bold text-warning-emphasis mb-3">
                ✏️ Editar tecnología
            </h4>

            <input id="edit_nom_Tec"
                   class="form-control mb-3 rounded-3"
                   value="${data.nom_Tec}">

            <input id="edit_porcentaje"
                   type="number"
                   class="form-control mb-3 rounded-3"
                   value="${data.porcentaje}">

            <input id="edit_img_icono"
                   class="form-control mb-4 rounded-3"
                   value="${data.img_icono}">

            <button class="btn btn-outline-warning btn-soft w-100 mb-2"
                    onclick="updateTech(${id})">
                💾 Guardar cambios
            </button>

            <button class="btn btn-outline-warning btn-soft w-100"
                    onclick="renderTech()">
                ↩ Cancelar
            </button>

        </div>
    `;
}

// =======================
// 📌 UPDATE
// =======================
async function updateTech(id) {

    const data = {
        id,
        nom_Tec: document.getElementById("edit_nom_Tec").value,
        porcentaje: document.getElementById("edit_porcentaje").value,
        img_icono: document.getElementById("edit_img_icono").value
    };

    const res = await fetch(TECH_API + "/PUT_tech.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.status !== "success") {
        alert(result.message || "Error al actualizar");
        return;
    }

    renderTech();
}

// =======================
// 📌 DELETE
// =======================
async function deleteTech(id) {

    if (!confirm("¿Eliminar tecnología?")) return;

    const res = await fetch(TECH_API + "/DELETE_tech.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });

    const result = await res.json();

    if (result.status !== "success") {
        alert(result.message || "Error al eliminar");
        return;
    }

    renderTech();
}