// 1. Definición de la clase Paciente (siguiendo los requerimientos del proyecto)
class Paciente {
    constructor(nombre, ritmoCardiaco, oxigenacion) {
        this.nombre = nombre;
        this.ritmoCardiaco = ritmoCardiaco;
        this.oxigenacion = oxigenacion;
        this.nivelRiesgo = this.calcularRiesgo(); 
    }

    // Estructuras de control (if/else) para determinar el riesgo
    calcularRiesgo() {
        if (this.oxigenacion < 90 || this.ritmoCardiaco > 130) {
            return { texto: 'Rojo (Crítico)', clase: 'danger' };
        } 
        else if (this.oxigenacion >= 90 && this.oxigenacion <= 94) {
            return { texto: 'Amarillo (Urgente)', clase: 'warning text-dark' };
        } 
        else {
            return { texto: 'Verde (Estable)', clase: 'success' };
        }
    }
}

// Cargar la tabla al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    renderizarTabla();
});

// Evento click del botón registrar con el mismo estilo directo de tus otros códigos
document.getElementById('btnRegistrar').addEventListener('click', function() {
    let nombre = document.getElementById('nombreP').value.trim();
    let oxigeno = parseInt(document.getElementById('oxigenoP').value);
    let ritmo = parseInt(document.getElementById('ritmoP').value);

    // Validación básica
    if (nombre === '' || isNaN(oxigeno) || isNaN(ritmo)) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

    // Crear la instancia del objeto Paciente
    let nuevoPaciente = new Paciente(nombre, ritmo, oxigeno);

    // Guardar en LocalStorage (igual que en tus prácticas anteriores)
    let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    pacientes.push(nuevoPaciente);
    localStorage.setItem('pacientes', JSON.stringify(pacientes));

    // Refrescar tabla y limpiar formulario
    renderizarTabla();
    limpiarFormulario();
});

// Función para renderizar la lista desde LocalStorage
let renderizarTabla = function() {
    let tbodyPacientes = document.getElementById('listaPacientes');
    tbodyPacientes.innerHTML = '';

    let pacientesGuardados = JSON.parse(localStorage.getItem('pacientes')) || [];

    pacientesGuardados.forEach(p => {
        // Reconstruimos la instancia para asegurar la lectura del método
        let pacienteObj = new Paciente(p.nombre, p.ritmoCardiaco, p.oxigenacion);

        let fila = document.createElement('tr');
        fila.innerHTML = `
            <td><strong>${pacienteObj.nombre}</strong></td>
            <td>${pacienteObj.oxigenacion}%</td>
            <td>${pacienteObj.ritmoCardiaco} lpm</td>
            <td><span class="badge bg-${pacienteObj.nivelRiesgo.clase}">${pacienteObj.nivelRiesgo.texto}</span></td>
        `;

        tbodyPacientes.appendChild(fila);
    });
};

// Función auxiliar para limpiar los campos
let limpiarFormulario = function() {
    document.getElementById('nombreP').value = '';
    document.getElementById('oxigenoP').value = '';
    document.getElementById('ritmoP').value = '';
    document.getElementById('nombreP').focus();
};