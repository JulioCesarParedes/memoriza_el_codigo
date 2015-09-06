/*https://github.com/JulioCesarParedes/memoriza_el_codigo*/

function Juego(){
	var nodo = {
		codigo:document.getElementById("Codigo"),
		puntos:document.querySelector("#Puntos span"),
		temporizador:document.getElementById("Temporizador"),
		obtenerRespuesta:document.getElementById("obtenerRespuesta"),
		correctoIncorrecto:document.getElementById('correctoIncorrecto'),
		contenedor_play_pause:document.getElementById('Contenedor_Play_Pause'),
		celda_play_pause:document.getElementById('Celda_Play_Pause'),
		play_pause:document.getElementById('Play_Pause'),
		overlay:document.getElementById("overlay"),
	};
	var puntaje = new PuntajeParcial();
	var puntajes = (window.localStorage) ? new Puntajes() : null;
	var duracionDelJuego = 90000;
	var duracionCodigoVisible = 2000;
	var letra = new Array('&','*','#','%');
	var numElementos = 6;
	var asignarNumElementos = new Array(6,6,6,7,7,8);
	var ocultarCodigo;
	var retardoContinuarJuego;
	var inicializar = function(){
		numElementos = 6;
		puntaje.restablecer();
		nodo.puntos.firstChild.nodeValue = "0";
	};
	var Correcto = function(){
		nodo.correctoIncorrecto.setAttribute("class","Correcto");
	};
	var Incorrecto = function(){
		nodo.correctoIncorrecto.setAttribute("class","Incorrecto");
	};
	var ocultarCorrectoIncorrecto = function(){
		nodo.correctoIncorrecto.style.visibility = 'hidden';
	};
	var mostrarCorrectoIncorrecto = function(){
		nodo.correctoIncorrecto.style.visibility = 'visible';
	};
	var ejecutarJuego = function(){
		if(!temporizador.finalizado()){
			nodo.obtenerRespuesta.value = '';
			obtenerCodigo();
			ocultarCodigo = window.setTimeout(function(){
				habilitarObtenerRespuesta();
				quitarCodigo();
			},duracionCodigoVisible);
		}
		else{
			clearTimeout(ocultarCodigo);
			quitarCodigo();
			nodo.obtenerRespuesta.value = '';
			deshabilitarObtenerRespuesta();
			if(window.localStorage) puntajes.esNuevoRecord(puntaje.getPuntos());
		}
	};
	var temporizador = new Temporizador(nodo.temporizador,ejecutarJuego,duracionDelJuego,'M:S');
	this.mostrarPuntajes = function(){
		if(window.localStorage){
			puntajes.mostrarPuntajes();
			puntajes.trasladarPuntajes();
		}
	};
	var habilitarObtenerRespuesta = function(){
		nodo.obtenerRespuesta.disabled = false;
		nodo.obtenerRespuesta.focus();
		nodo.contenedor_play_pause.style.visibility = 'visible';
	};
	var deshabilitarObtenerRespuesta = function(){
		nodo.obtenerRespuesta.disabled = true;
		nodo.contenedor_play_pause.style.visibility = 'hidden';
	};
	var quitarCodigo = function(){
		nodo.codigo.firstChild.nodeValue = '';
	};
	var checarRespuesta = function(valor1,valor2){
		(valor1 == valor2) ? Correcto() : Incorrecto();
		mostrarCorrectoIncorrecto();
		retardoContinuarJuego = window.setTimeout(function(){
			ocultarCorrectoIncorrecto();
			ejecutarJuego();
		}, 1000);
		nodo.puntos.firstChild.nodeValue = puntaje.calcular(valor1 == valor2);
		numElementos = asignarNumElementos[puntaje.getAciertosConsecutivos()];
	};
	var obtenerCodigo = function(){
		var codigoNumeros = new Array();
		numAleatorio = Math.random().toString();
		letraAleatoria = Math.floor(Math.random()*4).toString();
		posicionCodigoLetras = Math.floor(Math.random()*(numElementos));
		for(var cont=0; cont<numElementos; cont++){
			codigoNumeros[cont] = numAleatorio.substr(cont+2,1).toString();
		}
		codigoNumeros.splice(parseInt(posicionCodigoLetras),1,letra[parseInt(letraAleatoria)]);
		codigo=codigoNumeros.join("");
		for (var cont=0;cont<numElementos;cont++) {
			if(cont == parseInt(posicionCodigoLetras)){
				nodo.codigo.firstChild.nodeValue = codigo;
			}
			else{
				nodo.codigo.firstChild.nodeValue = codigo;
			}
		}
	};
	this.iniciar=function(){
		inicializar();
		temporizador.iniciar();
		ejecutarJuego();
	};
	this.reiniciar=function(){
		clearTimeout(ocultarCodigo);
		clearTimeout(retardoContinuarJuego);
		ocultarCorrectoIncorrecto();
		deshabilitarObtenerRespuesta();
		this.iniciar();
	};
	nodo.contenedor_play_pause.addEventListener('click',function(){
		if(!nodo.obtenerRespuesta.disabled){
			if(nodo.play_pause.getAttribute("class") == "Play"){
				temporizador.play();
				nodo.play_pause.setAttribute("class","Pause");
				nodo.overlay.style.display = 'none';
				nodo.celda_play_pause.style.zIndex = 'auto';
				nodo.obtenerRespuesta.focus();
			}
			else{
				temporizador.pause();
				nodo.play_pause.setAttribute("class","Play");
				nodo.overlay.style.display = 'block';
				nodo.overlay.style.opacity = 0;
				nodo.celda_play_pause.style.zIndex = 1000;
			}
		}
	},false);
	nodo.obtenerRespuesta.addEventListener('keyup',function(evento){
		var event = window.event || evento;
		var key = event.keyCode || event.which;
		if (key == 13){
			deshabilitarObtenerRespuesta();
			checarRespuesta(codigo,this.value);
		}
	},false);
};