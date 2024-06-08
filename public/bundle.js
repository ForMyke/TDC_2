(function () {
  'use strict';

  const animacion = (elemento) => {
    const numeroLetras = elemento.dataset.texto.length;
    //Animacion para el cursor
    for (let i = 0; i < numeroLetras; i++) {
      setTimeout(() => {
        const letra = document.createElement("span");
        letra.append(elemento.dataset.texto[i]);
        elemento.append(letra);
      }, 100 * i);
    }

    
    //Retorno de la promesa para saber que la animacion termina
    return new Promise((resolve) => {
      //Ingreso del retorno de la promesa
      setTimeout(resolve, numeroLetras * 100);
    });
  };

  window.addEventListener("load", async () => {
    await animacion(document.querySelector(".animacion"));
    animacion(document.querySelector(".integrantes"));
  });

})();
