// Mostrar la fecha actual del sistema
const fechaHoy = new Date();
const opciones = { day: '2-digit', month: '2-digit', year: 'numeric' };
document.getElementById('fecha').textContent = fechaHoy.toLocaleDateString('es-ES', opciones);

let vuelos = JSON.parse(localStorage.getItem('vuelos')) || [];
function guardarVuelo() {
    localStorage.setItem('vuelos', JSON.stringify(vuelos));
}

function mostrarVuelo() {
    const lista = document.getElementById('listaVuelos');
    lista.innerHTML = '';
    vuelos.forEach((vuelo, index) => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <span> Vuelo: ${vuelo.nombre} - Número: ${vuelo.numero} - Destino: ${vuelo.destino} - Estado: ${vuelo.estado}</span>
            <div class="actions">
                <button onclick="editarVuelo(${index})">✏️</button>
                <button onclick="eliminarVuelo(${index})">🗑️</button>
                <button onclick="cambiarEstado(${index})">🔄</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

function agregarVuelo() {
    const nombre = document.getElementById('nombreVuelo').value;
    const numero = document.getElementById('numeroVuelo').value;
    const destino = document.getElementById('destinoVuelo').value;
    if (nombre && numero && destino) {
        vuelos.push({ nombre, numero, destino, estado: 'En espera' });
        guardarVuelo();
        mostrarVuelo();

        document.getElementById('nombreVuelo').value = '';
        document.getElementById('numeroVuelo').value = '';
        document.getElementById('destinoVuelo').value = '';
    }
}

mostrarVuelo();

function editarVuelo(index) {
    const vuelo = vuelos[index];
    const nuevoNombre = prompt('Nuevo nombre del vuelo:', vuelo.nombre);
    const nuevoNumero = prompt('Nuevo número del vuelo:', vuelo.numero);
    const nuevoDestino = prompt('Nuevo destino:', vuelo.destino);

    if (nuevoNombre && nuevoNumero && nuevoDestino) {
        vuelos[index].nombre = nuevoNombre;
        vuelos[index].numero = nuevoNumero;
        vuelos[index].destino = nuevoDestino;
        guardarVuelo();
        mostrarVuelo();
    }
}

function eliminarVuelo(index) {
    if (confirm('Desea eliminar el vuelo?')) {
        vuelos.splice(index, 1);
        guardarVuelo();
        mostrarVuelo();
    }
}

function cambiarEstado(index) {
    const estados = ['En espera', 'Programado', 'Cancelado'];
    let estadoActual = vuelos[index].estado;
    let nuevoEstado = estados[(estados.indexOf(estadoActual) + 1) % estados.length];
    vuelos[index].estado = nuevoEstado;
    guardarVuelo();
    mostrarVuelo();
}

