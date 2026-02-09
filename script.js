/* NAVEGACIÓN */
function mostrarSeccion(id) {
    document.querySelectorAll('.pantalla').forEach(p => {
        p.classList.remove('activa');
    });
    document.getElementById(id).classList.add('activa');
}

/* MÚSICA */
let sonando = false;
function toggleMusica() {
    const musica = document.getElementById("musica");
    if (!sonando) {
        musica.play();
    } else {
        musica.pause();
    }
    sonando = !sonando;
}

/* POEMA CON ESCRITURA */
const poema = [
    "Desde que llegaste a mi vida,",
    "todo tiene más sentido.",
    "Tu sonrisa ilumina mis días",
    "y tu amor mi camino 💖",
    "Podrá nublarse el sol eternamente;",
    "Podrá secarse en un instante el mar;",
    "Podrá romperse el eje de la tierra",
    "Como un débil cristal.",
    "",
    "¡Todo sucederá! Podrá la muerte",
    "Cubrirme con su fúnebre crespón;",
    "Pero jamás en mí podrá apagarse",
    "La llama de tu amor. 💖"
];

let linea = 0;
let letra = 0;

function escribirPoema() {
    if (linea < poema.length) {
        const contenedor = document.getElementById("texto-poema");
        if (letra < poema[linea].length) {
            contenedor.innerHTML += poema[linea].charAt(letra);
            letra++;
            setTimeout(escribirPoema, 50);
        } else {
            contenedor.innerHTML += "<br>";
            letra = 0;
            linea++;
            setTimeout(escribirPoema, 900);
        }
    }
}

escribirPoema();

/* LISTA */
function mostrarTexto(elemento, mensaje) {
    elemento.style.color = "#ff4f7a";
    abrirModal(mensaje);
}


/* BOTÓN NO TRAVIESO */
const noBtn = document.getElementById("no");

if (noBtn) {
    noBtn.addEventListener("mouseenter", () => {
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;

        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        noBtn.style.position = "fixed";
        noBtn.style.left = x + "px";
        noBtn.style.top = y + "px";
    });
}


/* QUIZ */
const preguntas = [
    {
        texto: "¿Qué fue lo más random de nuestra primera cita?",
        opciones: [
            {
                texto: "🎮 Los juegos",
                correcta: false,
                mensaje: "😂 Fue random, pero no TANTO"
            },
            {
                texto: "🪜 Escalera Your Name de Temu",
                correcta: true,
                mensaje: "💖 SÍIII, jamás olvidaré eso JAJA"
            },
            {
                texto: "😳 Nos encontró tu familia",
                correcta: false,
                mensaje: "😆 Eso sí hubiera sido nivel trauma"
            }
        ]
    },
    {
        texto: "¿Con qué necesitas ayuda?",
        opciones: [
            {
                texto: "📚 Con la beca",
                correcta: false,
                mensaje: "🥹 Obvio te ayudo, pero no era esa"
            },
            {
                texto: "📐 Con matemáticas",
                correcta: false,
                mensaje: "😅 También… pero no exactamente"
            },
            {
                texto: "💋 Con mi sed de besos",
                correcta: true,
                mensaje: "💘 JAJAJA esa siempre"
            }
        ]
    },
    {
        texto: "¿Cuál de estas es más vergonzoso?",
        opciones: [
            {
                texto: "😳 Solo quiero ser honesta",
                correcta: true,
                mensaje: "💖 Amo tu honestidad, incluso así"
            },
            {
                texto: "🚽 No aguantaba, me orinaba",
                correcta: false,
                mensaje: "😂 NOOOO JAJAJA"
            },
            {
                texto: "🍽️ Colatón ¿ya comiste?",
                correcta: false,
                mensaje: "😆 Icónico, pero no"
            }
        ]
    }
];

let indice = 0;
let respondida = false;

