# TALLER 2 - INTRODUCCIÓN AL DESARROLLO WEB/MÓVIL

## Realizado por Vicente Alarcón

# Introducción

Para la correcta ejecución del proyecto, se debe tener instalado los siguientes programas:

- [Node.js (v18.18.2)](https://nodejs.org/download/release/v18.18.2/node-v18.18.2-x64.msi)
- [Dotnet SDK v7.0.14](https://dotnet.microsoft.com/es-es/download/dotnet/thank-you/sdk-7.0.404-windows-x64-installer)
- [Git v2.43.0](https://git-scm.com/downloads)
- Puerto 3000 disponible
- Puerto 5163 disponible

# Instalación del proyecto

Abrir una consola de comando, y colocar lo siguiente:

```bash
 dotnet tool install --global dotnet-ef
```

Una vez instalado, clonar el repositorio en la carpeta deseada con el siguiente comando:

```bash
git clone https://github.com/VicenteA18UCN/TALLER2_VICENTE_ALARCON.git
```

Luego, ingresar a la carpeta del proyecto:

```bash
cd TALLER2_VICENTE_ALARCON
cd backend
```

Una vez dentro de la carpeta, ejecutar los siguientes comandos:

```bash
dotnet restore
dotnet ef database update
dotnet run
```

Luego abrir otra consola de comando, y colocar lo siguiente:

```bash
cd TALLER2_VICENTE_ALARCON
cd frontend
```

Una vez dentro de la carpeta, ejecutar los siguientes comandos:

```bash
npm install
npm start
```

## Uso

Para el uso de la aplicación, se debe ingresar a la siguiente dirección:

```bash
http://localhost:3000/
```
