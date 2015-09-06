/*https://github.com/JulioCesarParedes/memoriza_el_codigo*/

function Temporizador(nodo,aviso,getTiempoLimite,getFormato){//aviso es una funcion a ejecutar al finalizar el temporizador
	var nodoTemporizador = nodo;
	var inicio = 0;
	var ahora = 0;
	var activo = false;
	var parar = false;
	var tiempoEnPause = {
		inicio:0,
		fin:0,
	};
	var tiempoLimite = (typeof(getTiempoLimite) != 'undefined') ? getTiempoLimite : 90000;
	var formato = (typeof(getFormato) != 'undefined') ? getFormato : 'H:M:S';
	var enMilisegs = function(){
		return inicio - ahora + tiempoLimite + 999;
	};
	this.finalizado=function(){
		return !activo;
	};
	this.cambiarNodo = function(nuevoNodo){
		nodoTemporizador = nuevoNodo;
	};
	this.setTiempo = function(nuevotiempo){
		tiempoLimite = nuevotiempo;
	};
	this.setFormato = function(nuevoformato){
		formato = nuevoformato;
	};
	var formatear = function(hora,minuto,segundo){
		regresarValor = function(){
			arreglo = formato.split('');
			for(i=0; i<arreglo.length; i++){
				arreglo[i] = aplicar(arreglo[i]);
			}
			return arreglo.join('');
		};
		addCeroInicial = function(numero){
			return (numero < 10) ? '0'+numero : numero;
		};
		aplicar = function(caracter){
			switch(caracter){
				case 'H':
					return addCeroInicial(hora);
					break;
				case 'h':
					return hora;
					break;
				case 'M':
					return addCeroInicial(minuto);
					break;
				case 'm':
					return minuto;
					break;
				case 'S':
					return addCeroInicial(segundo);
					break;
				case 's':
					return segundo;
					break;
				default:
					return caracter;
					break;
			}
		};
		return regresarValor();
	};
	var imprimir = function(tiempo){
		getHours = function(){
			return Math.floor(tiempo / 1000 / 60 / 60);
		};
		getMinutes = function(){
			return Math.floor(tiempo / 1000 /60 - (60 * getHours()));
		};
		getSeconds = function(){
			return Math.floor(tiempo / 1000 - (60 * 60 * getHours()) - (60 * getMinutes()));
		};
		return isNaN(tiempo) ? formatear('--','--','--') : formatear(getHours(),getMinutes(),getSeconds());
	};
	var descontarPause = function(){
		inicio -= (tiempoEnPause.inicio - tiempoEnPause.fin);
		tiempoEnPause.inicio = 0;
		tiempoEnPause.fin = 0;
	};
	var contar = function(){
		if(!parar){
			ahora = new Date();
			if(enMilisegs() >= 1000) nodoTemporizador.firstChild.nodeValue = imprimir(enMilisegs());
			else{
				nodoTemporizador.firstChild.nodeValue = imprimir(0);
				activo = false;
				parar = true;
				aviso();
			}
			window.setTimeout(contar, 1000);
		}
	};
	this.iniciar = function(){
		inicio = new Date();
		activo = true;
		parar = false;
		contar();
	};
	this.pause = function(){
		parar = true;
		tiempoEnPause.inicio = new Date();
		contar();
	};
	this.play = function(){
		tiempoEnPause.fin = new Date();
		descontarPause();
		parar = false;
		contar();
	};
	this.detener = function(){
		parar = true;
		contar();
	};
};