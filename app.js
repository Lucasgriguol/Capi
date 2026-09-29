// app.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, onSnapshot, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAFZBsmx7Jep5XLSm2rJNU7xus1WWZ6izs",
  authDomain: "bdd-capi.firebaseapp.com",
  projectId: "bdd-capi",
  storageBucket: "bdd-capi.firebasestorage.app",
  messagingSenderId: "244173223779",
  appId: "1:244173223779:web:d7a0e6077c3055f6854556"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let datosMeses = JSON.parse(JSON.stringify(datosIniciales));
let isAdmin = false; 

document.addEventListener('DOMContentLoaded', () => {
    initUI();
    calcularYRenderizar();
    renderizarDetalleAportes();
    escucharCambiosFirebase(); 
});

function escucharCambiosFirebase() {
    const coleccionRef = collection(db, "registros_mensuales");
    
    onSnapshot(coleccionRef, (snapshot) => {
        if (snapshot.empty) return;

        const mesesFirebase = {};
        snapshot.forEach((doc) => {
            const data = doc.data();
            mesesFirebase[data.mes] = data;
        });

        datosMeses = datosMeses.map(mesLocal => {
            return mesesFirebase[mesLocal.mes] ? mesesFirebase[mesLocal.mes] : mesLocal;
        });

        calcularYRenderizar();
        renderizarDetalleAportes();
    }, (error) => {
        console.error("Error al escuchar Firebase: ", error);
    });
}

// NUEVA FUNCIÓN: Borra todo en Firebase y sube los datos limpios
window.borrarYSubirDatos = async function() {
    if (!confirm("¡ATENCIÓN! Esto borrará TODOS los datos actuales en Firebase y los reemplazará por los de la planilla base. ¿Estás seguro?")) return;
    
    try {
        // 1. Borrar todos los documentos existentes
        const querySnapshot = await getDocs(collection(db, "registros_mensuales"));
        const promesasBorrado = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(promesasBorrado);
        console.log("Base de datos limpia.");

        // 2. Subir los datos nuevos desde data.js
        for (const mesData of datosIniciales) {
            const docId = `2026-${mesData.mes}`;
            await setDoc(doc(db, "registros_mensuales", docId), mesData);
        }
        
        alert("¡Base de datos reseteada con éxito! El error de los $592 ha sido eliminado.");
        document.getElementById('btn-seed').classList.add('hidden');
    } catch (error) {
        console.error("Error al resetear datos: ", error);
        alert("Hubo un error. Revisa la consola.");
    }
}

// LÓGICA DE ACCESO
window.pedirCodigo = function() {
    const codigo = prompt("Ingrese el código de administrador para editar:");
    if (codigo === "1965") {
        isAdmin = true;
        document.getElementById('tab-gastos').classList.remove('hidden');
        document.getElementById('tab-aportes').classList.remove('hidden');
        document.getElementById('btn-seed').classList.remove('hidden');
        document.getElementById('btn-unlock').classList.add('hidden');
        document.getElementById('btn-lock').classList.remove('hidden');
        showTab('gastos');
    } else if (codigo !== null) {
        alert("Código incorrecto. Acceso denegado.");
    }
}

window.cerrarSesion = function() {
    isAdmin = false;
    document.getElementById('tab-gastos').classList.add('hidden');
    document.getElementById('tab-aportes').classList.add('hidden');
    document.getElementById('btn-seed').classList.add('hidden');
    document.getElementById('btn-unlock').classList.remove('hidden');
    document.getElementById('btn-lock').classList.add('hidden');
    showTab('resumen');
}

