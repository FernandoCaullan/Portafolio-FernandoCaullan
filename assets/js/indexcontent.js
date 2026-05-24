// =======================
// 📌 BIO
// =======================
async function loadBioToIndex() {

    const container = document.getElementById("bio-section");

    const res = await fetch("api/biografia/GET_bio.php");
    const data = await res.json();

    if (data.status === "empty") {
        container.innerHTML = `
            <div class="text-center text-muted py-4">
                Sin biografía disponible
            </div>
        `;
        return;
    }

    const bio = data.data;

    container.innerHTML = `
        <div class="text-center py-4">

            <img src="${bio.img_bio}"
                 class="rounded-circle shadow mb-4"
                 style="width:160px;height:160px;object-fit:cover;">

            <h3 class="fw-bold text-warning-emphasis">
                ${bio.nom_bio}
            </h3>

            <p class="lead text-secondary mb-3">
                ${bio.mini_bio}
            </p>

            <div class="mx-auto" style="max-width:650px;">

                <p class="text-muted lh-lg">
                    ${bio.detalle_bio}
                </p>

            </div>

        </div>
    `;
}

// =======================
// 📌 SKILLS
// =======================
async function loadSkillsToIndex() {

    const container = document.querySelector("#habilidades .container");

    const res = await fetch("api/skills/GET_skills.php");
    const data = await res.json();

    if (data.status !== "success") {
        container.innerHTML = "<p class='text-center text-muted'>Sin habilidades</p>";
        return;
    }

    container.innerHTML = `
        <div class="row justify-content-center mt-3">

            ${data.data.map(s => `
                <div class="col-6 col-md-3 text-center mb-3">

                    <div class="fw-bold">${s.nombre}</div>

                    <div class="progress mt-2">
                        <div class="progress-bar bg-warning"
                             style="width:${s.porcentaje}%">
                            ${s.porcentaje}%
                        </div>
                    </div>

                </div>
            `).join("")}

        </div>
    `;
}

// =======================
// 📌 TECNOLOGÍAS
// =======================
async function loadTechToIndex() {

    const container = document.querySelector("#tecnologias .container");

    const res = await fetch("api/tecno/GET_tech.php");
    const data = await res.json();

    if (data.status !== "success") {
        container.innerHTML = "<p class='text-center text-muted'>Sin tecnologías</p>";
        return;
    }

    container.innerHTML = `
        <div class="row justify-content-center mt-3">

            ${data.data.map(t => `
                <div class="col-4 col-md-2 text-center mb-3">

                    <img src="${t.img_icono}" width="50" class="mb-2">

                    <div>${t.nom_Tec}</div>

                    <small class="text-muted">${t.porcentaje}%</small>

                </div>
            `).join("")}

        </div>
    `;
}

// =======================
// 📌 PROYECTOS
// =======================
async function loadProjectsToIndex() {

    const container = document.querySelector("#proyectos .container");

    const res = await fetch("api/trabajos/GET_projects.php");
    const data = await res.json();

    if (data.status !== "success") {
        container.innerHTML = "<p class='text-center text-muted'>Sin proyectos</p>";
        return;
    }

    container.innerHTML = `
        <div class="row mt-3">

            ${data.data.map(p => `
                <div class="col-md-6 mb-4">

                    <div class="card shadow-sm h-100">

                        <img src="${p.img_prev}" class="card-img-top">

                        <div class="card-body">

                            <h5 class="fw-bold">${p.titulo}</h5>

                            <p class="text-muted">
                                ${p.descripcion}
                            </p>

                            <div class="d-flex gap-2">

                                <a href="${p.demo_url}" target="_blank"
                                   class="btn btn-sm btn-warning">
                                    Demo
                                </a>

                                <a href="${p.github_url}" target="_blank"
                                   class="btn btn-sm btn-outline-dark">
                                    GitHub
                                </a>

                            </div>

                        </div>

                    </div>

                </div>
            `).join("")}

        </div>
    `;
}

// =======================
// 📌 INIT GLOBAL (IMPORTANTE)
// =======================
document.addEventListener("DOMContentLoaded", () => {
    loadBioToIndex();
    loadSkillsToIndex();
    loadTechToIndex();
    loadProjectsToIndex();
});