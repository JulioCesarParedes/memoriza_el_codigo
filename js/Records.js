function Record(){
	var MAX_USERS_RECORDS = 3;
	var crearArray=function(){
		var crearArray = new Array();
		for(var i = 0; i < MAX_USERS_RECORDS; i++){
			crearArray[i]='undefined';
		}
		return crearArray;
	};
	var crearIndefinido=function(){
		juego={
			usuario:crearArray(),
			puntos:crearArray()
		};
		return juego;
	};
	this.indefinido={
		juego:crearIndefinido()
	};
	this.aTexto=function(objeto){
		txt = '{';
		for(i in objeto){
			txt += "'"+i+"':{";
			for(j in objeto[i]){
				txt += "'"+j+"': [";
				for(k in objeto[i][j]){
					txt += "'"+objeto[i][j][k]+"',";
				}
				txt += "],";
			}
			txt += "},";
		}
		txt += '}';
		return txt;
	};
	this.aObjeto=function(cadena){
		return eval('('+cadena+')');
	};
	this.getRecords=function(){
		if(!localStorage.getItem('recordsCodigo')){
			localStorage.setItem('recordsCodigo',this.aTexto(this.indefinido));
		}
		return this.aObjeto(localStorage.getItem("recordsCodigo"));
	};
	var isValido=function(){};
	this.records=this.getRecords();
	this.esNuevo=function(nuevoPuntaje){
		this.records = this.getRecords();
		return isNaN(this.records.juego.puntos[MAX_USERS_RECORDS-1]) || this.records.juego.puntos[MAX_USERS_RECORDS-1] < nuevoPuntaje;
	};
	this.imprimir=function(nodoRecords){
		numeros = new Array('Primer','Segundo','Tercer');
		txt = 'Records!!! ';
		for(var i = 0; i < MAX_USERS_RECORDS; i++){
			txt += numeros[i] + ' lugar.- ' + this.records.juego.usuario[i] + ' => ' + this.records.juego.puntos[i] + ' puntos; ';
		}
		nodoRecords.firstChild.nodeValue = txt;
	};
	this.acomodar=function(nuevoPuntaje,nuevoNombre){
		var j = 0;
		for(i in this.records.juego.puntos){
			if (isNaN(this.records.juego.puntos[i])){
				this.records.juego.puntos[i] = nuevoPuntaje;
				this.records.juego.usuario[i] = nuevoNombre;
				localStorage.setItem('recordsCodigo',this.aTexto(this.records));
				break;
			}
			else if(parseInt(this.records.juego.puntos[i]) < parseInt(nuevoPuntaje) || (parseInt(this.records.juego.puntos[i]) == parseInt(nuevoPuntaje) && j > 0)){
				j++;
				tempPuntos = this.records.juego.puntos[i];
				tempNombre = this.records.juego.usuario[i];
				this.records.juego.puntos[i] = nuevoPuntaje;
				this.records.juego.usuario[i] = nuevoNombre;
				nuevoPuntaje = tempPuntos;
				nuevoNombre = tempNombre;
				localStorage.setItem('recordsCodigo',this.aTexto(this.records));
			}
		}
	};
};