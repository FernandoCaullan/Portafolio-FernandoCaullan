// =======================
// 📌 CONTACT FORM
// =======================

async function sendContactForm(e) {

    e.preventDefault();

    const form = document.getElementById("contactForm");
    const responseBox = document.getElementById("contactResponse");

    // obtener datos (forma segura)
    const formData = {
        nom_jefe: form.querySelector('[name="nom_jefe"]').value.trim(),
        email: form.querySelector('[name="email"]').value.trim(),
        dato_importa: form.querySelector('[name="dato_importa"]').value.trim(),
        msg_importa: form.querySelector('[name="msg_importa"]').value.trim()
    };

    // validación
    if (
        !formData.nom_jefe ||
        !formData.email ||
        !formData.dato_importa ||
        !formData.msg_importa
    ) {
        responseBox.innerHTML = `
            <div class="text-danger fw-semibold">
                Completa todos los campos
            </div>
        `;
        return;
    }

    try {

        responseBox.innerHTML = `
            <div class="text-muted">
                Enviando mensaje...
            </div>
        `;

        const res = await fetch("api/contacto/POST_contact.php", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(formData)

        });

        const data = await res.json();

        if (data.status === "success") {

            responseBox.innerHTML = `
                <div class="text-success fw-semibold">
                    Mensaje enviado correctamente
                </div>
            `;

            form.reset();

        } else {

            responseBox.innerHTML = `
                <div class="text-danger fw-semibold">
                    ${data.message || "Error al enviar mensaje"}
                </div>
            `;
        }

    } catch (err) {

        console.error("ERROR:", err);

        responseBox.innerHTML = `
            <div class="text-danger fw-semibold">
                Error de conexión
            </div>
        `;
    }
}

// =======================
// 🚀 INIT
// =======================

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", sendContactForm);
    }

});