console.log("Simulador Coderhouse");
console.log("Adivinar el numero secreto");

/*var minimo = document.getElementById("numMinimo").value;
var maximo = document.getElementById("numMaximo").value;
var intentos = document.getElementById("numChances").value;
*/
var NumeroAdivinar = 1;
var numeroIngresado = 0;
var chances = 0;
let arrintentos = []; //Declaro el array donde almacenar los intentos
let Configuration = [];
var MINI = 0;
var MAXI = 0;
var INTENTI = 0;
var intentos = 0;
class Config {
	constructor(nombre,min, max, chance, numadiv) {
		this.nombre = nombre;
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
	constructor(numero, intento) {
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
const root = document.getElementById('configuration')
/// */
//***************** */

const Aceptar = document.getElementById('aceptar')
const configButton = document.getElementById('config')
function clearUIConfig() {
	//Limpia la pantalla o el contenido del div
	root.innerHTML = "";
}

const game = document.getElementById('juego')
function clearUIJuego() {
	//Limpia la pantalla o el contenido del div
	game.innerHTML = "";
}

let resourcesJson = JSON.parse(localStorage.getItem("resourcesJson")) ?? [];
configButton.addEventListener('click', () => {
	setting()
	//saveToLocalStorage()
	// updateResources()
})
Aceptar.addEventListener('click', () => {
	adivinator()
	// updateResources()
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
	/*let ul =   document.createElement('ul');
	let input =   document.createElement('input');
	let button =   document.createElement('button');
	button.id= "aceptar";
	button.type = "button";
	button.innerText = "aceptar";
	input.type= "number";
	input.id = "numInput";
	ul.id = 'text';
	ul.innerText = "Ingrese el numero a adivinar";*/
	div.id = 'juego';
	div.className = 'juego';
	div.innerHTML += ' <ul class="text">Ingrese el numero a adivinar</ul>'
	div.innerHTML += '<input type="number" id="numInput">'
	div.innerHTML += '<button id="aceptar" type="button">Aceptar</button>'
	div.innerHTML += '<div><ul id="intentosReal"></ul><ul id="intentosNum"></ul><ul id="mensajeAdv"></ul></div>'

	document.body.appendChild(div);
	//agrego un mensaje
}
//*******/


function setting() {

	let minimoIN = parseInt(document.getElementById("numMinimo").value);
	let maximoIN = parseInt(document.getElementById("numMaximo").value);
	let intentosIN = parseInt(document.getElementById("numChances").value);

	if (!isNaN(maximoIN) && minimoIN >= 0) {
		if (!isNaN(maximoIN) && maximoIN > minimoIN) {
			if (!isNaN(intentosIN) && intentosIN > 2) {
				text = "Correcto";
				document.getElementById("numch").innerHTML = text;
				NumeroAdivinar = numeroaleatorio(minimoIN, maximoIN); //Genero numero Aleatorio

				Configuration.push(new Config(minimoIN, maximoIN, chances, NumeroAdivinar));

				resourcesJson.push(Configuration)
				localStorage.setItem("resourcesJson", JSON.stringify(resourcesJson));
				console.log("Exitos");				
				MINI = minimoIN;
				MAXI = maximoIN;
				INTENTI = intentosIN;
				console.log(MINI, MAXI, INTENTI, NumeroAdivinar);
				clearUIConfig()
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

function numeroaleatorio(minimo, maximo) {
	return Math.floor(Math.random() * (maximo - minimo) + minimo);
}

const numIn = document.getElementById("juego");
function adivinator() {
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
	}
	else if (numInput > NumeroAdivinar) {
		console.log("El numero secreto es más bajo que " + numInput);
		mensajeAdv.innerHTML =
			`El numero secreto es más bajo que el ` + numInput;
		//alert("El numero secreto es más bajo que "+ numeroIngresado );
	}
	//else if (numInput == NumeroAdivinar) {
	//	break;
	else if (numeroIngresado == NumeroAdivinar) {
		//alert("Felicitaciones adivinaste el numero " + arrintentos[intentos-1].numintentos() +" en "+);
		mensajeAdv.innerHTML =
			`FELICITACIONES ADIVINASTE EL NUMERO EN  ` +
			arrintentos[intentos - 1].cantintentos() +
			` INTENTOS`;
		intentosReal.innerHTML =
			`Intento : ` + arrintentos[intentos - 1].cantintentos();
		intentosNum.innerHTML =
			`Ultimo Numero: ` + arrintentos[intentos - 1].numintentos();
	}
	else {
		mensajeAdv.innerHTML =
			`Debe ingresar un numero entre ` + MINI + ` y ` + MAXI;
		// alert("Debe ingresar un numero entre " + minimo + " y " +maximo);
	}
	intentosReal.innerHTML =
		`Intento : ` + arrintentos[intentos - 1].cantintentos();
	intentosNum.innerHTML =
		`Ultimo Numero: ` + arrintentos[intentos - 1].numintentos();

	if (INTENTI != intentos) {
		if (numInput == NumeroAdivinar) {
			numIn.innerText = "";
			//alert("Felicitaciones adivinaste el numero " + arrintentos[intentos-1].numintentos() +" en "+);
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
	} else {
		clearUIJuego();
		mensajeAdv.innerHTML =
			`Te quedaste sin intentos, mejor suerte la proxima. El numero era = ` +
			NumeroAdivinar;
		//alert("Te quedaste sin intentos, mejor suerte la proxima. El numero era = " + NumeroAdivinar )
		intentosReal.innerHTML =
			`Intento : ` + arrintentos[intentos - 1].cantintentos();
		numIn.innerText = "";
		swal("Fallaste", `Te quedaste sin intentos, mejor suerte la proxima. El numero era = ` +
			NumeroAdivinar, "error");
		//.innerHTML = `Numero Secreto: ` + Configuration.configNumAdiv();
	}
	// while (INTENTI  != intentos);

}

function saveToLocalStorage() {
	const resourcesJson = JSON.stringify(Configuration);
	localStorage.setItem("Configuration", resourcesJson);
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
