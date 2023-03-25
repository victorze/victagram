# Victagram

[victagram.webm](https://user-images.githubusercontent.com/22132891/193479132-6ecc6391-e190-417d-8c89-cd5be7ad08d0.webm)

## Configurar un entorno de desarrollo

Clonar el repositorio e instalar dependencias

```bash
git clone https://github.com/victorze/victagram.git
cd victagram
npm install
cd frontend && npm install
```

- Verificar que el servidor MongoDB se encuentre activo y funcionando
- Crear un archivo .env: `cp .env.example .env`
- Ejecutar el servidor: `npm run dev`
- Ejecutar el cliente: `cd frontend && npm run dev`

## Configurar un entorno de producción

- Establecer las variables de entorno `MONGODB_URI` y `SECRET_JWT`
- Instalar dependencias del cliente: `cd frontend && npm install`
- Compilar el frontend: `cd frontend && npm run build`
- Instalar dependencias del servidor: `npm install`
- Ejecutar el servidor: `npm start`
