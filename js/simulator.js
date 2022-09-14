console.log("Simulador Coderhouse");
console.log("Adivinar el numero secreto");

var NumeroAdivinar = 1;
var numeroIngresado = 0;
var chances = 0;
let arrintentos = []; //Declaro el array donde almacenar los intentos
let Configuration = [];
var MINI = 0;
var MAXI = 0;
var INTENTI = 0;
var intentos = 0;
var level = 0; //Ningun nivel seleccionado
//Configuracion de usuario para iniciar el juego
class Config {
	constructor(nivel, min, max, chance, numadiv) {
		this.nivel = nivel;
		this.min = parseInt(min);
		this.max = parseInt(max);
		this.chance = parseInt(chance);
		this.numadiv = parseInt(numadiv);
	}
	configNombre() {
		return this.nombre;
	}
	configMinimo() {
		return this.min;
	}
	configMaximo() {
		return this.max;
	}
	configChance() {
		return this.chance;
	}
	configNumAdiv() {
		return this.numadiv;
	}
}

//Creo una clase llamada Intentos, en donde almaceno el numero y la cantidad de intentos
class Intentos {
	constructor(nombre, numero, intento) {
		this.nombre = nombre;
		this.numero = parseInt(numero);
		this.intento = parseInt(intento);
	}
	cantintentos() {
		return this.intento;
	}
	numintentos() {
		return this.numero;
	}
}

//*****
const valuemaximo = document.getElementById('maxNumstate');
const valueminimo = document.getElementById('minNumstate');
const valuechances = document.getElementById('numch');

//Defino la funcion settings en la cual configuro el rango de valores y la cantidad de chances
//***************** */
const Aceptar = document.getElementById('aceptar')
const configButton = document.getElementById('config')
const returnButton = document.getElementById('returnButton')
const facilButton = document.getElementById('buttFacil')
const medioButton = document.getElementById('buttMedio')
const dificilButton = document.getElementById('buttDificil')
const personButton = document.getElementById('buttPers')

//Limpia la pantalla o el contenido del div
function clearUIConfig() {
	const clear = document.getElementById('configuration')
	//root.innerHTML = "";
	clear.style.display = "none";
	clear.style.visibility = "hidden";
}
function clearUIJuego() {
	const clear = document.getElementById('juego')
	clear.style.display = "none";
	clear.style.visibility = "hidden";
}
function clearUILevel() {
	const clear = document.getElementById('level')
	clear.style.display = "none";
	clear.style.visibility = "hidden";
}


function showUILevel() {
	const show = document.getElementById('level')
	show.style.display = "block";
	show.style.visibility = "visible";
}
function showUIJuego() {
	const show = document.getElementById('juego')
	show.style.display = "block";
	show.style.visibility = "visible";
}
function showUIConfig(option) {
	const show = document.getElementById('configuration')
	let minimoIN = document.getElementById("numMinimo")
	let maximoIN = document.getElementById("numMaximo")
	let intentosIN = document.getElementById("numChances")
	show.style.display = "block";
	show.style.visibility = "visible";
	if (option) {
		minimoIN.disabled = true;
		maximoIN.disabled = true;
		intentosIN.disabled = true;
	}
	else {
		minimoIN.disabled = false;
		maximoIN.disabled = false;
		intentosIN.disabled = false;
	}
}

function showUIInit() {
	const game = document.getElementById('juego')
	const configuration = document.getElementById('configuration')
	const levelsel = document.getElementById('level')
	game.style.display = "none";
	game.style.visibility = "hidden";
	configuration.style.display = "none";
	configuration.style.visibility = "hidden";
	levelsel.style.display = "block";
	levelsel.style.visibility = "visible";
}

//--Construyo el archivo localjson para extraer información de las dificultades del juego
URL = "./data/settings.json"
const levels = []
levels.push(new Config("Facil",1,10,10, numeroaleatorio(1, 10)))
levels.push(new Config("Medio",1,20,7, numeroaleatorio(1, 20)))
levels.push(new Config("Dificil",1,30,4, numeroaleatorio(1, 30)))
localStorage.setItem(URL ,JSON.stringify(levels));


//let settings = JSON.parse(localStorage.getItem("./data/settings.json")) ?? [];
function saveToLocalStorage() {
	let configJson = localStorage.getItem('Configuracion');
	if (configJson == null) {//Si no tengo el elemento
		localStorage.setItem('Configuracion', JSON.stringify(Configuration))
	}
}

