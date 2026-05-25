// ============================================================
//  ⚙️  CONFIGURACIÓN — MODIFICA AQUÍ TU URL BASE
// ============================================================
const API_BASE_URL = 'http://localhost:8080/api';
// ============================================================

async function apiRequest(endpoint, method = 'GET', body = null) {
    const config = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (body) config.body = JSON.stringify(body);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
        const errorText = await response.text().catch(() => 'Error desconocido');
        throw new Error(`Error ${response.status}: ${errorText}`);
    }

    if (response.status === 204 || method === 'DELETE') return null;
    return response.json();
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const toast = document.createElement('div');
    toast.className = `toast-custom ${type}`;
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showLoading(containerId) {
    const el = document.getElementById(containerId);
    if (el) {
        el.innerHTML = `
            <div class="loading-overlay">
                <div class="spinner"></div>
            </div>`;
    }
}

function showEmpty(containerId, icon, message) {
    const el = document.getElementById(containerId);
    if (el) {
        el.innerHTML = `
            <div class="empty-state">
                <i class="fas ${icon}"></i>
                <h4>${message}</h4>
                <p>Haz clic en "Agregar" para crear el primer registro.</p>
            </div>`;
    }
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    return `${parseInt(parts[2])} ${months[parseInt(parts[1]) - 1]} ${parts[0]}`;
}

function todayISO() {
    return new Date().toISOString().split('T')[0];
}

// Scroll-aware navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-custom');
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Animate on scroll (Intersection Observer)
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});
