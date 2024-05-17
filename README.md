
<!-- Descripción -->
<h1 align="center">Urban Treasures</h1>
<h3 align="center">Plataforma web interactiva donde los usuarios pueden registrarse para esconder o descubrir "tesoros urbanos"</h3>

<!-- Imagen Principal -->
<p align="center">
    <img src="https://res.cloudinary.com/dxzhssh9m/image/upload/v1715946972/Captura_de_pantalla_2024-05-17_134616_bescnw.png" alt="Urban Treasures" width="100%"/>
</p>

<!-- Funcionalidades -->
1. **Registro y login:**
    - El usuario rellena un formulario con los datos necesarios para crear su cuenta, y posteriormente se le redirige al login para que inicie sesión.
    <p align="center">
        <img src="https://res.cloudinary.com/dxzhssh9m/image/upload/v1715947422/Captura_de_pantalla_2024-05-17_135930_tezard.png" alt="Rankings de Usuarios" width="650px"/>
        <img src="https://res.cloudinary.com/dxzhssh9m/image/upload/v1715947424/Captura_de_pantalla_2024-05-17_135945_gaaw3n.png" alt="Rankings de Usuarios" width="650px"/>
    </p>
2. **Formulario para Esconder Tesoros:**
    - Los usuarios pueden ocultar objetos y compartir su ubicación mediante la aplicación de Google Maps, junto con un nombre descriptivo, imagen y pistas para encontrarlos.
    <p align="center">
        <img src="https://res.cloudinary.com/dxzhssh9m/image/upload/v1715946972/Captura_de_pantalla_2024-05-17_134742_kkibwg.png" alt="Formulario para Esconder Tesoros" width="650px"/>
    </p>

3. **Listado de Tesoros Ocultos:**
    - Esta sección muestra todos los tesoros escondidos, permitiendo a los usuarios filtrar la búsqueda por ciudad para encontrar los más cercanos.
    <p align="center">
        <img src="https://res.cloudinary.com/dxzhssh9m/image/upload/v1715946972/Captura_de_pantalla_2024-05-17_134722_pryhte.png" alt="Listado de Tesoros Ocultos" width="650px"/>
    </p>

4. **Rankings de Usuarios:**
    - Cada vez que un usuario esconde o encuentra un tesoro, se le suman 10 puntos. Los diez usuarios con mayores puntuaciones aparecen en los rankings. También reciben status especiales a través de un sistema de gamificación.
    <p align="center">
        <img src="https://res.cloudinary.com/dxzhssh9m/image/upload/v1715946971/Captura_de_pantalla_2024-05-17_134809_rapnwo.png" alt="Rankings de Usuarios" width="650px"/>
        <img src="https://res.cloudinary.com/dxzhssh9m/image/upload/v1715946971/Captura_de_pantalla_2024-05-17_134827_trbssy.png" alt="Rankings de Usuarios" width="650px"/>
    </p>

5. **Sección para Empresas:**
    - Las empresas pueden participar escondiendo "Tickets Dorados" y registrándolos en nuestro sitio. Los usuarios pueden encontrar estos tickets y canjearlos por productos en promoción, generando atención hacia las campañas publicitarias de la empresa.
    <p align="center">
        <img src="https://res.cloudinary.com/dxzhssh9m/image/upload/v1715946972/Captura_de_pantalla_2024-05-17_134934_o0btsu.png" alt="Sección para Empresas" width="650px"/>
    </p>

6. **Perfil de Usuario:**
    - Los usuarios pueden visualizar y editar su información personal, puntos acumulados, status, tesoros ocultos y encontrados, así como actualizar su foto de perfil y nombre de usuario.
    <p align="center">
        <img src="https://res.cloudinary.com/dxzhssh9m/image/upload/v1715946971/Captura_de_pantalla_2024-05-17_134848_pfdstg.png" alt="Perfil de Usuario" width="650px"/>
    </p>

7. **Adicionales:**
    - Formulario de Contacto: Para consultas o dudas sobre nuestro servicio.
    - Sección Sobre Nosotros: Para conocer más sobre nuestro equipo.
    - Flask mail: El usuario recibe un correo de bienvenida al registrarse y un correo cuando otro usuario encuentra un tesoro escondido por él.
    - Video de presentación: Hemos añadido a la sección principal un video presentando brevemente la web y sus funciones para darle un toque más dinámico y llamativo.
    - Chat Bot: Añadido un chat bot con una serie de preguntas comunes y sus respuestas

<!-- Tecnologías utilizadas -->
<h3 align="left">Tecnologías utilizadas:</h3>

<!-- Frontend -->
<h4 align="left">Frontend</h4>
<p align="left">
    - React, Javascript, HTML, CSS, Bootstrap, Axios
</p>

<!-- Backend -->
<h4 align="left">Backend</h4>
<p align="left">
    - Python, Flask, Flask SQLAlchemy, JWT, PostgreSQL
</p>

<!-- Seguridad de la Plataforma -->
<h3 align="left">Seguridad de la Plataforma:</h3>
<ul>
    <li>JWT (JSON Web Tokens): Implementamos JWT para gestionar la autenticación de los usuarios de forma segura.</li>
    <li>Bcrypt para Hash de Contraseñas: Usamos Bcrypt para cifrar las contraseñas de los usuarios antes de almacenarlas en nuestra base de datos.</li>
    <li>Verificación de Tesoros mediante Códigos Aleatorios: Generamos un código aleatorio que los usuarios deben ingresar para verificar la autenticidad de un tesoro encontrado. Esto no solo protege contra falsas reclamaciones, sino que también aumenta la emoción y la participación en la búsqueda del tesoro.</li>
    <

<h3 align="left">Vídeo de presentación: https://res.cloudinary.com/dxzhssh9m/video/upload/v1715946078/Compartir_pantalla_-_2024-05-17_13_39_52_ixmpsg.mp4</h3>
