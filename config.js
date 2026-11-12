// ============================================================
// CONFIG.JS · Aquí editas los datos de ARES-EVA sin tocar la lógica.
// Guarda el archivo y recarga la página para ver los cambios.
// ============================================================

// ---- PAISAJE (gráficos) ----
// heading: hacia dónde mira el astronauta al abrir (0-359 grados)
// sun: dirección del sol; rocks: cantidad de rocas
// sky: 3 colores del cielo (arriba, medio, horizonte)
// ridges: montañas [color, altura, frecuencia, paralaje, semilla, desplazamiento vertical]
// ground: colores del suelo (cerca del horizonte, cerca de ti); rock: color de sombra y de luz
const SCENE={heading:15,sun:40,rocks:70,
  sky:["#76574d","#c68d68","#ecbf8f"],
  ridges:[["#bd8260",.09,.06,1,1,0],["#a2603f",.06,.14,1.6,4,.01],["#8a4a2f",.035,.3,2.4,9,.04]],
  ground:["#b3643a","#5a2917"],
  rock:["#3f1d11","#7a3f26"]};

// ---- MARCADORES DE REALIDAD AUMENTADA ----
// b: dirección en grados (0=Norte, 90=Este, 180=Sur, 270=Oeste; acepta negativos)
// d: distancia en metros; n: texto; k: color ("w" turquesa, "s" ámbar, "h" rojo)
const M=[{b:20,d:340,n:"Base Camp",k:"w"},{b:-38,d:85,n:"Ice Crystal Sample",k:"s"},{b:78,d:150,n:"28° Slope",k:"h"},{b:140,d:420,n:"CURIOSOTY-1 Rover",k:"w"}];

// ---- SIGNOS VITALES BASE ----
// fc pulso, pa presión, glu glucosa, fat fatiga, hid hidratación
const base={fc:72,pa:"118/76",glu:92,fat:18,hid:88};

// ---- ESCENARIOS DE SALUD ----
// l: nivel ("", "warn", "crit"); v: valores; f: cuáles se marcan (w ámbar, c rojo)
// t: título; m: mensaje; a: acciones [texto, tipo] con tipo top (parche), inj (inyección), non (otra), holo (guía)
const S={
nominal:{l:"",v:base,f:{},t:"Stable stats",m:"No deviations. Spontaneous monitoring og breath, sweat, and neurochemical status.",a:[]},
fatiga:{l:"warn",v:{...base,fc:96,fat:71,hid:70},f:{fat:"w",hid:"w"},t:"  Accumulated Fatigue",m:"High lactato in sweat and increasing cortisol. Possible electrolyte or B12 complex defficiency.",a:[["Topical patch: cB complex and magnesium","top"],["B12 injection","inj"],["15 minute rest","non"]]},
glucosa:{l:"warn",v:{...base,fc:88,glu:58,fat:55},f:{glu:"c",fat:"w"},t:"Azúcar baja en sangre",m:"La acetona en el aliento y la glucosa en sudor coinciden: posible hipoglucemia leve.",a:[["Gel de glucosa por puerto del casco","non"],["Parche tópico de electrolitos","top"]]},
presion:{l:"warn",v:{...base,fc:104,pa:"152/96",fat:40},f:{pa:"c",fc:"w"},t:"Presión arterial elevada",m:"Tendencia sostenida al alza con ritmo cardiaco alto. Baja el esfuerzo y revisa la hidratación.",a:[["Respiración guiada 4-6","non"],["Parche tópico: magnesio y potasio","top"],["Inyección de micronutrientes (doble confirmación)","inj"]]},
herida:{l:"crit",v:{...base,fc:118,pa:"140/90",fat:45},f:{fc:"c",pa:"w"},t:"Herida en el guante derecho",m:"Cámara y sensor de presión detectan rotura con pérdida de presión local. Prioriza el sellado.",a:[["Abrir guía holográfica","holo"]]}
};

// ---- ETIQUETAS DE LOS SIGNOS VITALES [nombre, unidad, sensor] ----
const L={fc:["Pulso","lpm","traje"],pa:["Presión","mmHg","óptico"],glu:["Glucosa","mg/dL","sudor"],fat:["Fatiga","/100","neuro"],hid:["Hidratación","%","sudor"]};

// ---- PASOS DE LA GUÍA HOLOGRÁFICA DE LA HERIDA [título, texto] ----
const HS=[["Detén el sangrado","Presiona con la mano libre sobre la marca roja del holograma."],["Sella la rotura","Coloca el parche del kit del antebrazo, cubriendo 2 cm más allá del borde."],["Verifica la presión","El visor confirma cuando la presión local del guante se estabiliza."],["Regresa al hábitat","Ruta de retorno marcada en el visor. Control de Misión ya fue avisado."]];

// ---- DIBUJOS SVG DE CADA PASO (coordenadas del guante, viewBox 200x190) ----
const HG=[`<circle class="pulse" cx="104" cy="125" r="22" fill="none" stroke="#ff5a5a" stroke-width="3"/>`,`<rect class="pulse" x="86" y="108" width="40" height="34" rx="4" fill="rgba(95,227,208,.3)" stroke="#5fe3d0" stroke-width="2"/>`,`<path d="M70 70a34 34 0 0 1 60 0" fill="none" stroke="#ffb347" stroke-width="3"/><circle class="pulse" cx="100" cy="42" r="4" fill="#ffb347"/>`,`<path class="pulse" d="M100 175v-25m-10 10l10 12 10-12" fill="none" stroke="#5fe3d0" stroke-width="3" stroke-linecap="round"/>`];
