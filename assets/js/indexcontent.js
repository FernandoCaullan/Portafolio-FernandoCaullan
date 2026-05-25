
// =======================
// 🛡️ HELPERS
// =======================

async function fetchJSON(url) {
    try {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`);
        }

        return await res.json();

    } catch (err) {
        console.error("Fetch error:", err);
        return null;
    }
}

function escapeHTML(str) {
    if (!str) return "";
    return str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

// =======================
// 📌 BIO
// =======================

async function loadBioToIndex() {

    const container = document.getElementById("bio-content");

    const data = await fetchJSON("api/biografia/GET_bio.php");

    if (!data || data.status === "empty") {
        container.innerHTML = `<p class="text-center text-muted">Sin biografía disponible</p>`;
        return;
    }

    const bio = data.data;

    container.innerHTML = `
        <div class="row align-items-center py-4">

            <!-- TEXTO IZQUIERDA -->
            <div class="col-md-7">

                <h2 class="fw-bold text-dark mb-2 text-md-start text-center">
                    ${escapeHTML(bio.nom_bio)}
                </h2>

                <p class="lead text-muted text-md-start text-center mb-3">
                    ${escapeHTML(bio.mini_bio)}
                </p>

                <p class="text-secondary lh-lg text-md-start text-center">
                    ${escapeHTML(bio.detalle_bio)}
                </p>

            </div>

            <!-- IMAGEN DERECHA -->
            <div class="col-md-5 text-center mt-4 mt-md-0">

                <img src="${bio.img_bio}"
                     class="rounded-circle shadow"
                     style="width:220px;height:220px;object-fit:cover;">

            </div>

        </div>
    `;
}

// =======================
// 📌 SKILLS
// =======================

async function loadSkillsToIndex() {

    const container = document.getElementById("skills-content");

    const data = await fetchJSON("api/skills/GET_skills.php");

    if (!data || data.status !== "success") {
        container.innerHTML = `<p class="text-center text-muted">Sin habilidades</p>`;
        return;
    }

    container.innerHTML = `
        <div class="row justify-content-center mt-4 g-4">

            ${data.data.map(skill => `

                <div class="col-6 col-md-3 col-lg-2">

                    <div class="text-center p-3 bg-white rounded-4 shadow-sm skill-box">

                        <img src="${skill.img_icono}"
                             alt="${skill.nom_skill}"
                             style="width:55px;height:55px;object-fit:contain;">

                        <div class="fw-semibold mt-2">
                            ${escapeHTML(skill.nom_skill)}
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

    const container = document.getElementById("tech-content");

    const data = await fetchJSON("api/tecno/GET_tech.php");

    if (!data || data.status !== "success") {
        container.innerHTML = `<p class="text-center text-muted">Sin tecnologías</p>`;
        return;
    }

    container.innerHTML = `
        <div class="row justify-content-center mt-4 g-4">

            ${data.data.map(t => `

                <div class="col-6 col-md-3 col-lg-2">

                    <div class="tech-card">

                        <div class="tech-fill" style="--level:${t.porcentaje}%"></div>

                        <div class="tech-content">

                            <img src="${t.img_icono}" alt="${t.nom_Tec}">

                            <div class="fw-semibold">
                                ${escapeHTML(t.nom_Tec)}
                            </div>

                            <div class="tech-percent">
                                ${t.porcentaje}%
                            </div>

                        </div>

                    </div>

                </div>

            `).join("")}

        </div>
    `;
}

// =======================
// 📌 PROYECTOS
// =======================

async function loadProjectsToIndex() {

    const container = document.getElementById("projects-content");

    container.innerHTML = `<p class="text-center text-muted">Cargando...</p>`;

    try {

        const data = await fetchJSON("api/trabajos/GET_projects.php");

        if (!data || data.status !== "success") {
            container.innerHTML = `<p class="text-center text-muted">Sin proyectos</p>`;
            return;
        }

        const projects = Array.isArray(data.data) ? data.data : [];

        if (projects.length === 0) {
            container.innerHTML = `<p class="text-center text-muted">Sin proyectos</p>`;
            return;
        }

        container.innerHTML = `
            <div class="row mt-4 g-4 justify-content-center">
                ${projects.map(p => `
                    <div class="col-md-4 col-lg-3">

                        <div class="card text-white border-0 shadow-sm h-100 overflow-hidden">

                            <img src="${p.img_prev}"
                                 class="w-100"
                                 style="height: 140px; object-fit: cover;"
                                 alt="${escapeHTML(p.titulo)}"
                                 onerror="this.src='assets/img/default.jpg'">

                            <div class="card-body bg-dark d-flex flex-column justify-content-between">

                                <div>
                                    <h6 class="fw-bold mb-2">
                                        ${escapeHTML(p.titulo)}
                                    </h6>

                                    <p class="text-light small mb-3">
                                        ${escapeHTML(p.descripcion)}
                                    </p>
                                </div>

                                <div class="d-flex gap-2">
                                    <a href="${p.demo_url}"
                                       target="_blank"
                                       class="btn btn-sm btn-warning">
                                        Demo
                                    </a>

                                    <a href="${p.github_url}"
                                     target="_blank" class="btn btn-sm btn-outline-light">
                                     GitHub 
                                    </a>
                                </div>

                            </div>

                        </div>

                    </div>
                `).join("")}
            </div>
        `;

    } catch (err) {
        console.error(err);
        container.innerHTML = `<p class="text-center text-danger">Error al cargar proyectos</p>`;
    }
}
// =======================
// 🚀 INIT
// =======================

document.addEventListener("DOMContentLoaded", () => {

    loadBioToIndex();
    loadSkillsToIndex();
    loadTechToIndex();
    loadProjectsToIndex();

});
