
const SKILLS_API = "api/skills";

// =======================
// 📌 ROUTER
// =======================
function loadSection(section) {

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
async function renderSkills() {

    const app = document.getElementById("app");

    const res = await fetch(SKILLS_API + "/GET_skills.php");
    const data = await res.json();

    if (data.status === "empty") {
        showSkillsEmpty();
        return;
    }

    showSkillsView(data.data);
}

// =======================
// 📌 EMPTY STATE
// =======================
function showSkillsEmpty() {

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning text-center">

            <h5 class="text-warning-emphasis mb-3">
                No hay habilidades aún
            </h5>

            <button class="btn btn-warning btn-soft px-4"
                    onclick="showSkillForm()">
                ➕ Agregar habilidad
            </button>

        </div>
    `;
}

// =======================
// 📌 VIEW LIST
// =======================
function showSkillsView(skills) {

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning">

            <h4 class="fw-bold text-warning-emphasis mb-3">
                Habilidades
            </h4>

            <div class="list-group mb-3">

                ${skills.map(skill => `
                    <div class="list-group-item d-flex justify-content-between align-items-center">

                        <div class="d-flex align-items-center gap-2">

                            <img src="${skill.img_icono}"
                                 width="28"
                                 height="28"
                                 style="object-fit:contain;">

                            <span class="fw-medium">
                                ${skill.nom_skill}
                            </span>

                        </div>

                        <div class="d-flex gap-2">

                            <button class="btn btn-outline-warning btn-soft btn-sm"
                                    onclick="editSkill(${skill.id})">
                                ✏️ Editar
                            </button>

                            <button class="btn btn-outline-danger btn-soft btn-sm"
                                    onclick="deleteSkill(${skill.id})">
                                🗑 Eliminar
                            </button>

                        </div>

                    </div>
                `).join("")}

            </div>

            <button class="btn btn-warning btn-soft w-100"
                    onclick="showSkillForm()">
                ➕ Nueva habilidad
            </button>

        </div>
    `;
}

// =======================
// 📌 CREATE FORM
// =======================
function showSkillForm() {

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning">

            <h4 class="fw-bold text-warning-emphasis mb-3">
                ➕ Nueva habilidad
            </h4>

            <input id="nom_skill"
                   class="form-control mb-3 rounded-3"
                   placeholder="Nombre de la habilidad">

            <input id="img_icono"
                   class="form-control mb-4 rounded-3"
                   placeholder="URL del icono">

            <button class="btn btn-warning btn-soft w-100 mb-2"
                    onclick="saveSkill()">
                💾 Guardar
            </button>

            <button class="btn btn-outline-warning btn-soft w-100"
                    onclick="renderSkills()">
                ↩ Cancelar
            </button>

        </div>
    `;
}

// =======================
// 📌 CREATE
// =======================
async function saveSkill() {

    const data = {
        nom_skill: document.getElementById("nom_skill").value,
        img_icono: document.getElementById("img_icono").value
    };

    await fetch(SKILLS_API + "/POST_skills.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    renderSkills();
}

// =======================
// 📌 EDIT
// =======================
async function editSkill(id) {

    const res = await fetch(SKILLS_API + "/GET_skill.php?id=" + id);
    const skill = await res.json();

    if (skill.status !== "success") {
        alert(skill.message || "Error cargando skill");
        return;
    }

    const data = skill.data;

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning">

            <h4 class="fw-bold text-warning-emphasis mb-3">
                ✏️ Editar habilidad
            </h4>

            <input id="edit_nom_skill"
                   class="form-control mb-3 rounded-3"
                   value="${data.nom_skill}">

            <input id="edit_img_icono"
                   class="form-control mb-4 rounded-3"
                   value="${data.img_icono}">

            <button class="btn btn-outline-warning btn-soft w-100 mb-2"
                    onclick="updateSkill(${id})">
                💾 Guardar cambios
            </button>

            <button class="btn btn-outline-warning btn-soft w-100"
                    onclick="renderSkills()">
                ↩ Cancelar
            </button>

        </div>
    `;
}

// =======================
// 📌 UPDATE
// =======================
async function updateSkill(id) {

    const data = {
        id,
        nom_skill: document.getElementById("edit_nom_skill").value,
        img_icono: document.getElementById("edit_img_icono").value
    };

    const res = await fetch(SKILLS_API + "/PUT_skills.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    console.log(result);

    if (result.status !== "success") {
        alert(result.message || "Error al actualizar");
        return;
    }

    renderSkills();
}
// =======================
// 📌 DELETE
// =======================
async function deleteSkill(id) {

    if (!confirm("¿Eliminar habilidad?")) return;

    const res = await fetch(SKILLS_API + "/DELETE_skills.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });

    const result = await res.json();
    console.log(result);

    renderSkills();
}