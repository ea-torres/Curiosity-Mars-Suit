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
const M=[{b:20,d:340,n:"Base Camp",k:"w"},{b:-38,d:85,n:"Ice Crystal Sample",k:"s"},{b:78,d:150,n:"28° Slope",k:"h"},{b:140,d:420,n:"CURIOSITY-1 Rover",k:"w"}];

// ---- SIGNOS VITALES BASE ----
// fc pulso, pa presión, glu glucosa, fat fatiga, hid hidratación
const base={fc:72,pa:"118/76",glu:92,fat:18,hid:88};

// ---- ESCENARIOS DE SALUD ----
// l: nivel ("", "warn", "crit"); v: valores; f: cuáles se marcan (w ámbar, c rojo)
// t: título; m: mensaje; a: acciones [texto, tipo] con tipo top (parche), inj (inyección), non (otra), holo (guía)
const S={
nominal:{l:"",v:base,f:{},t:"Stable stats",m:"No deviations. Spontaneous monitoring of breath, sweat, and neurochemical status.",a:[]},
fatiga:{l:"warn",v:{...base,fc:96,fat:71,hid:70},f:{fat:"w",hid:"w"},t:"  Accumulated Fatigue",m:"High lactate in sweat and increasing cortisol. Possible electrolyte or B12 complex defficiency.",a:[["Topical patch: cB complex and magnesium","top"],["B12 injection","inj"],["15 minute rest","non"]]},
  glucosa:{l:"warn",v:{...base,fc:88,glu:58,fat:55},f:{glu:"c",fat:"w"},t:"Low blood sugar",m:"Possible minor hypoglycemia",a:[["Glucose gel through helmet's breather","non"],["topic patch with electrolytes","top"]]},
presion:{l:"warn",v:{...base,fc:104,pa:"152/96",fat:40},f:{pa:"c",fc:"w"},t:"High blood pressure",m:"Sustained rising cardiac rhythm. Lower physical activity and check hydration.",a:[["Guided Breathing 4-6","non"],["Topic patch: magnesium and potassium","top"],["Micronutrient Injection (Confirmation Needes)","inj"]]},
herida:{l:"crit",v:{...base,fc:118,pa:"140/90",fat:45},f:{fc:"c",pa:"w"},t:"Wound on right hand",m:"Camera and pressure sensor detect rupture with local pressure loss. Priorize sealing.",a:[["Open holographic guide","holo"]]}
};

// ---- ETIQUETAS DE LOS SIGNOS VITALES [nombre, unidad, sensor] ----
const L={fc:["Pulse","lpm","suit"],pa:["Pressure","mmHg","optic"],glu:["Glucose","mg/dL","sweat"],fat:["Fatigue","/100","neuro"],hid:["Hydration","%","sweat"]};

// ---- PASOS DE LA GUÍA HOLOGRÁFICA DE LA HERIDA [título, texto] ----
const HS=[["Stop the bleeding","Press with your free hand over the red area of the hologram."],["Seal the rip","Place the forearm's patch, covering 2 extra cm from the edge."],["Verify blood pressure","The visor confirms when the glove's local pressure is stabilized."],["Return to Base","Return route marked on HoloConnect Visor. Notification sent to Mission Control."]];

// ---- DIBUJOS SVG DE CADA PASO (coordenadas del guante, viewBox 200x190) ----
const HG=[`<circle class="pulse" cx="104" cy="125" r="22" fill="none" stroke="#ff5a5a" stroke-width="3"/>`,`<rect class="pulse" x="86" y="108" width="40" height="34" rx="4" fill="rgba(95,227,208,.3)" stroke="#5fe3d0" stroke-width="2"/>`,`<path d="M70 70a34 34 0 0 1 60 0" fill="none" stroke="#ffb347" stroke-width="3"/><circle class="pulse" cx="100" cy="42" r="4" fill="#ffb347"/>`,`<path class="pulse" d="M100 175v-25m-10 10l10 12 10-12" fill="none" stroke="#5fe3d0" stroke-width="3" stroke-linecap="round"/>`];
