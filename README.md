# Ecommerce con Node.js, Express y MongoDB

Este proyecto es una aplicación web desarrollada con **Node.js**, **Express**, y **MongoDB**, que implementa un sistema de gestión de usuarios, productos, carritos de compra y tickets. El objetivo es crear una arquitectura escalable y mantenible utilizando patrones de diseño como **DAO (Data Access Object)** y **Repository Pattern**, además de aplicar buenas prácticas en la organización del código y la implementación de middleware para autenticación y autorización.

## Tabla de Contenidos

- [Características Principales](#características-principales)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución de la Aplicación](#ejecución-de-la-aplicación)
- [API Endpoints](#api-endpoints)
  - [Usuarios](#usuarios)
  - [Productos](#productos)
  - [Carritos](#carritos)
  - [Tickets](#tickets)
- [Patrones y Buenas Prácticas Implementadas](#patrones-y-buenas-prácticas-implementadas)
- [Middleware de Autenticación y Autorización](#middleware-de-autenticación-y-autorización)
- [DTOs (Data Transfer Objects)](#dtos-data-transfer-objects)
- [Cambio de Persistencia (MongoDB y Memoria)](#cambio-de-persistencia-mongodb-y-memoria)

## Características Principales

- **Gestión de Usuarios**: Registro, inicio de sesión y obtención del usuario actual.
- **Gestión de Productos**: Creación, actualización, eliminación y obtención de productos.
- **Gestión de Carritos**: Agregar productos al carrito y proceso de compra.
- **Generación de Tickets**: Creación de tickets al finalizar la compra.
- **Autenticación y Autorización**: Implementación de JWT para autenticación y middleware para autorización basada en roles.
- **Patrón Repository y DAO**: Abstracción de la lógica de acceso a datos.
- **Cambio de Persistencia**: Posibilidad de cambiar entre persistencia en MongoDB y en memoria.
- **Uso de DTOs**: Para transferir datos sin exponer información sensible.

## Estructura del Proyecto

```
├── src
│   ├── controllers
│   │   ├── user.controller.js
│   │   ├── product.controller.js
│   │   ├── cart.controller.js
│   │   └── ticket.controller.js
│   ├── dao
│   │   ├── factory.js
│   │   ├── mongo
│   │   │   ├── users.mongo.js
│   │   │   ├── products.mongo.js
│   │   │   └── carts.mongo.js
│   │   └── memory
│   │       ├── users.memory.js
│   │       ├── products.memory.js
│   │       └── carts.memory.js
│   ├── dto
│   │   └── UserDTO.js
│   ├── middlewares
│   │   ├── authenticateJWT.js
│   │   └── authorize.js
│   ├── models
│   │   ├── user.model.js
│   │   ├── product.model.js
│   │   ├── cart.model.js
│   │   └── ticket.model.js
│   ├── repositories
│   │   ├── users
│   │   │   ├── user.repository.js
│   │   │   ├── user.repository.mongo.js
│   │   │   └── user.repository.memory.js
│   │   ├── products
│   │   │   ├── product.repository.js
│   │   │   ├── product.repository.mongo.js
│   │   │   └── product.repository.memory.js
│   │   └── carts
│   │       ├── cart.repository.js
│   │       ├── cart.repository.mongo.js
│   │       └── cart.repository.memory.js
│   ├── routes
│   │   ├── users.router.js
│   │   ├── product.routes.js
│   │   ├── cart.routes.js
│   │   └── ticket.routes.js
│   ├── services
│   │   ├── usersService.js
│   │   ├── productsService.js
│   │   ├── cartsService.js
│   │   └── ticketsService.js
│   ├── config
│   │   └── passport.config.js
│   ├── app.js
│   └── server.js
├── .env
├── package.json
└── README.md
```

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```

2. **Instalar las dependencias:**

   ```bash
   cd tu-repositorio
   npm install
   ```

## Configuración

1. **Variables de Entorno:**

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/tu-base-de-datos
   SECRET_KEY=tu_clave_secreta_para_jwt
   PERSISTENCE=MONGO # O MEMORY para persistencia en memoria
   ```

2. **Configuración de la Persistencia:**

   - Para utilizar **MongoDB**, asegúrate de que `PERSISTENCE` esté configurado como `MONGO` y que `MONGODB_URI` apunte a tu instancia de MongoDB.
   - Para utilizar **persistencia en memoria**, establece `PERSISTENCE` como `MEMORY`.

## Ejecución de la Aplicación

```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`.

## API Endpoints

### Usuarios

- **Registro de Usuario**

  ```
  POST /users/register
  ```

  **Body:**

  ```json
  {
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan@example.com",
    "password": "contraseña123",
    "age": 30
  }
  ```

- **Inicio de Sesión**

  ```
  POST /users/login
  ```

  **Body:**

  ```json
  {
    "email": "juan@example.com",
    "password": "contraseña123"
  }
  ```

- **Obtener Usuario Actual**

  ```
  GET /users/current
  ```

  **Headers:**

  ```
  Authorization: Bearer <token_jwt>
  ```

### Productos

- **Obtener Todos los Productos**

  ```
  GET /products
  ```

- **Obtener Producto por ID**

  ```
  GET /products/:id
  ```

- **Crear Producto** (Solo Administradores)

  ```
  POST /products
  ```

  **Headers:**

  ```
  Authorization: Bearer <token_jwt>
  ```

  **Body:**

  ```json
  {
    "name": "Producto 1",
    "description": "Descripción del producto",
    "price": 99.99,
    "stock": 50,
    "category": "Categoría"
  }
  ```

- **Actualizar Producto** (Solo Administradores)

  ```
  PUT /products/:id
  ```

- **Eliminar Producto** (Solo Administradores)

  ```
  DELETE /products/:id
  ```

### Carritos

- **Agregar Producto al Carrito** (Solo Usuarios)

  ```
  POST /carts/add
  ```

  **Headers:**

  ```
  Authorization: Bearer <token_jwt>
  ```

  **Body:**

  ```json
  {
    "productId": "id_del_producto",
    "quantity": 2
  }
  ```

- **Finalizar Compra**

  ```
  POST /carts/:cid/purchase
  ```

  **Headers:**

  ```
  Authorization: Bearer <token_jwt>
  ```

  **Respuesta:**

  ```json
  {
    "status": "success",
    "message": "Purchase completed",
    "payload": {
      "ticket": {
        "code": "unique_code",
        "purchase_datetime": "2023-10-12T10:00:00.000Z",
        "amount": 199.98,
        "purchaser": "juan@example.com"
      },
      "productsNotProcessed": []
    }
  }
  ```

### Tickets

- **Nota:** Los tickets se generan automáticamente al finalizar una compra exitosa. No hay endpoints públicos para gestionar tickets.

## Patrones y Buenas Prácticas Implementadas

- **DAO (Data Access Object):** Abstracción de la lógica de acceso a datos, permitiendo cambiar fácilmente la fuente de datos.
- **Repository Pattern:** Encapsula la lógica de negocios y reglas de validación, proporcionando una interfaz para la capa de servicios.
- **Arquitectura en Capas:** Separación clara entre controladores, servicios, repositorios y DAOs.
- **Uso de DTOs:** Para transferir datos entre capas sin exponer información sensible.
- **Middleware de Autenticación y Autorización:** Gestión de acceso a rutas basadas en roles de usuario.
- **Gestión de Variables de Entorno:** Utilización de `dotenv` para manejar configuraciones sensibles.

## Middleware de Autenticación y Autorización

- **Autenticación:** Se implementa con JWT (JSON Web Tokens). Al iniciar sesión, el usuario recibe un token que debe incluir en las solicitudes posteriores.
- **Autorización:** Se utilizan middlewares para verificar el rol del usuario y permitir o denegar el acceso a ciertas rutas.
  - **Ejemplo:**
    - Solo los administradores pueden crear, actualizar y eliminar productos.
    - Solo los usuarios pueden agregar productos a su carrito.

## DTOs (Data Transfer Objects)

Se utilizan DTOs para enviar solo la información necesaria del usuario, evitando exponer datos sensibles como contraseñas.

**Ejemplo de UserDTO:**

```javascript
export default class UserDTO {
  constructor(user) {
    this.id = user.id || user._id;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.age = user.age;
    this.role = user.role;
  }
}
```

## Cambio de Persistencia (MongoDB y Memoria)

La aplicación soporta dos métodos de persistencia:

- **MongoDB:** Para un entorno de producción o desarrollo persistente.
- **Memoria:** Para pruebas rápidas o entornos donde no se requiere persistencia de datos.

**Configuración:**

En el archivo `.env`, establece la variable `PERSISTENCE`:

```env
PERSISTENCE=MONGO
```

o

```env
PERSISTENCE=MEMORY
```

El factory (`dao/factory.js`) gestiona la inicialización de los DAOs y repositorios según la configuración.

---

**Nota:** Asegúrate de tener instaladas todas las dependencias necesarias y de que tu entorno de desarrollo está correctamente configurado. Si tienes problemas al ejecutar la aplicación, revisa la configuración de las variables de entorno y los logs de error para identificar posibles conflictos.
