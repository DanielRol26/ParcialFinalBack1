const ENDPOINT = '/testimonios';
let allData = [];
let deleteId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    document.getElementById('fecha').value = todayISO();
});

async function loadData() {
    showLoading('tableContent');
    try {
        allData = await apiRequest(ENDPOINT);
        renderTable(allData);
    } catch (error) {
        showEmpty('tableContent', 'fa-plug', 'No se pudo conectar con la API');
        showToast('Error al cargar testimonios. ¿Tu API está corriendo?', 'error');
    }
}

function renderStars(rating) {
    const n = parseInt(rating) || 0;
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= n ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    }
    return `<span class="stars">${stars}</span>`;
}

function renderTable(data) {
    const container = document.getElementById('tableContent');
    if (!data || data.length === 0) {
        showEmpty('tableContent', 'fa-star', 'No hay testimonios registrados');
        return;
    }

    let html = `
        <table class="table-custom">
            <thead>
                <tr>
                    <th>Cliente</th>
                    <th>Mensaje</th>
                    <th>Calificación</th>
                    <th>Fecha</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>`;

    data.forEach(item => {
        const statusClass = item.aprobado ? 'badge-active' : 'badge-inactive';
        const statusText = item.aprobado ? 'Aprobado' : 'Pendiente';
        const shortMessage = (item.mensaje || '').length > 60
            ? (item.mensaje || '').substring(0, 60) + '...'
            : (item.mensaje || '—');
        html += `
                <tr>
                    <td>${item.nombreCliente || '—'}</td>
                    <td>${shortMessage}</td>
                    <td>${renderStars(item.calificacion)}</td>
                    <td>${formatDate(item.fecha)}</td>
                    <td><span class="badge-custom ${statusClass}">${statusText}</span></td>
                    <td>
                        <div class="table-actions">
                            <button class="btn-action btn-edit" title="Editar" onclick="editEntity(${item.id})">
                                <i class="fas fa-pen"></i>
                            </button>
                            <button class="btn-action btn-delete" title="Eliminar" onclick="confirmDelete(${item.id})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>`;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

function filterTable() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allData.filter(item =>
        (item.nombreCliente || '').toLowerCase().includes(query) ||
        (item.mensaje || '').toLowerCase().includes(query)
    );
    renderTable(filtered);
}

function openModal(item = null) {
    document.getElementById('entityForm').reset();
    document.getElementById('entityId').value = '';
    document.getElementById('fecha').value = todayISO();
    document.getElementById('aprobado').checked = true;

    if (item) {
        document.getElementById('modalTitle').textContent = 'Editar Testimonio';
        document.getElementById('entityId').value = item.id;
        document.getElementById('nombreCliente').value = item.nombreCliente || '';
        document.getElementById('mensaje').value = item.mensaje || '';
        document.getElementById('calificacion').value = item.calificacion || '';
        document.getElementById('fecha').value = item.fecha || '';
        document.getElementById('aprobado').checked = item.aprobado !== false;
    } else {
        document.getElementById('modalTitle').textContent = 'Nuevo Testimonio';
    }

    new bootstrap.Modal(document.getElementById('formModal')).show();
}

async function editEntity(id) {
    try {
        const item = await apiRequest(`${ENDPOINT}/${id}`);
        openModal(item);
    } catch (error) {
        showToast('Error al cargar el testimonio', 'error');
    }
}

async function saveEntity() {
    const id = document.getElementById('entityId').value;
    const body = {
        nombreCliente: document.getElementById('nombreCliente').value,
        mensaje: document.getElementById('mensaje').value,
        calificacion: parseInt(document.getElementById('calificacion').value) || 0,
        fecha: document.getElementById('fecha').value,
        aprobado: document.getElementById('aprobado').checked,
    };

    if (!body.nombreCliente || !body.mensaje || !body.calificacion) {
        showToast('Por favor completa los campos obligatorios', 'error');
        return;
    }

    try {
        if (id) {
            await apiRequest(`${ENDPOINT}/${id}`, 'PUT', body);
            showToast('Testimonio actualizado correctamente');
        } else {
            await apiRequest(ENDPOINT, 'POST', body);
            showToast('Testimonio creado correctamente');
        }
        bootstrap.Modal.getInstance(document.getElementById('formModal')).hide();
        loadData();
    } catch (error) {
        showToast('Error al guardar el testimonio', 'error');
    }
}

function confirmDelete(id) {
    deleteId = id;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    document.getElementById('confirmDeleteBtn').onclick = async () => {
        try {
            await apiRequest(`${ENDPOINT}/${deleteId}`, 'DELETE');
            showToast('Testimonio eliminado correctamente');
            modal.hide();
            loadData();
        } catch (error) {
            showToast('Error al eliminar el testimonio', 'error');
        }
    };
    modal.show();
}
