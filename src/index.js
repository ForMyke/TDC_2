import animacion from "./animacion.js";

window.addEventListener("load", async () => {
  await animacion(document.querySelector(".animacion"));
  animacion(document.querySelector(".integrantes"));
});
