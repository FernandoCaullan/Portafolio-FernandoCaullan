
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
        <div class="text-center py-4">

            <img src="${bio.img_bio}"
                 class="rounded-circle shadow mb-4"
                 style="width:160px;height:160px;object-fit:cover;">

            <h3 class="fw-bold text-warning-emphasis">
                ${escapeHTML(bio.nom_bio)}
            </h3>

            <p class="lead text-secondary mb-3">
                ${escapeHTML(bio.mini_bio)}
            </p>

            <div class="mx-auto" style="max-width:650px;">
                <p class="text-muted lh-lg">
                    ${escapeHTML(bio.detalle_bio)}
                </p>
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

    const data = await fetchJSON("api/trabajos/GET_projects.php");

    if (!data || data.status !== "success") {
        container.innerHTML = `<p class="text-center text-muted">Sin proyectos</p>`;
        return;
    }

    container.innerHTML = `
        <div class="row mt-4 g-4">

            ${data.data.map(p => `

                <div class="col-md-6">

                    <div class="card shadow-sm h-100">

                        <img src="${p.img_prev}" class="card-img-top">

                        <div class="card-body">

                            <h5 class="fw-bold">
                                ${escapeHTML(p.titulo)}
                            </h5>

                            <p class="text-muted">
                                ${escapeHTML(p.descripcion)}
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
// 🚀 INIT
// =======================

document.addEventListener("DOMContentLoaded", () => {

    loadBioToIndex();
    loadSkillsToIndex();
    loadTechToIndex();
    loadProjectsToIndex();

});