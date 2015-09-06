function Puntajes(){
	var nodo = {
		obtenerUsuario:document.getElementById("obtenerUsuario"),
		overlay:document.getElementById("overlay"),
		puntajes:document.querySelector("#Contenedor_Puntajes span"),
		contenedorPuntajes:document.querySelector("#Contenedor_Puntajes"),
		ingresaUsuario:document.getElementById("ingresaUsuario"),
	};
	var record = new Record();
	var dialogModal = {
		mostrar:function(){
			nodo.overlay.style.display = 'block';
			nodo.overlay.style.opacity = 0.3;
			nodo.ingresaUsuario.style.display = 'block';
		},
		ocultar:function(){
			nodo.overlay.style.display = 'none';
			nodo.obtenerUsuario.value = "";
		},
	};
	this.mostrarPuntajes = function(){
		record.imprimir(nodo.puntajes);
	};
	var requestAnimationFrame = (function(){
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function(callback){
				animate = window.setTimeout(callback, 1000/60);
				return animate;
			};
	})();
	this.trasladarPuntajes=function(velocidad){
		if(typeof(velocidad) == 'undefined'){
			velocidad = 60;
		}
		var desplazamiento = velocidad/60;
		traslacion = 0;
		trasladar=function(){
			traslacion += desplazamiento;
			posicion = nodo.contenedorPuntajes.clientWidth - traslacion;
			if((posicion * -1) > nodo.puntajes.clientWidth){
				posicion = nodo.contenedorPuntajes.clientWidth;
				traslacion = 0;
			}
			nodo.puntajes.style.left = posicion+'px';
			requestAnimationFrame(trasladar);
		};
		trasladar();
	};
	this.esNuevoRecord = function(puntos){
		if (record.esNuevo(puntos)){
			dialogModal.mostrar();
			nodo.obtenerUsuario.focus();
			nodo.obtenerUsuario.onkeyup = function(evento){
				var event = window.event || evento;
				var key = event.keyCode || event.which;
				if (key == 13){
					nombre = this.value;
					if(nombre == null || nombre == ''){
						nombre = 'anonimo';
					}
					record.acomodar(puntos,nombre);
					record.imprimir(nodo.puntajes);
					nodo.ingresaUsuario.style.display='none';
					dialogModal.ocultar();
				}
			};
		}
	};
};