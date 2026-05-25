const ENDPOINT = '/campanas';
let allData = [];
let deleteId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    document.getElementById('fechaInicio').value = todayISO();
});

async function loadData() {
    showLoading('tableContent');
    try {
        allData = await apiRequest(ENDPOINT);
        renderTable(allData);
    } catch (error) {
        showEmpty('tableContent', 'fa-plug', 'No se pudo conectar con la API');
        showToast('Error al cargar campañas. ¿Tu API está corriendo?', 'error');
    }
}

function renderTable(data) {
    const container = document.getElementById('tableContent');
    if (!data || data.length === 0) {
        showEmpty('tableContent', 'fa-bullhorn', 'No hay campañas registradas');
        return;
    }

    let html = `
        <table class="table-custom">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Plataforma</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Presupuesto</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>`;

    data.forEach(item => {
        html += `
                <tr>
                    <td>${item.nombre || '—'}</td>
                    <td><span class="badge-custom badge-platform"><i class="fas fa-hashtag me-1"></i>${item.plataforma || '—'}</span></td>
                    <td>${formatDate(item.fechaInicio)}</td>
                    <td>${formatDate(item.fechaFin)}</td>
                    <td><strong>$${(item.presupuesto || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}</strong></td>
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
        (item.nombre || '').toLowerCase().includes(query) ||
        (item.plataforma || '').toLowerCase().includes(query) ||
        (item.descripcion || '').toLowerCase().includes(query)
    );
    renderTable(filtered);
}

function openModal(item = null) {
    document.getElementById('entityForm').reset();
    document.getElementById('entityId').value = '';
    document.getElementById('fechaInicio').value = todayISO();

    if (item) {
        document.getElementById('modalTitle').textContent = 'Editar Campaña';
        document.getElementById('entityId').value = item.id;
        document.getElementById('nombre').value = item.nombre || '';
        document.getElementById('descripcion').value = item.descripcion || '';
        document.getElementById('plataforma').value = item.plataforma || '';
        document.getElementById('fechaInicio').value = item.fechaInicio || '';
        document.getElementById('fechaFin').value = item.fechaFin || '';
        document.getElementById('presupuesto').value = item.presupuesto || '';
    } else {
        document.getElementById('modalTitle').textContent = 'Nueva Campaña';
    }

    new bootstrap.Modal(document.getElementById('formModal')).show();
}

async function editEntity(id) {
    try {
        const item = await apiRequest(`${ENDPOINT}/${id}`);
        openModal(item);
    } catch (error) {
        showToast('Error al cargar la campaña', 'error');
    }
}

async function saveEntity() {
    const id = document.getElementById('entityId').value;
    const body = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        plataforma: document.getElementById('plataforma').value,
        fechaInicio: document.getElementById('fechaInicio').value,
        fechaFin: document.getElementById('fechaFin').value,
        presupuesto: parseFloat(document.getElementById('presupuesto').value) || 0,
    };

    if (!body.nombre || !body.plataforma || !body.fechaInicio || !body.fechaFin) {
        showToast('Por favor completa los campos obligatorios', 'error');
        return;
    }

    try {
        if (id) {
            await apiRequest(`${ENDPOINT}/${id}`, 'PUT', body);
            showToast('Campaña actualizada correctamente');
        } else {
            await apiRequest(ENDPOINT, 'POST', body);
            showToast('Campaña creada correctamente');
        }
        bootstrap.Modal.getInstance(document.getElementById('formModal')).hide();
        loadData();
    } catch (error) {
        showToast('Error al guardar la campaña', 'error');
    }
}

function confirmDelete(id) {
    deleteId = id;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    document.getElementById('confirmDeleteBtn').onclick = async () => {
        try {
            await apiRequest(`${ENDPOINT}/${deleteId}`, 'DELETE');
            showToast('Campaña eliminada correctamente');
            modal.hide();
            loadData();
        } catch (error) {
            showToast('Error al eliminar la campaña', 'error');
        }
    };
    modal.show();
}
