const PROJECT_API = "api/trabajos";

// =======================
// 📌 ROUTER
// =======================
function loadSection(section) {
    if (section === "projects") {
        renderProjects();
    
    }if (section === "tech") {
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
async function renderProjects() {

    const app = document.getElementById("app");

    const res = await fetch(PROJECT_API + "/GET_projects.php");
    const data = await res.json();

    if (data.status === "empty") {
        showProjectEmpty();
        return;
    }

    if (data.status === "error") {
        app.innerHTML = `<p>Error: ${data.message}</p>`;
        return;
    }

    showProjectView(data.data);
}

// =======================
// 📌 EMPTY
// =======================
function showProjectEmpty() {

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning text-center">

            <h5 class="text-warning-emphasis mb-3">
                No hay proyectos aún
            </h5>

            <button class="btn btn-warning btn-soft px-4"
                    onclick="showProjectForm()">
                ➕ Agregar proyecto
            </button>

        </div>
    `;
}

// =======================
// 📌 VIEW
// =======================
function showProjectView(projects) {

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning">

            <h4 class="fw-bold text-warning-emphasis mb-3">
                Proyectos
            </h4>

            <div class="row g-3">

                ${projects.map(p => `
                    <div class="col-md-6">

                        <div class="card shadow-sm overflow-hidden h-100 project-card">

                            <img src="${p.img_prev}"
                                class="w-100 project-img"
                                onerror="this.src='assets/img/default.jpg'">

                            <div class="card-body">

                                <h5 class="fw-bold">${p.titulo}</h5>

                                <p class="text-muted">
                                    ${p.descripcion}
                                </p>

                                <div class="d-flex gap-2 mb-2">

                                    <a href="${p.demo_url}" target="_blank" class="btn btn-sm btn-warning">
                                        Demo
                                    </a>

                                    <a href="${p.github_url}" target="_blank" class="btn btn-sm btn-outline-dark">
                                        GitHub
                                    </a>

                                </div>

                                <div class="d-flex gap-2">

                                    <button class="btn btn-sm btn-outline-warning"
                                            onclick="editProject(${p.id})">
                                        ✏️ Editar
                                    </button>

                                    <button class="btn btn-sm btn-outline-danger"
                                            onclick="deleteProject(${p.id})">
                                        🗑 Eliminar
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>
                `).join("")}

            </div>

            <button class="btn btn-warning w-100 mt-3"
                    onclick="showProjectForm()">
                ➕ Nuevo proyecto
            </button>

        </div>
    `;
}

// =======================
// 📌 FORM CREATE
// =======================
function showProjectForm() {

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning">

            <h4 class="fw-bold text-warning-emphasis mb-3">
                ➕ Nuevo proyecto
            </h4>

            <input id="titulo"
                   class="form-control mb-2"
                   placeholder="Título">

            <textarea id="descripcion"
                      class="form-control mb-2"
                      placeholder="Descripción"></textarea>

            <input id="img_prev"
                   class="form-control mb-2"
                   placeholder="Imagen URL">

            <input id="demo_url"
                   class="form-control mb-2"
                   placeholder="Demo URL">

            <input id="github_url"
                   class="form-control mb-3"
                   placeholder="GitHub URL">

            <button class="btn btn-warning w-100 mb-2"
                    onclick="saveProject()">
                💾 Guardar
            </button>

            <button class="btn btn-outline-warning w-100"
                    onclick="renderProjects()">
                ↩ Cancelar
            </button>

        </div>
    `;
}

// =======================
// 📌 CREATE
// =======================
async function saveProject() {

    const data = {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("descripcion").value,
        img_prev: document.getElementById("img_prev").value,
        demo_url: document.getElementById("demo_url").value,
        github_url: document.getElementById("github_url").value
    };

    const res = await fetch(PROJECT_API + "/POST_project.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.status !== "success") {
        alert(result.message || "Error al guardar");
        return;
    }

    renderProjects();
}

// =======================
// 📌 EDIT
// =======================
async function editProject(id) {

    const res = await fetch(PROJECT_API + "/GET_onlyproject.php?id=" + id);
    const data = await res.json();

    if (data.status !== "success") {
        alert(data.message || "Error cargando proyecto");
        return;
    }

    const p = data.data;

    document.getElementById("app").innerHTML = `
        <div class="card card-soft p-4 shadow-sm border-warning">

            <h4 class="fw-bold text-warning-emphasis mb-3">
                ✏️ Editar proyecto
            </h4>

            <input id="edit_titulo"
                   class="form-control mb-2"
                   value="${p.titulo}">

            <textarea id="edit_descripcion"
                      class="form-control mb-2">${p.descripcion}</textarea>

            <input id="edit_img_prev"
                   class="form-control mb-2"
                   value="${p.img_prev}">

            <input id="edit_demo_url"
                   class="form-control mb-2"
                   value="${p.demo_url}">

            <input id="edit_github_url"
                   class="form-control mb-3"
                   value="${p.github_url}">

            <button class="btn btn-outline-warning w-100 mb-2"
                    onclick="updateProject(${id})">
                💾 Guardar cambios
            </button>

            <button class="btn btn-outline-warning w-100"
                    onclick="renderProjects()">
                ↩ Cancelar
            </button>

        </div>
    `;
}

// =======================
// 📌 UPDATE
// =======================
async function updateProject(id) {

    const data = {
        id,
        titulo: document.getElementById("edit_titulo").value,
        descripcion: document.getElementById("edit_descripcion").value,
        img_prev: document.getElementById("edit_img_prev").value,
        demo_url: document.getElementById("edit_demo_url").value,
        github_url: document.getElementById("edit_github_url").value
    };

    const res = await fetch(PROJECT_API + "/PUT_project.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (result.status !== "success") {
        alert(result.message || "Error al actualizar");
        return;
    }

    renderProjects();
}

// =======================
// 📌 DELETE
// =======================
async function deleteProject(id) {

    if (!confirm("¿Eliminar proyecto?")) return;

    const res = await fetch(PROJECT_API + "/DELETE_project.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    });

    const result = await res.json();

    if (result.status !== "success") {
        alert(result.message || "Error al eliminar");
        return;
    }

    renderProjects();
}