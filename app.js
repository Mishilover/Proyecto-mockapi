function mostrar(sec) {
    document.getElementById('seccion-proyectos').style.display = (sec === 'proyectos') ? 'block' : 'none';
    document.getElementById('seccion-personas').style.display = (sec === 'personas') ? 'block' : 'none';
}

// ===== APIs =====
const API = "https://6938daea4618a71d77d1713b.mockapi.io/PROJECTS";
const API_PERSONAS = "https://6938daea4618a71d77d1713b.mockapi.io/PERSONAS";

// ===== PROYECTOS =====
function cargar() {
    fetch(API)
        .then(r => r.json())
        .then(d => {
            lista.innerHTML = d.map(p => `
                <tr>
                    <td>${p.nombre}</td>
                    <td>${p.descripcion}</td>
                    <td>${p.estado}</td>
                    <td>${p.fecha}</td>
                    <td class="actions">
                        <button onclick="editar(${p.id})">Editar</button>
                        <button onclick="eliminar(${p.id})">Eliminar</button>
                    </td>
                </tr>`).join("");
        });
}

function crear() {

    const clearProjectFields = () => {
        nombre.value = "";
        descripcion.value = "";
        estado.value = "Pendiente";
        fecha.value = "";
    };

    fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: nombre.value,
            descripcion: descripcion.value,
            estado: estado.value,
            fecha: fecha.value
        })
    }).then(() => { cargar(); clearProjectFields(); });
}

function eliminar(id) {
    fetch(`${API}/${id}`, { method: 'DELETE' })
        .then(() => cargar());
}

function editar(id) {
    let datos = {
        nombre: prompt('Nuevo nombre:'),
        descripcion: prompt('Nueva descripción:'),
        estado: prompt('Nuevo estado:'),
        fecha: prompt('Nueva fecha (YYYY-MM-DD):')
    };

    fetch(`${API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    }).then(() => cargar());
}

// ===== PERSONAS =====
function cargarPersonas() {
    fetch(API_PERSONAS)
        .then(r => r.json())
        .then(d => {
            listaPersonas.innerHTML = d.map(p => `
                <tr>
                    <td>${p.nombre}</td>
                    <td>${p.correo}</td>
                    <td class="actions">
                        <button onclick="editarPersona(${p.id})">Editar</button>
                        <button onclick="eliminarPersona(${p.id})">Eliminar</button>
                    </td>
                </tr>`).join("");
        });
}

function crearPersona() {
    fetch(API_PERSONAS, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: p_nombre.value,
            correo: p_correo.value
        })
    }).then(() => cargarPersonas());
}

function eliminarPersona(id) {
    fetch(`${API_PERSONAS}/${id}`, { method: 'DELETE' })
        .then(() => cargarPersonas());
}

function editarPersona(id) {
    
    const nuevoNombre = prompt('Nuevo nombre:');
    if (nuevoNombre === null) return;
    const nuevoCorreo = prompt('Nuevo correo:');
    if (nuevoCorreo === null) return;

    const payload = { nombre: nuevoNombre, correo: nuevoCorreo };

    fetch(`${API_PERSONAS}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }).then(() => cargarPersonas());
}

cargar();
cargarPersonas();
