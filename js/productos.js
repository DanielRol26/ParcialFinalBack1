const ENDPOINT = '/productos';
let allData = [];
let deleteId = null;

document.addEventListener('DOMContentLoaded', loadData);

async function loadData() {
    showLoading('tableContent');
    try {
        allData = await apiRequest(ENDPOINT);
        renderTable(allData);
    } catch (error) {
        showEmpty('tableContent', 'fa-plug', 'No se pudo conectar con la API');
        showToast('Error al cargar productos. ¿Tu API está corriendo?', 'error');
    }
}

function renderTable(data) {
    const container = document.getElementById('tableContent');
    if (!data || data.length === 0) {
        showEmpty('tableContent', 'fa-box', 'No hay productos registrados');
        return;
    }

    let html = `
        <table class="table-custom">
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>`;

    data.forEach(item => {
        const statusClass = item.activo ? 'badge-active' : 'badge-inactive';
        const statusText = item.activo ? 'Activo' : 'Inactivo';
        html += `
                <tr>
                    <td>${item.nombre || '—'}</td>
                    <td><span class="badge-custom badge-platform">${item.categoria || '—'}</span></td>
                    <td><strong>$${(item.precio || 0).toLocaleString('en-US', {minimumFractionDigits: 2})}</strong></td>
                    <td>${item.stock != null ? item.stock : '—'}</td>
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
        (item.nombre || '').toLowerCase().includes(query) ||
        (item.categoria || '').toLowerCase().includes(query) ||
        (item.descripcion || '').toLowerCase().includes(query)
    );
    renderTable(filtered);
}

function openModal(item = null) {
    document.getElementById('entityForm').reset();
    document.getElementById('entityId').value = '';
    document.getElementById('activo').checked = true;

    if (item) {
        document.getElementById('modalTitle').textContent = 'Editar Producto';
        document.getElementById('entityId').value = item.id;
        document.getElementById('nombre').value = item.nombre || '';
        document.getElementById('descripcion').value = item.descripcion || '';
        document.getElementById('precio').value = item.precio || '';
        document.getElementById('categoria').value = item.categoria || '';
        document.getElementById('stock').value = item.stock != null ? item.stock : '';
        document.getElementById('activo').checked = item.activo !== false;
    } else {
        document.getElementById('modalTitle').textContent = 'Nuevo Producto';
    }

    new bootstrap.Modal(document.getElementById('formModal')).show();
}

async function editEntity(id) {
    try {
        const item = await apiRequest(`${ENDPOINT}/${id}`);
        openModal(item);
    } catch (error) {
        showToast('Error al cargar el producto', 'error');
    }
}

async function saveEntity() {
    const id = document.getElementById('entityId').value;
    const body = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        precio: parseFloat(document.getElementById('precio').value) || 0,
        categoria: document.getElementById('categoria').value,
        stock: parseInt(document.getElementById('stock').value) || 0,
        activo: document.getElementById('activo').checked,
    };

    if (!body.nombre || !body.categoria) {
        showToast('Por favor completa los campos obligatorios', 'error');
        return;
    }

    try {
        if (id) {
            await apiRequest(`${ENDPOINT}/${id}`, 'PUT', body);
            showToast('Producto actualizado correctamente');
        } else {
            await apiRequest(ENDPOINT, 'POST', body);
            showToast('Producto creado correctamente');
        }
        bootstrap.Modal.getInstance(document.getElementById('formModal')).hide();
        loadData();
    } catch (error) {
        showToast('Error al guardar el producto', 'error');
    }
}

function confirmDelete(id) {
    deleteId = id;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    document.getElementById('confirmDeleteBtn').onclick = async () => {
        try {
            await apiRequest(`${ENDPOINT}/${deleteId}`, 'DELETE');
            showToast('Producto eliminado correctamente');
            modal.hide();
            loadData();
        } catch (error) {
            showToast('Error al eliminar el producto', 'error');
        }
    };
    modal.show();
}
