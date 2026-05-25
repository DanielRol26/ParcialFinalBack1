const ENDPOINT = '/clientes';
let allData = [];
let deleteId = null;

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    document.getElementById('fechaRegistro').value = todayISO();
});

async function loadData() {
    showLoading('tableContent');
    try {
        allData = await apiRequest(ENDPOINT);
        renderTable(allData);
    } catch (error) {
        showEmpty('tableContent', 'fa-plug', 'No se pudo conectar con la API');
        showToast('Error al cargar clientes. ¿Tu API está corriendo?', 'error');
    }
}

function renderTable(data) {
    const container = document.getElementById('tableContent');
    if (!data || data.length === 0) {
        showEmpty('tableContent', 'fa-users', 'No hay clientes registrados');
        return;
    }

    let html = `
        <table class="table-custom">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Ciudad</th>
                    <th>Fecha Registro</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>`;

    data.forEach(item => {
        html += `
                <tr>
                    <td>${item.nombre || ''} ${item.apellido || ''}</td>
                    <td>${item.email || '—'}</td>
                    <td>${item.telefono || '—'}</td>
                    <td>${item.ciudad || '—'}</td>
                    <td>${formatDate(item.fechaRegistro)}</td>
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
        (item.apellido || '').toLowerCase().includes(query) ||
        (item.email || '').toLowerCase().includes(query) ||
        (item.ciudad || '').toLowerCase().includes(query)
    );
    renderTable(filtered);
}

function openModal(item = null) {
    document.getElementById('entityForm').reset();
    document.getElementById('entityId').value = '';
    document.getElementById('fechaRegistro').value = todayISO();

    if (item) {
        document.getElementById('modalTitle').textContent = 'Editar Cliente';
        document.getElementById('entityId').value = item.id;
        document.getElementById('nombre').value = item.nombre || '';
        document.getElementById('apellido').value = item.apellido || '';
        document.getElementById('email').value = item.email || '';
        document.getElementById('telefono').value = item.telefono || '';
        document.getElementById('ciudad').value = item.ciudad || '';
        document.getElementById('fechaRegistro').value = item.fechaRegistro || '';
    } else {
        document.getElementById('modalTitle').textContent = 'Nuevo Cliente';
    }

    new bootstrap.Modal(document.getElementById('formModal')).show();
}

async function editEntity(id) {
    try {
        const item = await apiRequest(`${ENDPOINT}/${id}`);
        openModal(item);
    } catch (error) {
        showToast('Error al cargar el cliente', 'error');
    }
}

async function saveEntity() {
    const id = document.getElementById('entityId').value;
    const body = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        ciudad: document.getElementById('ciudad').value,
        fechaRegistro: document.getElementById('fechaRegistro').value,
    };

    if (!body.nombre || !body.apellido || !body.email) {
        showToast('Por favor completa los campos obligatorios', 'error');
        return;
    }

    try {
        if (id) {
            await apiRequest(`${ENDPOINT}/${id}`, 'PUT', body);
            showToast('Cliente actualizado correctamente');
        } else {
            await apiRequest(ENDPOINT, 'POST', body);
            showToast('Cliente creado correctamente');
        }
        bootstrap.Modal.getInstance(document.getElementById('formModal')).hide();
        loadData();
    } catch (error) {
        showToast('Error al guardar el cliente', 'error');
    }
}

function confirmDelete(id) {
    deleteId = id;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    document.getElementById('confirmDeleteBtn').onclick = async () => {
        try {
            await apiRequest(`${ENDPOINT}/${deleteId}`, 'DELETE');
            showToast('Cliente eliminado correctamente');
            modal.hide();
            loadData();
        } catch (error) {
            showToast('Error al eliminar el cliente', 'error');
        }
    };
    modal.show();
}
