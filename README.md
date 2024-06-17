EN TU BARRIO - Proyecto final 4Geeks Full Stack Developer
![Captura de Pantalla 2024-06-17 a las 10 24 57](https://github.com/superteclas/EN-TU-BARRIO--Proyecto-final-4Geeks-Full-Stack-Developer/assets/147168257/f31d0e9c-37c6-446a-9e61-9a3422ee7cdb)

Este proyecto es una aplicación web desarrollada como parte del Bootcamp de Full Stack Developer en 4Geeks Academy. La aplicación tiene como objetivo conectar a los vecinos de un barrio, permitiendo compartir información y eventos locales.
Tecnologías Utilizadas

    Frontend: React, HTML, CSS, JavaScript
    Backend: Python, Flask, SQLAlchemy
    Base de Datos: PostgreSQL
    Otros: Docker, Git, Webpack

Instalación
Backend

    Clona el repositorio:

    bash

git clone https://github.com/superteclas/EN-TU-BARRIO--Proyecto-final-4Geeks-Full-Stack-Developer.git
cd EN-TU-BARRIO--Proyecto-final-4Geeks-Full-Stack-Developer

Instala los paquetes de Python:

bash

pipenv install

Crea un archivo .env basado en el archivo .env.example y configura tu base de datos:

bash

cp .env.example .env

Realiza las migraciones de la base de datos:

bash

pipenv run migrate
pipenv run upgrade

Llena la base de datos con datos de ejemplo:

bash

pipenv run flask fill-db-with-example-data

Ejecuta la aplicación:

bash

    pipenv run start

Frontend

    Instala las dependencias de Node.js:

    bash

npm install

Instala los paquetes adicionales:

bash

npm install @googlemaps/js-api-loader
npm install sweetalert2
npm install react-multi-carousel
npm install react-icons

Configura la clave de la API de Google Maps en el archivo .env:

env

REACT_APP_GOOGLE_MAPS_API_KEY=tu_clave_API

IMPORTANTE: La primera vez que pongas la clave en el archivo .env, reinicia el codespace para que surta efecto.

Inicia el servidor de desarrollo de Webpack:

bash

    npm run start

Mapa - Instrucciones

    Instalar el paquete:

    bash

npm install @googlemaps/js-api-loader

Poner la clave en el archivo .env para protegerla y poder ver el mapa:

env

    REACT_APP_GOOGLE_MAPS_API_KEY=tu_clave_API

    IMPORTANTE: La primera vez que pongas la clave en el archivo .env, reinicia el codespace para que surta efecto.

Demostración

Para ver cómo funciona la aplicación, visita el siguiente enlace de YouTube:
Ver en YouTube
Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

    Haz un fork del proyecto.
    Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
    Realiza los cambios y haz un commit (git commit -m 'Añadir nueva funcionalidad').
    Sube los cambios (git push origin feature/nueva-funcionalidad).
    Abre una solicitud de extracción.

Licencia

Este proyecto está bajo la licencia MIT. Para más detalles, consulta el archivo LICENSE.
Contributors

Este proyecto fue desarrollado por Jonay Bolaños, David Padilla, Adrian Torres, Juan Plasencia y Álvaro Ponce como parte del Bootcamp de 4Geeks Academy. Este template fue construido como parte del Coding Bootcamp por Alejandro Sanchez y muchos otros contribuyentes. Para más información sobre nuestros cursos de Full Stack Developer y Data Science.
Contacto

 Si tienes alguna pregunta o sugerencia, no dudes en contactarnos.
