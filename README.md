# Victagram

https://user-images.githubusercontent.com/22132891/172541857-9d8db33c-8ac7-4bee-895a-731eb1de5593.mp4

## Configurar un entorno de desarrollo

### Backend

* Verificar que el servidor MongoDB se encuentre activo y funcionando
* Entrar en la carpeta del servidor web: `cd api`
* Crear un archivo .env: `cp .env.example .env`
* Instalar dependencias: `npm install`
* Ejecutar el servidor: `npm run dev`

### Frontend

* Entrar en la carpeta del cliente: `cd client`
* Instalar dependencias: `npm install`
* Ejecutar el cliente: `npm start`

## Configurar un entorno de producción

* Establecer las variables de entorno `MONGODB_URI` y `SECRET_JWT`
* Compilar el frontend: `cd client && npm run build`
* Ejecutar el servidor: `cd api && npm start`
