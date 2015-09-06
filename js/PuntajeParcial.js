function PuntajeParcial(){
	var aciertosConsecutivos = 0;
	var erroresConsecutivos = 0;
	var puntos = 0;
	var aumentar = new Array(25,30,40,55,75,100);
	var disminuir = new Array(10,12,16,22,30,40);
	this.getPuntos = function(){
		return puntos;
	};
	this.restablecer = function(){
		aciertosConsecutivos = 0;
		erroresConsecutivos = 0;
		puntos = 0;
	};
	this.getAciertosConsecutivos = function(){
		return aciertosConsecutivos;
	};
	var noNegativo = function(puntos){
		return (puntos < 0) ? 0 : puntos;
	};
	this.calcular = function(acierto){
		if(acierto){
			erroresConsecutivos = 0;
			puntos += aumentar[aciertosConsecutivos];
			aciertosConsecutivos++;
		}
		else{
			aciertosConsecutivos = 0;
			puntos -= disminuir[erroresConsecutivos];
			puntos = noNegativo(puntos);
			erroresConsecutivos++;
		}
		return puntos;
	};
};