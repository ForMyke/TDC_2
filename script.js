class AnalizadorLexico {
  constructor(archivo) {
    this.archivo = archivo;
    this.lineasConError = [];
    this.palabrasReservadas = [
      "abstract",
      "assert",
      "boolean",
      "break",
      "byte",
      "case",
      "catch",
      "char",
      "class",
      "const",
      "continue",
      "default",
      "do",
      "double",
      "else",
      "enum",
      "extends",
      "final",
      "finally",
      "float",
      "for",
      "goto",
      "if",
      "implements",
      "import",
      "instanceof",
      "int",
      "interface",
      "long",
      "native",
      "new",
      "package",
      "private",
      "protected",
      "public",
      "return",
      "short",
      "static",
      "strictfp",
      "super",
      "switch",
      "synchronized",
      "this",
      "throw",
      "throws",
      "transient",
      "try",
      "void",
      "volatile",
      "while",
    ];
  }

  async analisisLexico() {
    const data = await this.archivo.text();
    let estado = "q0";
    let palabra = "";
    let esEntero = false;
    let linea = 1;
    let inicioComentarioLinea = null;

    const isLetter = (char) =>
      (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
    const isDigit = (char) => char >= "0" && char <= "9";
    const isWhitespace = (char) => [" ", "\r", "\n", "\t"].includes(char);
    const isSeparator = (char) =>
      [",", ";", "(", ")", "[", "]", "{", "}"].includes(char);
    const isComillas = (char) => ["'", '"'].includes(char);

    for (let i = 0; i < data.length; i++) {
      let char = data[i];
      if (estado === "q0") {
        palabra = "";
        if (char === "+" || char === "-") {
          estado = "q1";
        } else if (char >= "1" && char <= "9") {
          esEntero = true;
          estado = "C0";
        } else if (char === "0") {
          esEntero = true;
          estado = "q3";
        } else if (char === "=") {
          if (esEntero) {
            estado = "error";
          } else {
            estado = "C8";
          }
        } else if (char === "<" || char === ">") {
          estado = "C8_1";
        } else if (char === "!") {
          estado = "q6";
        } else if (char === "/") {
          estado = "q12";
        } else if (char === "*") {
          estado = "q7";
        } else if (isLetter(char) || char === "_" || char === "$") {
          palabra += char;
          estado = "C5";
        } else if (char === "%") {
          if (esEntero) {
            estado = "error";
          } else {
            estado = "q14";
          }
        } else if (
          isSeparator(char) ||
          isWhitespace(char) ||
          isComillas(char)
        ) {
          estado = "q0";
        } else {
          estado = "error";
        }
      } else if (estado === "q1") {
        if (isWhitespace(char)) {
          estado = "q0";
        } else if (char === "0") {
          estado = "q3";
        } else if (char >= "1" && char <= "9") {
          estado = "C0";
        } else if (char === "+" || char === "-") {
          estado = "q11";
        } else {
          estado = "error";
        }
      } else if (estado === "q2") {
        if (isDigit(char)) {
          estado = "C3";
        } else {
          estado = "error";
        }
      } else if (estado === "q3") {
        if (char === "," || char === ";" || isWhitespace(char)) {
          estado = "q0";
        } else if (char >= "0" && char <= "7") {
          estado = "C2";
        } else if (char === "x" || char === "X") {
          estado = "q4";
        } else if (char === ".") {
          estado = "q2";
        } else {
          estado = "error";
        }
      } else if (estado === "q4") {
        if (
          isDigit(char) ||
          (char >= "A" && char <= "F") ||
          (char >= "a" && char <= "f")
        ) {
          estado = "C1";
        } else {
          estado = "error";
        }
      } else if (estado === "q5") {
        if (isDigit(char)) {
          estado = "q9";
        } else {
          estado = "error";
        }
      } else if (estado === "q6") {
        if (char === "=") {
          estado = "C8_2";
        } else {
          estado = "error";
        }
      } else if (estado === "q7") {
        if (isWhitespace(char)) {
          estado = "q0";
        } else {
          estado = "error";
        }
      } else if (estado === "q8") {
        if (char === "+" || char === "-") {
          estado = "q5";
        } else if (isDigit(char)) {
          estado = "q9";
        } else {
          estado = "error";
        }
      } else if (estado === "q9") {
        if (isDigit(char)) {
          estado = "C4";
        } else {
          estado = "error";
        }
      } else if (estado === "q10") {
        if (char === "/") {
          estado = "q0";
        } else if (char === "*") {
          estado = "q10";
        } else if (char !== "/") {
          if (!this.lineasConError.includes(inicioComentarioLinea)) {
            this.lineasConError.push(inicioComentarioLinea);
            break;
          }
        } else {
          estado = "C6_1";
        }
      } else if (estado === "q11") {
        if (char === "," || char === ";" || isWhitespace(char)) {
          estado = "q0";
        } else {
          estado = "error";
        }
      } else if (estado === "q12") {
        if (isWhitespace(char)) {
          estado = "q0";
        } else if (char === "/") {
          estado = "C6";
        } else if (char === "*") {
          inicioComentarioLinea = linea;
          estado = "C6_1";
        } else {
          estado = "error";
        }
      } else if (estado === "q14") {
        if (isWhitespace(char)) {
          estado = "q0";
        } else {
          estado = "error";
        }
      } else if (estado === "C0") {
        if (
          char === "," ||
          char === ";" ||
          isWhitespace(char) ||
          char === ")"
        ) {
          esEntero = true;
          estado = "q0";
        } else if (char === ".") {
          estado = "q2";
        } else if (isDigit(char)) {
          estado = "C0";
        } else {
          estado = "error";
        }
      } else if (estado === "C1") {
        if (
          char === "," ||
          char === ";" ||
          isWhitespace(char) ||
          char === ")"
        ) {
          esEntero = true;
          estado = "q0";
        } else if (
          isDigit(char) ||
          (char >= "A" && char <= "F") ||
          (char >= "a" && char <= "f")
        ) {
          estado = "C1";
        } else {
          estado = "error";
        }
      } else if (estado === "C2") {
        if (
          char === "," ||
          char === ";" ||
          isWhitespace(char) ||
          char === ")"
        ) {
          esEntero = true;
          estado = "q0";
        } else if (char >= "0" && char <= "7") {
          estado = "C2";
        } else {
          estado = "error";
        }
      } else if (estado === "C3") {
        if (
          char === "," ||
          char === ";" ||
          isWhitespace(char) ||
          char === ")"
        ) {
          esEntero = true;
          estado = "q0";
        } else if (char === "E" || char === "e") {
          estado = "q8";
        } else if (isDigit(char)) {
          estado = "C3";
        } else {
          estado = "error";
        }
      } else if (estado === "C4") {
        if (
          char === "," ||
          char === ";" ||
          isWhitespace(char) ||
          char === ")"
        ) {
          esEntero = true;
          estado = "q0";
        } else {
          estado = "error";
        }
      } else if (estado === "C5") {
        if (isLetter(char) || isDigit(char) || char === "_" || char === "$") {
          palabra += char;
          estado = "C5";
        } else if (
          [",", " ", ";", "(", ")", "[", "]", ".", "'", '"'].includes(char)
        ) {
          if (this.palabrasReservadas.includes(palabra)) {
            estado = "C7";
            palabra = "";
          } else {
            palabra = "";
            estado = "q0";
          }
        } else {
          estado = "error";
        }
      } else if (estado === "C6") {
        if (char === ";" || char === "\r" || char === "\n" || char === "\t") {
          estado = "q0";
        } else {
          estado = "C6";
        }
      } else if (estado === "C6_1") {
        if (char === "*") {
          estado = "q10";
        } else {
          estado = "C6_1";
        }
      } else if (estado === "C7") {
        if (char === " ") {
          estado = "C7";
        } else if (
          ["*", "+", "-", "/", "%", "!", "<", ">", "=", ","].includes(char)
        ) {
          estado = "error";
        } else if ([",", ";", "("].includes(char)) {
          estado = "q0";
        } else if (
          ("a" <= char && char <= "z") ||
          ("A" <= char && char <= "Z") ||
          char === "_" ||
          char === "$"
        ) {
          palabra += char;
          estado = "C5";
        }
      } else if (estado === "C8") {
        if (char === "=") {
          estado = "C8_2";
        } else if (isWhitespace(char)) {
          estado = "q0";
        } else {
          estado = "error";
        }
      } else if (estado === "C8_1") {
        if (char === "=") {
          estado = "C8_2";
        } else if (isWhitespace(char)) {
          estado = "q0";
        } else {
          estado = "error";
        }
      } else if (estado === "C8_2") {
        if (isWhitespace(char)) {
          estado = "q0";
        } else {
          estado = "error";
        }
      }
      if (estado === "error") {
        if (!this.lineasConError.includes(linea)) {
          this.lineasConError.push(linea);
        }
        estado = "q0";
      }
      if (char === "\n") {
        linea += 1;
      }
      esEntero = false;
    }

    const resultados = document.getElementById("resultados");
    resultados.innerHTML = "";
    if (this.lineasConError.length === 0) {
      resultados.innerHTML = `<p>No hay errores de análisis léxico en el archivo.</p>`;
    } else {
      for (let linea of this.lineasConError) {
        resultados.innerHTML += `<p>Error en línea ${linea}.</p>`;
      }
    }
  }
}

function iniciarAnalisis() {
  const archivoInput = document.getElementById("archivo");
  const archivo = archivoInput.files[0];
  if (archivo) {
    const analizador = new AnalizadorLexico(archivo);
    analizador.analisisLexico();
  } else {
    alert("Por favor, selecciona un archivo.");
  }
}
