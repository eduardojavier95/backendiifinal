# Final Project - Backend II

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone url_to_repo
   ```

2. **Instalar las dependencias:**

   ```bash
   cd tu-repo
   npm install
   ```

## Configuración

1. **Variables de Entorno:**

   Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/db
   SECRET_KEY=secret_key
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
