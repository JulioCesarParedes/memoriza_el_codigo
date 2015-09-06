function main(){
    var juego = new Juego();
	juego.mostrarPuntajes();
    document.getElementById('New').addEventListener('click',function(){
		juego.reiniciar();
	},false);
}
window.addEventListener('load', main, false);