function cargarPregunta() {
    respondida = false;

    const p = preguntas[indice];
    document.getElementById("preguntaTexto").innerHTML = p.texto;

    const opcionesDiv = document.getElementById("opciones");
    opcionesDiv.innerHTML = "";

    document.getElementById("resultadoQuiz").innerHTML = "";

    p.opciones.forEach(op => {
        const btn = document.createElement("button");
        btn.innerHTML = op.texto;
        btn.onclick = () => responder(op.correcta, btn, op.mensaje);
        opcionesDiv.appendChild(btn);
    });
}



function responder(correcta, boton, mensaje) {
    if (respondida) return;
    respondida = true;

    const pop = document.getElementById("pop");
    pop.currentTime = 0;
    pop.play();

    boton.classList.add("shake");
    setTimeout(() => boton.classList.remove("shake"), 400);

    const r = document.getElementById("resultadoQuiz");
    r.innerHTML = mensaje;

    if (correcta) {
        for (let i = 0; i < 12; i++) lanzarEmoji("💖");
    } else {
        for (let i = 0; i < 6; i++) lanzarEmoji("😂");
    }
}



function siguientePregunta() {
    if (!respondida) return;

    indice++;

    if (indice < preguntas.length) {
        cargarPregunta();
    } else {
        mostrarSeccion("juego-corazon");
    }
}

/* ⚠️ IMPORTANTE */
document.addEventListener("DOMContentLoaded", cargarPregunta);

/* JUEGO CORAZÓN */
function corazon(div) {
    const pop = document.getElementById("pop");
    pop.play();

    if (div.innerHTML === "💖") {
        document.getElementById("mensajeCorazon").innerText =
            "Ahí estaba… porque siempre es tuyo 💖";
    } else {
        document.getElementById("mensajeCorazon").innerText =
            "Intenta otra vez 😅";
    }
}

/* EFECTOS ROMÁNTICOS */
setInterval(() => {
    const c = document.createElement("div");
    c.className = "corazon";
    c.innerText = Math.random() > 0.5 ? "💖" : "✨";
    c.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(c);

    setTimeout(() => c.remove(), 6000);
}, 700);

function abrirModal(mensaje) {
    const modal = document.getElementById("modal-romantico");
    const contenido = modal.querySelector(".modal-contenido");

    document.getElementById("mensajeModal").innerText = mensaje;

    modal.classList.remove("oculto");
    contenido.classList.add("temblar", "brillo");

    lanzarCorazones();

    setTimeout(() => {
        contenido.classList.remove("temblar");
    }, 400);
}
function cerrarModal() {
    document.getElementById("modal-romantico").classList.add("oculto");
}

function lanzarCorazones() {
    for (let i = 0; i < 8; i++) {
        const corazon = document.createElement("div");
        corazon.innerHTML = "💖";
        corazon.style.position = "fixed";
        corazon.style.left = Math.random() * 100 + "%";
        corazon.style.top = "80%";
        corazon.style.fontSize = "24px";
        corazon.style.animation = "flotar 2s ease-out forwards";
        document.body.appendChild(corazon);

        setTimeout(() => corazon.remove(), 2000);
    }
}

/* MENSAJE DESPUÉS DEL SÍ */
const siBtn = document.getElementById("si");
const mensajeFinal = document.getElementById("mensajeFinal");
const continuarBtn = document.getElementById("continuarQuiz");

if (siBtn) {
    siBtn.addEventListener("click", () => {
        mensajeFinal.classList.remove("oculto");
        lanzarCorazones();

        // bloquear botones
        siBtn.disabled = true;
        if (noBtn) noBtn.disabled = true;
    });
}

if (continuarBtn) {
    continuarBtn.addEventListener("click", () => {
        mensajeFinal.classList.add("oculto");
        mostrarSeccion("quiz");
    });
}

function lanzarEmoji(tipo) {
    const emoji = document.createElement("div");
    emoji.className = "emoji-float";
    emoji.innerHTML = tipo;
    emoji.style.left = Math.random() * 90 + "%";
    emoji.style.top = "70%";
    document.body.appendChild(emoji);

    setTimeout(() => emoji.remove(), 1500);
}


