# 🎯 Evaluación Final — Desarrollo Backend con Spring Boot

## 🚀 InfluConnect: Plataforma de Gestión de Clientes para Influencers

---

### 📋 Descripción del Proyecto

**InfluConnect** es una plataforma diseñada para que influencers gestionen sus clientes, campañas publicitarias, productos promocionados y testimonios de manera centralizada. Tu misión como desarrollador backend es construir la **API REST** que alimente esta plataforma.

> 💡 **Nota:** El frontend ya está construido y listo para consumir tu API. Solo necesitas desarrollar el backend correctamente y configurar los endpoints para que todo funcione.

---

### 🎯 Objetivo General

Diseñar e implementar una **API REST completa** utilizando **Spring Boot** con arquitectura por capas:

```
📦 Modelo → 📂 Repositorio → ⚙️ Servicio → 🌐 Controlador
```

**No se requieren relaciones entre tablas.** Cada entidad es independiente.

---

### 🛠️ Tecnologías Requeridas

| Tecnología | Versión Mínima | Propósito |
|:----------:|:--------------:|:---------:|
| ☕ Java | 17+ | Lenguaje principal |
| 🍃 Spring Boot | 3.x | Framework backend |
| 🗄️ Spring Data JPA | — | Persistencia de datos |
| 🐬 H2 | Base de datos |
| 📮 Postman/Thunderclient | Última | Pruebas de endpoints |

---

### 📊 Modelos de Datos (4 Tablas)

A continuación se describen las **4 entidades** que debes implementar. Cada tabla es independiente (sin relaciones).

---

#### 👤 1. Cliente (`clientes`)

Representa a los seguidores o clientes registrados del influencer.

| Campo | Tipo Java | Tipo BD | Descripción |
|:-----:|:---------:|:-------:|:-----------:|
| `id` | `Long` | `BIGINT` (PK, Auto) | Identificador único |
| `nombre` | `String` | `VARCHAR(100)` | Nombre del cliente |
| `apellido` | `String` | `VARCHAR(100)` | Apellido del cliente |
| `email` | `String` | `VARCHAR(150)` | Correo electrónico |
| `telefono` | `String` | `VARCHAR(20)` | Número de teléfono |
| `ciudad` | `String` | `VARCHAR(100)` | Ciudad de residencia |
| `fechaRegistro` | `String` | `VARCHAR(10)` | Fecha de registro (YYYY-MM-DD) |

**Endpoint base:** `http://localhost:8080/api/clientes`

---

#### 📢 2. Campaña (`campanas`)

Representa las campañas publicitarias que maneja el influencer.

| Campo | Tipo Java | Tipo BD | Descripción |
|:-----:|:---------:|:-------:|:-----------:|
| `id` | `Long` | `BIGINT` (PK, Auto) | Identificador único |
| `nombre` | `String` | `VARCHAR(150)` | Nombre de la campaña |
| `descripcion` | `String` | `VARCHAR(500)` | Descripción detallada |
| `plataforma` | `String` | `VARCHAR(50)` | Plataforma (Instagram, TikTok, YouTube, Twitter) |
| `fechaInicio` | `String` | `VARCHAR(10)` | Fecha de inicio (YYYY-MM-DD) |
| `fechaFin` | `String` | `VARCHAR(10)` | Fecha de finalización (YYYY-MM-DD) |
| `presupuesto` | `Double` | `DOUBLE` | Presupuesto asignado en USD |

**Endpoint base:** `http://localhost:8080/api/campanas`

---

#### 🛍️ 3. Producto (`productos`)

Representa los productos que el influencer promociona o vende.

| Campo | Tipo Java | Tipo BD | Descripción |
|:-----:|:---------:|:-------:|:-----------:|
| `id` | `Long` | `BIGINT` (PK, Auto) | Identificador único |
| `nombre` | `String` | `VARCHAR(150)` | Nombre del producto |
| `descripcion` | `String` | `VARCHAR(500)` | Descripción del producto |
| `precio` | `Double` | `DOUBLE` | Precio en USD |
| `categoria` | `String` | `VARCHAR(100)` | Categoría (Belleza, Tecnología, Moda, Fitness, Alimentación) |
| `stock` | `Integer` | `INT` | Cantidad disponible |
| `activo` | `Boolean` | `BOOLEAN` | ¿Está activo para promoción? |

**Endpoint base:** `http://localhost:8080/api/productos`

---

