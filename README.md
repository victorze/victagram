# Victagram

https://user-images.githubusercontent.com/22132891/172541857-9d8db33c-8ac7-4bee-895a-731eb1de5593.mp4

## Configurar un entorno de desarrollo

* Instalar dependencias del backend y frontend `yarn install`

### Backend

* Verificar que el servidor MongoDB se encuentre activo y funcionando
* Crear un archivo .env en la carpeta api: `cp api/.env.example api/.env`
* Ejecutar el servidor (desde la raiz del proyecto): `yarn workspace api dev`

### Frontend

* Ejecutar el cliente (desde la raiz del proyecto): `yarn workspace client start`

## Configurar un entorno de producción

* Establecer las variables de entorno `MONGODB_URI` y `SECRET_JWT`
* Instalar dependencias: `yarn install`
* Compilar el frontend: `yarn workspace client build`
* Ejecutar el servidor: `yarn workspace api start`