configButton.addEventListener('click', () => {
	setting()
})
Aceptar.addEventListener('click', () => {
	adivinator()
})
returnButton.addEventListener('click', () => {
	//setting()
})

facilButton.addEventListener('click', () => {
	let settingsRead = localStorage.getItem("./data/settings.json");
	let data = JSON.parse(settingsRead);
	console.log(data)
	document.getElementById("numMinimo").value = data[0].min;
	document.getElementById("numMaximo").value = data[0].max;
	document.getElementById("numChances").value = data[0].chance;
	level = 'Facil'
	facilButton.style.backgroundColor = "white";
	facilButton.style.color = 'red';
	medioButton.style.backgroundColor = '#00916e';
	medioButton.style.color = '#006f54';
	dificilButton.style.backgroundColor = "#00916e";
	dificilButton.style.color = '#006f54';
	personButton.style.backgroundColor = '#00916e';
	personButton.style.color = '#006f54';
	showUIConfig(true);
})

medioButton.addEventListener('click', () => {
	
	let settingsRead = localStorage.getItem(URL);
	let data = JSON.parse(settingsRead);
	document.getElementById("numMinimo").value = data[1].min;
	document.getElementById("numMaximo").value = data[1].max;
	document.getElementById("numChances").value = data[1].chance;
	level = 'Medio';
	facilButton.style.backgroundColor = '#00916e';
	facilButton.style.color = '#006f54';
	medioButton.style.backgroundColor = 'white';
	medioButton.style.color = 'red';
	dificilButton.style.backgroundColor = "#00916e";
	dificilButton.style.color = '#006f54';
	personButton.style.backgroundColor = '#00916e';
	personButton.style.color = '#006f54';
	showUIConfig(true);
})

dificilButton.addEventListener('click', () => {
	let settingsRead = localStorage.getItem(URL);
	let data = JSON.parse(settingsRead);
	document.getElementById("numMinimo").value = data[2].min;
	document.getElementById("numMaximo").value = data[2].max;
	document.getElementById("numChances").value = data[2].chance;
	level = 'Dificil';
	facilButton.style.backgroundColor = '#00916e';
	facilButton.style.color = '#006f54';
	medioButton.style.backgroundColor = '#00916e';
	medioButton.style.color = '#006f54';
	dificilButton.style.backgroundColor = "white";
	dificilButton.style.color = 'red';
	personButton.style.backgroundColor = '#00916e';
	personButton.style.color = '#006f54';

	showUIConfig(true);
})

personButton.addEventListener('click', () => {
	level = 'Personalizado';
	facilButton.style.backgroundColor = '#00916e';
	facilButton.style.color = '#006f54';
	medioButton.style.backgroundColor = '#00916e';
	medioButton.style.color = '#006f54';
	dificilButton.style.backgroundColor = "#00916e";
	dificilButton.style.color = '#006f54';
	personButton.style.backgroundColor = "white";
	personButton.style.color = 'red';
	showUIConfig(false);
	
})
//--------------------------------------------------------------------------------------------//
function listarIntentosRealizados() {
	arrintentos.forEach((p) => {
		document.write("\n Numero: ");
		document.write(p.numero);
		document.write("\n Intento: ");
		document.write(p.intento);
	});
}
/***/
function renderJuegoScreen() {
	let div = document.createElement('div');
	div.id = 'juego';
	div.className = 'juego';
	div.innerHTML += ' <ul class="text">Ingrese el numero a adivinar</ul>'
	div.innerHTML += '<input type="number" id="numInput">'
	div.innerHTML += '<button id="aceptar" type="button">Aceptar</button>'
	div.innerHTML += '<div><ul id="intentosReal"></ul><ul id="intentosNum"></ul><ul id="mensajeAdv"></ul></div>'
	document.body.appendChild(div);
	//agrego un mensaje
}

