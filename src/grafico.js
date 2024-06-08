// Definir el tamaño del área visible en el navegador
const viewportWidth = 1390; // Ancho deseado
const viewportHeight = 1500; // Alto deseado

// Crear el SVG con el tamaño del área visible
const svg = d3
  .select("#graph")
  .append("svg")
  .attr("width", viewportWidth)
  .attr("height", viewportHeight);

// Definir la simulación de fuerza
const simulation = d3
  .forceSimulation()
  .force(
    "link",
    d3
      .forceLink()
      .id((d) => d.id)
      .distance(180)
  ) // Ajustar la distancia entre los nodos
  .force("charge", d3.forceManyBody().strength(-240)) // Ajustar la fuerza de repulsión entre los nodos
  .force("center", d3.forceCenter(viewportWidth / 2, viewportHeight / 2));

// Datos de los nodos
const nodes = [
  //Nodos 1
  { id: "q0", label: "q0" },
  { id: "C5", label: "C5" },
  { id: "C7", label: "C7" },
  { id: "C5_", label: "C5" },
  { id: "ERROR", label: "error" },
  //Nodos 2
  { id: "1", label: "q7" },
  { id: "2", label: "C8_1" },
  { id: "3", label: "q6" },
  { id: "4", label: "C8" },
  { id: "5", label: "q14" },
  { id: "6", label: "C8_2" },
  { id: "7", label: "q12" },
  { id: "8", label: "C6_" },
  { id: "9", label: "q10" },
  { id: "10", label: "qo_" },
  { id: "11", label: "C6_1" },
  { id: "12", label: "q0" },
  //Nodos 3
  { id: "20", label: "q0" },
  { id: "21", label: "C0" },
  { id: "23", label: "q1" },
  { id: "24", label: "q3" },
  { id: "25", label: "q2" },
  { id: "26", label: "C2" },
  { id: "27", label: "C1" },
  { id: "28", label: "q4" },
  { id: "29", label: "C3" },
  { id: "30", label: "q8" },
  { id: "31", label: "q5" },
  { id: "32", label: "q9" },
  { id: "33", label: "C4" },
];

// Datos de los enlaces
const links = [
  //Transiciones nodo 1
  { source: "q0", target: "q0", label: "" },
  { source: "q0", target: "C5", label: "a-z,A-Z,-,$" },
  { source: "C5", target: "C5", label: "2" },
  { source: "C5", target: "C7", label: "reservada" },
  { source: "C7", target: "C5", label: "a-z,A-Z,-,$" },
  { source: "C7", target: "C7", label: "" },
  { source: "C7", target: "C5_", label: "a-z,A-Z,-,$" },
  { source: "C7", target: "ERROR", label: "*,-,+,/,%,!,<,>,;,=" },
  { source: "C7", target: "q0", label: "/ ; (" },
  //Transiciones nodo 2
  { source: "12", target: "12", label: "" },
  { source: "12", target: "1", label: "*" },
  { source: "12", target: "2", label: "< >" },
  { source: "12", target: "3", label: "!" },
  { source: "12", target: "4", label: "=" },
  { source: "12", target: "5", label: "%" },
  { source: "2", target: "6", label: "=" },
  { source: "3", target: "6", label: "=" },
  { source: "4", target: "6", label: "=" },
  { source: "12", target: "7", label: "/" },
  { source: "7", target: "11", label: "*" },
  { source: "7", target: "8", label: "/" },
  { source: "8", target: "10", label: "|n " },
  { source: "11", target: "9", label: "*" },
  { source: "9", target: "10", label: "/" },
  { source: "11", target: "11", label: "otro" },
  { source: "9", target: "8", label: "otro" },
  { source: "9", target: "9", label: "*" },

  //Transiciones nodo 3
  { source: "20", target: "21", label: "1-9" }, // q0 a C0
  { source: "20", target: "23", label: "+ -" }, // q0 a q1
  { source: "20", target: "24", label: "0" }, // q0 a q3
  { source: "23", target: "21", label: "1-9" }, // q1 a C0
  { source: "23", target: "24", label: "0" }, // q1 a q3
  { source: "21", target: "21", label: "0-9" }, // C0 a C0
  { source: "24", target: "26", label: "." }, // q3 a C2
  { source: "24", target: "28", label: "x X" }, // q3 a q4
  { source: "28", target: "27", label: "0-f" }, // q4 a C1
  { source: "26", target: "26", label: "0-7" }, // C2 a C2
  { source: "24", target: "25", label: "0-7" }, // q3 a q2
  { source: "25", target: "29", label: "0-9" }, // q2 a C3
  { source: "29", target: "30", label: "e E" }, // C3 a q8
  { source: "30", target: "31", label: "+ -" }, // q8 a q5
  { source: "30", target: "32", label: "0-9" }, // q8 a q9
  { source: "32", target: "33", label: "0-9" }, // q9 a C4
  { source: "31", target: "32", label: "0-9" }, // q9 a C4

  { source: "29", target: "29", label: "0-9" }, // q9 a C4
  { source: "27", target: "27", label: "0-f" }, // q9 a C4
  { source: "20", target: "20", label: `, b ; (){}[]"' ` }, // q9 a C4
  { source: "26", target: "26", label: "0-7" }, // q9 a C4
];
// Definir la flecha
svg
  .append("defs")
  .append("marker")
  .attr("id", "arrow")
  .attr("viewBox", "0 0 10 10")
  .attr("refX", 25)
  .attr("refY", 5)
  .attr("markerWidth", 6) // Ajustar el ancho de la flecha
  .attr("markerHeight", 6) // Ajustar la altura de la flecha
  .attr("orient", "auto-start-reverse")
  .append("path")
  .attr("d", "M 0 0 L 10 5 L 0 10 z")
  .attr("fill", "red"); // Cambiar el color de la flecha

