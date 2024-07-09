
# EN TU BARRIO - Proyecto final 4Geeks Full Stack Developer

<p align="center">
<img src="https://github.com/superteclas/EN-TU-BARRIO--Proyecto-final-4Geeks-Full-Stack-Developer/assets/147168257/82c25603-8aab-4430-a25e-3c9e93daddaf" alt="EN TU BARRIO Logo">
</p>

Este proyecto es una aplicación web desarrollada como parte del Bootcamp de Full Stack Developer en 4Geeks Academy. La aplicación tiene como objetivo conectar a los vecinos de un barrio, permitiendo compartir información y eventos locales.

![Captura de Pantalla 2024-06-17 a las 10 24 57](https://github.com/superteclas/EN-TU-BARRIO--Proyecto-final-4Geeks-Full-Stack-Developer/assets/147168257/0a87f16b-6681-47d5-9f41-4344be40bc6a)


## Demostración

Para ver cómo funciona la aplicación, visita el siguiente enlace de YouTube:
[Ver en YouTube](https://www.youtube.com/watch?v=SrZRXFhTtzs)

## Tecnologías Utilizadas
- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Python, Flask, SQLAlchemy
- **Base de Datos**: PostgreSQL
- **Otros**: Docker, Git, Webpack

## Instalación

### Backend
1. Clona el repositorio:
   ```bash
   git clone https://github.com/superteclas/EN-TU-BARRIO--Proyecto-final-4Geeks-Full-Stack-Developer.git
   cd EN-TU-BARRIO--Proyecto-final-4Geeks-Full-Stack-Developer
   ```

2. Instala los paquetes de Python:
   ```bash
   pipenv install
   ```

3. Crea un archivo `.env` basado en el archivo `.env.example` y configura tu base de datos:
   ```bash
   cp .env.example .env
   ```

4. Realiza las migraciones de la base de datos:
   ```bash
   pipenv run migrate
   pipenv run upgrade
   ```

5. Llena la base de datos con datos de ejemplo:
   ```bash
   pipenv run flask fill-db-with-example-data
   ```

6. Ejecuta la aplicación:
   ```bash
   pipenv run start
   ```

### Frontend
1. Instala las dependencias de Node.js:
   ```bash
   npm install
   ```

2. Instala los paquetes adicionales:
   ```bash
   npm install @googlemaps/js-api-loader
   npm install sweetalert2
   npm install react-multi-carousel
   npm install react-icons
   ```

3. Configura la clave de la API de Google Maps en el archivo `.env`:
   ```env
   REACT_APP_GOOGLE_MAPS_API_KEY=tu_clave
   ```

   **IMPORTANTE:** La primera vez que pongas la clave en el archivo `.env`, reinicia el codespace para que surta efecto.

4. Inicia el servidor de desarrollo de Webpack:
   ```bash
   npm run start
   ```


## Contribución
Las contribuciones son bienvenidas. Por favor, sigue estos pasos:
1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios y haz un commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Sube los cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre una solicitud de extracción.

## Licencia
Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo LICENSE.

## Contributors

Este proyecto fue desarrollado por Jonay Bolaños, David Padilla, Adrian Torres, Juan Plasencia y Álvaro Ponce como parte del Bootcamp de 4Geeks Academy. Este template fue construido como parte del Coding Bootcamp por Alejandro Sanchez y muchos otros contribuyentes. Para más información sobre cursos de Full Stack Developer y Data Science visita www.4geeksacademy.com


---