// CÁLCULOS Y RENDERIZADO
function calcularYRenderizar() {
    const tbody = document.getElementById('tabla-resumen');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    let acumulado = saldoAnterior; 

    datosMeses.forEach((data, index) => {
        const totalExtras = data.gastos.extras.reduce((sum, item) => sum + item.monto, 0);
        const totalEgresos = data.gastos.epec + data.gastos.internet + data.gastos.seguro + totalExtras;

        const totalAportes = Object.values(data.aportes).reduce((sum, val) => sum + val, 0);
        const otrosIngresos = data.otrosIngresos || 0;
        const totalIngresos = totalAportes + otrosIngresos;

        const saldoMes = totalIngresos - totalEgresos;
        acumulado += saldoMes;

        const tr = document.createElement('tr');
        tr.className = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
        tr.innerHTML = `
            <td class="px-4 py-3 font-medium text-gray-900">${data.mes}</td>
            <td class="px-4 py-3 text-right">$${data.gastos.epec.toLocaleString('es-AR')}</td>
            <td class="px-4 py-3 text-right">$${data.gastos.internet.toLocaleString('es-AR')}</td>
            <td class="px-4 py-3 text-right">$${data.gastos.seguro.toLocaleString('es-AR')}</td>
            <td class="px-4 py-3 text-right text-xs text-gray-500">
                ${data.gastos.extras.map(e => `${e.descripcion}: $${e.monto.toLocaleString('es-AR')}`).join('<br>') || '-'}
            </td>
            <td class="px-4 py-3 text-right font-semibold text-red-600">$${totalEgresos.toLocaleString('es-AR')}</td>
            <td class="px-4 py-3 text-right font-semibold text-green-600">$${totalAportes.toLocaleString('es-AR')}</td>
            <td class="px-4 py-3 text-right text-green-700">$${otrosIngresos.toLocaleString('es-AR')}</td>
            <td class="px-4 py-3 text-right font-bold text-green-800 bg-green-50">$${totalIngresos.toLocaleString('es-AR')}</td>
            <td class="px-4 py-3 text-right font-bold ${acumulado >= 0 ? 'text-blue-700' : 'text-red-700'} bg-blue-50">
                $${acumulado.toLocaleString('es-AR')}
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function renderizarDetalleAportes() {
    const thead = document.getElementById('thead-detalle');
    const tbody = document.getElementById('tbody-detalle');
    if (!thead || !tbody) return;
    
    let headerHtml = `<th class="px-4 py-3 sticky-col-header">Vecino</th>`;
    datosMeses.forEach(m => {
        headerHtml += `<th class="px-4 py-3 text-right">${m.mes.substring(0, 3)}</th>`;
    });
    headerHtml += `<th class="px-4 py-3 text-right font-bold text-blue-700">Total Anual</th>`;
    thead.innerHTML = headerHtml;

    tbody.innerHTML = '';
    personas.forEach((persona, index) => {
        let totalPersona = 0;
        const bgClass = index % 2 === 0 ? 'bg-white' : 'bg-gray-50';
        
        let rowHtml = `<td class="px-4 py-3 font-medium sticky-col ${bgClass}">${persona}</td>`;
        
        datosMeses.forEach(m => {
            const aporte = m.aportes[persona] || 0;
            totalPersona += aporte;
            rowHtml += `<td class="px-4 py-3 text-right ${aporte > 0 ? 'text-green-600 font-semibold' : 'text-gray-300'}">
                ${aporte > 0 ? '$' + aporte.toLocaleString('es-AR') : '-'}
            </td>`;
        });
        
        rowHtml += `<td class="px-4 py-3 text-right font-bold text-blue-700 bg-blue-50">$${totalPersona.toLocaleString('es-AR')}</td>`;
        
        const tr = document.createElement('tr');
        tr.className = bgClass;
        tr.innerHTML = rowHtml;
        tbody.appendChild(tr);
    });
}

// FORMULARIOS
function initUI() {
    const selectGastos = document.getElementById('gasto-mes');
    const selectAportes = document.getElementById('aporte-mes');
    const selectVecino = document.getElementById('aporte-vecino');

    datosMeses.forEach((data, index) => {
        selectGastos.add(new Option(data.mes, index));
        selectAportes.add(new Option(data.mes, index));
    });

    personas.forEach(persona => {
        selectVecino.add(new Option(persona, persona));
    });

    document.getElementById('form-gastos').addEventListener('submit', guardarGastos);
    document.getElementById('form-aportes').addEventListener('submit', guardarAportes);
    
    cargarDatosFormularioGastos();
    selectGastos.addEventListener('change', cargarDatosFormularioGastos);
}

function cargarDatosFormularioGastos() {
    const index = document.getElementById('gasto-mes').value;
    const data = datosMeses[index];
    
    document.getElementById('gasto-epec').value = data.gastos.epec || '';
    document.getElementById('gasto-internet').value = data.gastos.internet || '';
    document.getElementById('gasto-seguro').value = data.gastos.seguro || '';
    document.getElementById('gasto-otros-ingresos').value = data.otrosIngresos || ''; 
    
    const listaExtras = document.getElementById('lista-extras');
    listaExtras.innerHTML = '';
    data.gastos.extras.forEach(extra => {
        agregarExtra(extra.descripcion, extra.monto);
    });
}

window.agregarExtra = function(desc = '', monto = '') {
    const div = document.createElement('div');
    div.className = 'flex gap-2 items-center';
    div.innerHTML = `
        <input type="text" placeholder="Descripción (ej: Pintura)" value="${desc}" class="flex-1 rounded-md border-gray-300 shadow-sm p-2 border text-sm extra-desc">
        <input type="number" placeholder="Monto" value="${monto}" class="w-32 rounded-md border-gray-300 shadow-sm p-2 border text-sm extra-monto">
        <button type="button" onclick="this.parentElement.remove()" class="text-red-500 hover:text-red-700"><i class="fas fa-trash"></i></button>
    `;
    document.getElementById('lista-extras').appendChild(div);
}

async function guardarGastos(e) {
    e.preventDefault();
    if (!isAdmin) return;

    const index = document.getElementById('gasto-mes').value;
    const extras = [];
    
    document.querySelectorAll('#lista-extras .flex').forEach(div => {
        const desc = div.querySelector('.extra-desc').value;
        const monto = parseFloat(div.querySelector('.extra-monto').value);
        if(desc && !isNaN(monto)) {
            extras.push({ descripcion: desc, monto: monto });
        }
    });

    datosMeses[index].gastos = {
        epec: parseFloat(document.getElementById('gasto-epec').value) || 0,
        internet: parseFloat(document.getElementById('gasto-internet').value) || 0,
        seguro: parseFloat(document.getElementById('gasto-seguro').value) || 0,
        extras: extras
    };
    
    datosMeses[index].otrosIngresos = parseFloat(document.getElementById('gasto-otros-ingresos').value) || 0;

    const data = datosMeses[index];
    const docId = `2026-${data.mes}`;
    try {
        await setDoc(doc(db, "registros_mensuales", docId), data, { merge: true });
        alert('Gastos y Otros Ingresos guardados');
    } catch (error) {
        console.error("Error al guardar: ", error);
        alert('Error al guardar en la nube');
    }
}

async function guardarAportes(e) {
    e.preventDefault();
    if (!isAdmin) return;

    const index = document.getElementById('aporte-mes').value;
    const vecino = document.getElementById('aporte-vecino').value;
    const monto = parseFloat(document.getElementById('aporte-monto').value) || 0;

    datosMeses[index].aportes[vecino] = monto;
    
    const data = datosMeses[index];
    const docId = `2026-${data.mes}`;
    try {
        await setDoc(doc(db, "registros_mensuales", docId), data, { merge: true });
        document.getElementById('aporte-monto').value = '';
        alert(`Pago de ${vecino} registrado para ${data.mes}`);
    } catch (error) {
        console.error("Error al guardar: ", error);
        alert('Error al guardar en la nube');
    }
}

window.showTab = function(tabId) {
    if (!isAdmin && (tabId === 'gastos' || tabId === 'aportes')) {
        alert("Acceso denegado. Ingrese el código primero.");
        return;
    }

    document.querySelectorAll('main > section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(`view-${tabId}`).classList.remove('hidden');
    
    document.querySelectorAll('header + div button').forEach(btn => {
        btn.className = 'pb-2 tab-inactive whitespace-nowrap';
    });
    document.getElementById(`tab-${tabId}`).className = 'pb-2 tab-active whitespace-nowrap';
}