// Crear los enlaces
const link = svg
  .append("g")
  .attr("class", "links")
  .selectAll("line")
  .data(links)
  .enter()
  .append("line")
  .attr("class", "link")
  .attr("marker-end", "url(#arrow)")
  .style("opacity", 1)
  .style("stroke", "red"); // Cambiar el color de los enlaces a negro
// Crear las etiquetas de los enlaces
const linkLabels = svg
  .append("g")
  .attr("class", "link-labels")
  .selectAll("text")
  .data(links)
  .enter()
  .append("text")
  .attr("class", "link-label")
  .text((d) => d.label)
  .style("fill", "black"); // Cambiar el color del texto de las etiquetas de los enlaces a negro
// Crear los nodos
const node = svg
  .append("g")
  .attr("class", "nodes")
  .selectAll("g")
  .data(nodes)
  .enter()
  .append("g")
  .call(
    d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended)
  );

// Añadir círculos a los nodos
node
  .append("circle")
  .attr("r", 25) // Aumentar el tamaño de los nodos
  .attr("class", "node");

// Añadir etiquetas a los nodos
node
  .append("text")
  .attr("dy", 5) // Ajustar la posición vertical del texto dentro del nodo
  .attr("text-anchor", "middle") // Alinear el texto al centro horizontalmente
  .text((d) => d.label);

// Estilizar nodos específicos
const specificNodes = ["q0", "20", "12"];
// Estilizar enlaces específicos
const specificLinks = [];
// Estilizar etiquetas de enlaces específicos
const specificLinkLabels = [];

// Select the node with id 0
const specificNode = d3
  .select("g.nodes")
  .selectAll("g")
  .filter((d) => d.id === 0);

// Apply styles to the selected node
specificNode
  .select("circle")
  .style("fill", "red") // Change the background color of the circle
  .style("stroke-width", 15) // Adjust the border width of the circle
  .style("stroke-opacity", 1) // Adjust the opacity of the border
  .attr("r", 40); // Increase the size of the circle

specificNodes.forEach((id) => {
  const specificNode = d3
    .select("g.nodes")
    .selectAll("g")
    .filter((d) => d.id === id);
  specificNode
    .select("circle")
    .style("fill", "#ff98e5") // Cambiar el color de fondo del círculo
    .style("stroke-width", 50) // Ajustar el ancho del borde del círculo
    .style("stroke", "red") // Cambiar el color del borde del círculo
    .style("stroke-opacity", 0.7) // Ajustar la opacidad del borde
    .attr("r", 22); // Aumentar el tamaño del círculo
});

specificLinks.forEach((id) => {
  const specificLink = d3
    .select("g.links")
    .selectAll("line")
    .filter((d) => d.id === id);
  specificLink
    .style(
      "transform",
      "translate(" + (id === 0 ? "10px, 10px" : "-10px, -10px") + ")"
    )
    .style("stroke", id === 0 ? "white" : "yellow");
});

specificLinkLabels.forEach((id) => {
  const specificLinkLabel = d3
    .select("g.link-labels")
    .selectAll("text")
    .filter((d) => d.id === id);
  specificLinkLabel.style("fill", id === 0 ? "white" : "yellow");
});

// Actualizar la simulación
simulation.nodes(nodes).on("tick", ticked);
simulation.force("link").links(links);

// Función para actualizar la posición de los elementos
function ticked() {
  link
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);

  linkLabels
    .attr("x", (d) => {
      if (d.source === d.target) {
        return d.source.x + 15; // Ajusta la posición del texto para enlaces que van de un nodo a sí mismo
      } else {
        const dx = d.target.x - d.source.x;
        const length = Math.sqrt(dx * dx);
        const offsetX = (dx / length) * 20; // Offset para centrar el texto
        return (d.source.x + d.target.x) / 2 + offsetX;
      }
    })
    .attr("y", (d) => {
      if (d.source === d.target) {
        return d.source.y - 15; // Ajusta la posición del texto para enlaces que van de un nodo a sí mismo
      } else {
        const dy = d.target.y - d.source.y;
        const length = Math.sqrt(dy * dy);
        const offsetY = (dy / length) * 20; // Offset para centrar el texto
        return (d.source.y + d.target.y) / 2 + offsetY;
      }
    });

  node.attr("transform", (d) => `translate(${d.x},${d.y})`); // Mover tanto el círculo como el texto dentro del nodo
}

// Función para iniciar el arrastre de nodos
function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

// Función para arrastrar nodos
function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

// Función para finalizar el arrastre de nodos
function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