#### ⭐ 4. Testimonio (`testimonios`)

Representa las reseñas y testimonios de clientes satisfechos.

| Campo | Tipo Java | Tipo BD | Descripción |
|:-----:|:---------:|:-------:|:-----------:|
| `id` | `Long` | `BIGINT` (PK, Auto) | Identificador único |
| `nombreCliente` | `String` | `VARCHAR(150)` | Nombre del cliente que da el testimonio |
| `mensaje` | `String` | `VARCHAR(1000)` | Contenido del testimonio |
| `calificacion` | `Integer` | `INT` | Calificación del 1 al 5 |
| `fecha` | `String` | `VARCHAR(10)` | Fecha del testimonio (YYYY-MM-DD) |
| `aprobado` | `Boolean` | `BOOLEAN` | ¿Está aprobado para mostrar? |

**Endpoint base:** `http://localhost:8080/api/testimonios`

---

### 🔗 Endpoints Requeridos (por cada entidad)

Debes implementar los **5 endpoints CRUD** para **cada una** de las 4 entidades:

| Método HTTP | Ruta | Acción | Código Éxito |
|:-----------:|:----:|:------:|:------------:|
| `GET` | `/api/{entidad}` | 📋 Listar todos los registros | `200 OK` |
| `GET` | `/api/{entidad}/{id}` | 🔍 Obtener un registro por ID | `200 OK` |
| `POST` | `/api/{entidad}` | ➕ Crear un nuevo registro | `201 Created` |
| `PUT` | `/api/{entidad}/{id}` | ✏️ Actualizar un registro existente | `200 OK` |
| `DELETE` | `/api/{entidad}/{id}` | 🗑️ Eliminar un registro por ID | `204 No Content` |

> ⚠️ **Total de endpoints:** 20 (5 por cada entidad × 4 entidades)

---

### 📁 Estructura del Proyecto Spring Boot

```
src/main/java/com/influconnect/
├── 📦 model/
│   ├── Cliente.java
│   ├── Campana.java
│   ├── Producto.java
│   └── Testimonio.java
├── 📂 repository/
│   ├── ClienteRepository.java
│   ├── CampanaRepository.java
│   ├── ProductoRepository.java
│   └── TestimonioRepository.java
├── ⚙️ service/
│   ├── ClienteService.java
│   ├── CampanaService.java
│   ├── ProductoService.java
│   └── TestimonioService.java
└── 🌐 controller/
    ├── ClienteController.java
    ├── CampanaController.java
    ├── ProductoController.java
    └── TestimonioController.java
```

---

### 🌐 Conexión con el Frontend

1. Abre el archivo `frontend/js/api.js`
2. Verifica que la URL base apunte a tu servidor:
   ```javascript
   const API_BASE_URL = 'http://localhost:8080/api';
   ```
3. Abre `frontend/index.html` en tu navegador
4. Navega a cada módulo y verifica que el CRUD funcione correctamente

---

### ✅ Criterios de Evaluación

| Criterio | Puntos | Descripción |
|:--------:|:------:|:-----------:|
| 📦 Modelos | **15%** | Entidades JPA correctamente definidas con anotaciones |
| 📂 Repositorios | **10%** | Interfaces extendiendo `JpaRepository` |
| ⚙️ Servicios | **20%** | Lógica de negocio con los 5 métodos CRUD |
| 🌐 Controladores | **25%** | Endpoints REST correctos con anotaciones HTTP |
| 🔗 Integración | **20%** | El frontend consume la API sin errores |
| 📮 Postman | **10%** | Colección de pruebas exportada |

---



### 🚨 Reglas Importantes

1. ❌ **No** se permite el uso de inteligencia artificial para generar el código
2. ❌ **No** se permiten relaciones entre tablas (`@OneToMany`, `@ManyToOne`, etc.)
3. ✅ Cada entidad debe ser **completamente independiente**
4. ✅ Todos los endpoints deben responder en formato **JSON**
5. ✅ La API debe correr en el puerto **8080**
6. ✅ Debes usar **MySQL** como base de datos
7. ✅ El código debe compilar y ejecutar **sin errores**

---

### 💪 ¡Éxitos!

> _"El mejor código es el que funciona, se entiende y resuelve un problema real."_

Demuestra tus habilidades construyendo una API sólida y profesional. El frontend está esperando por tu backend. 🔥

---

**Desarrollado con ❤️ para la formación de futuros desarrolladores backend.**
