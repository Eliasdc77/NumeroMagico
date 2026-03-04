// Variables del juego
let numeroSecreto;
let intentos;
let historialIntentos;
const MAX_INTENTOS = 10;

// Elementos HTML
const inputNumero = document.getElementById('numero-input');
const btnAdivinar = document.getElementById('btn-adivinar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const mensajeDiv = document.getElementById('mensaje');
const intentosActuales = document.getElementById('intentos-actuales');
const historialLista = document.getElementById('historial-lista');
const lebronContainer = document.getElementById('lebron-container');

// Inicia el juego
function iniciarJuego() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    intentos = 0;
    historialIntentos = [];
    
    inputNumero.disabled = false;
    inputNumero.value = '';
    inputNumero.focus();
    
    btnReiniciar.classList.add('hidden');
    lebronContainer.classList.add('hidden');
    
    mensajeDiv.textContent = '';
    mensajeDiv.className = 'mensaje';
    
    actualizarContador();
    mostrarHistorial();
    
    console.log('Número secreto:', numeroSecreto);
}

// Actualiza el contador en pantalla
function actualizarContador() {
    intentosActuales.textContent = intentos;
}

// Muestra los intentos anteriores
function mostrarHistorial() {
    historialLista.innerHTML = '';
    
    if (historialIntentos.length === 0) {
        historialLista.innerHTML = '<p class="historial-vacio">Aún no has hecho ningún intento</p>';
        return;
    }
    
    historialIntentos.forEach(numero => {
        const item = document.createElement('div');
        item.className = 'intento-item';
        item.textContent = numero;
        historialLista.appendChild(item);
    });
}

// Muestra mensajes con colores
function mostrarMensaje(texto, tipo) {
    mensajeDiv.textContent = texto;
    mensajeDiv.className = `mensaje ${tipo}`;
}

// Termina el juego
function terminarJuego() {
    inputNumero.disabled = true;
    btnReiniciar.classList.remove('hidden');
    lebronContainer.classList.add('hidden');
}

// Verifica el número ingresado
function verificarNumero() {
    const numeroIngresado = parseInt(inputNumero.value);
    
    // Validar que sea un número válido
    if (isNaN(numeroIngresado) || numeroIngresado < 1 || numeroIngresado > 100) {
        mostrarMensaje('⚠️ Ingresa un número entre 1 y 100', 'error');
        return;
    }
    
    // Ver si ya lo intentó antes
    if (historialIntentos.includes(numeroIngresado)) {
        mostrarMensaje('⚠️ Ya probaste ese número', 'error');
        return;
    }
    
    intentos++;
    historialIntentos.push(numeroIngresado);
    actualizarContador();
    mostrarHistorial();
    
    inputNumero.value = '';
    inputNumero.focus();
    
    // Verificar si ganó
    if (numeroIngresado === numeroSecreto) {
        mostrarMensaje(`🏆 ¡Ganaste! El número era ${numeroSecreto}. Lo lograste en ${intentos} intentos`, 'exito');
        terminarJuego();
        return;
    }
    
    // Ver si ya perdió
    if (intentos >= MAX_INTENTOS) {
        mostrarMensaje(`😔 Perdiste. El número era ${numeroSecreto}`, 'game-over');
        terminarJuego();
        return;
    }
    
    // Dar pista
    const intentosRestantes = MAX_INTENTOS - intentos;
    lebronContainer.classList.remove('hidden');
    
    if (numeroIngresado < numeroSecreto) {
        mostrarMensaje(`🏀 Consejo de LeBron: "Es un número MÁS ALTO que ${numeroIngresado}". Te quedan ${intentosRestantes} intentos`, 'info');
    } else {
        mostrarMensaje(`🏀 Consejo de LeBron: "Es un número MÁS BAJO que ${numeroIngresado}". Te quedan ${intentosRestantes} intentos`, 'info');
    }
}

// Eventos
btnAdivinar.addEventListener('click', verificarNumero);

inputNumero.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        verificarNumero();
    }
});

btnReiniciar.addEventListener('click', iniciarJuego);

// Iniciar cuando cargue la página
window.addEventListener('load', iniciarJuego);