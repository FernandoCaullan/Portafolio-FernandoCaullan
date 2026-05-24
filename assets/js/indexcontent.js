async function loadBioToIndex() {

    const res = await fetch("api/biografia/GET_bio.php");
    const data = await res.json();

    const container = document.getElementById("bio-section");

    if (data.status === "empty") {
        container.innerHTML += `
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
document.addEventListener("DOMContentLoaded", loadBioToIndex);