function setting() {
	clearUIJuego()
	showUIConfig()
	let minimoIN = parseInt(document.getElementById("numMinimo").value);
	let maximoIN = parseInt(document.getElementById("numMaximo").value);
	let intentosIN = parseInt(document.getElementById("numChances").value);
	var usuario = document.getElementById("myName").value;

	if (!isNaN(maximoIN) && minimoIN >= 0) {
		if (!isNaN(maximoIN) && maximoIN > minimoIN) {
			if (!isNaN(intentosIN) && intentosIN > 2) {
				text = "Correcto";
				document.getElementById("numch").innerHTML = text;
				NumeroAdivinar = numeroaleatorio(minimoIN, maximoIN); //Genero numero Aleatorio

				Configuration.push(new Config(minimoIN, maximoIN, chances, NumeroAdivinar));
				updateResources();
				console.log("Exitos");
				MINI = minimoIN;
				MAXI = maximoIN;
				INTENTI = intentosIN;
				console.log(usuario, MINI, MAXI, INTENTI, NumeroAdivinar);
				clearUIConfig()
				showUIJuego()
			}
			else {
				swal("Ingrese un numero de intentos válido", "mayor a 2", "error");
				console.log("no valido intentos");
			}
		}
		else {
			swal("Ingrese un numero máximo válido", "mayor al mínimo", "error");
			console.log("maximo< minimo");
		}
	}
	else {
		swal("Ingrese un numero mínimo válido", "mayor a cero", "error");
		console.log("minimo <0");
	}
}
/**Genera un numero aleatorio entre un rango definido **/
function numeroaleatorio(minimo, maximo) {
	return Math.floor(Math.random() * (maximo - minimo) + minimo);
}

/**Adivinador de numeros */
function adivinator() {
	clearUIConfig();
	showUIJuego();
	let numInput = parseInt(document.getElementById("numInput").value);
	const intentosReal = document.getElementById("intentosReal");
	intentosReal.innerHTML = "";
	const intentosNum = document.getElementById("intentosNum");
	intentosNum.innerHTML = "";
	const mensajeAdv = document.getElementById("mensajeAdv");
	mensajeAdv.innerHTML = "";

	intentos++;
	arrintentos.push(new Intentos(numInput, intentos));
	console.log(numInput, intentos)

	if (numInput < NumeroAdivinar) {
		console.log("El numero secreto es más alto que " + numInput);
		mensajeAdv.innerHTML =
			`El numero secreto es más alto que el ` + numInput;
		//alert("El numero secreto es más alto que "+ numeroIngresado );
	} else if (numInput > NumeroAdivinar) {
		console.log("El numero secreto es más bajo que " + numInput);
		mensajeAdv.innerHTML =
			`El numero secreto es más bajo que el ` + numInput;
	} else if (numeroIngresado == NumeroAdivinar) {
		mensajeAdv.innerHTML =
			`FELICITACIONES ADIVINASTE EL NUMERO EN  ` +
			arrintentos[intentos - 1].cantintentos() +
			` INTENTOS`;
		intentosReal.innerHTML =
			`Intento : ` + arrintentos[intentos - 1].cantintentos();
		intentosNum.innerHTML =
			`Ultimo Numero: ` + arrintentos[intentos - 1].numintentos();
	} else {
		mensajeAdv.innerHTML =
			`Debe ingresar un numero entre ` + MINI + ` y ` + MAXI;
	}
	intentosReal.innerHTML =
		`Intento : ` + arrintentos[intentos - 1].cantintentos();
	intentosNum.innerHTML =
		`Ultimo Numero: ` + arrintentos[intentos - 1].numintentos();

	if (INTENTI == intentos) {
		if (numInput == NumeroAdivinar) {
			mensajeAdv.innerHTML =
				`FELICITACIONES ADIVINASTE EL NUMERO EN  ` +
				arrintentos[intentos - 1].cantintentos() +
				` INTENTOS`;
			intentosReal.innerHTML =
				`Intento : ` + arrintentos[intentos - 1].cantintentos();
			intentosNum.innerHTML =
				`Ultimo Numero: ` + arrintentos[intentos - 1].numintentos();
			swal("Felicitaciones!!", `FELICITACIONES ADIVINASTE EL NUMERO EN  ` +
				arrintentos[intentos - 1].cantintentos() +
				` INTENTOS`, "success");
		}
	}
	else {
		mensajeAdv.innerHTML =
			`Te quedaste sin intentos, mejor suerte la proxima. El numero era = ` +
			NumeroAdivinar;
		intentosReal.innerHTML =
			`Intento : ` + arrintentos[intentos - 1].cantintentos();
		swal("Fallaste", `Te quedaste sin intentos, mejor suerte la proxima. El numero era = ` +
			NumeroAdivinar, "error");
	}


}


function updateResources() {
	saveToLocalStorage();
}


function simulador() {
	//alert("VAMOS A JUGAR UN SIMPLE JUEGO");
	//alert("ADIVINAR EL NUMERO");
	//setting();
	//adivinator();
	//listarIntentosRealizados();
	//	clearUIJuego();
}

simulador();
