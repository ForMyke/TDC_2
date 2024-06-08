document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalAgregarMenu");
    const agregarMenuBtn = document.getElementById("agregarMenu");
    const eliminarMenuBtn = document.getElementById("eliminarMenu");
    const closeModalBtn = document.querySelector(".close");
    const menuElement = document.getElementById("inicio");
    const agregarMenuForm = document.getElementById("agregarMenuForm");
    const generarPdfBtn = document.getElementById("generarPdf");

    generarPdfBtn.addEventListener("click", generarPDF);
    function generarPDF() {
        const doc = new jsPDF();

        // Obtenemos el contenido del menú y lo agregamos al PDF
        const contenidoMenu = menuElement.innerHTML;
        doc.text(contenidoMenu, 10, 10);

        // Guardamos el PDF con un nombre específico
        doc.save("menu.pdf");
    }
    agregarMenuBtn.addEventListener("click", function () {
        modal.style.display = "block";
        agregarMenuForm.style.display = "block";
    });

    eliminarMenuBtn.addEventListener("click", function () {
        if (confirm("¿Estás seguro de que deseas eliminar el menú actual?")) {
            menuElement.innerHTML = "";
        }
    });

    closeModalBtn.addEventListener("click", function () {
        modal.style.display = "none";
        agregarMenuForm.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
              agregarMenuForm.style.display = "none";
        }
    });

    agregarMenuForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitamos el comportamiento por defecto del formulario

        const alimentosInput = document.getElementById("alimentos");
        const nuevosAlimentos = alimentosInput.value;

        if (nuevosAlimentos.trim() !== "") {
            // Creamos un nuevo elemento de lista (<li>) para el nuevo menú
            const nuevoMenu = document.createElement("li");
            nuevoMenu.textContent = nuevosAlimentos;

            // Agregamos el nuevo menú a la lista del menú principal
            menuElement.appendChild(nuevoMenu);

            // Cerramos la ventana modal
            modal.style.display = "none";

            // Limpiamos el campo de texto para los alimentos
            alimentosInput.value = "";

        }
    });
});
