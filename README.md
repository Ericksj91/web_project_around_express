TÍTULO: WEB_PROJECT_AROUND_EXPRESS
AUTOR: ERICK JIMÉNEZ
DESCRIPCIÓN: Esta es una API REST desarrollada con Node.js y Express. La API devuelve datos de usuarios y tarjetas que están guardados en archivos JSON. Las rutas están separadas en dos archivos distintos (uno para usuarios y otro para tarjetas) usando express.Router(), para que el código quede más organizado. Para leer los archivos se usa fs.readFile junto con path.join. También se agregó manejo de errores: si se pide un usuario que no existe, devuelve un 404, y si hay algún problema en el servidor, devuelve un 500. Se usó ESLint con la configuración de airbnb-base para mantener un estilo de código limpio.

TECNOLOGIAS USADAS: Node.js, Express.

Prueba la funcionalidad del proyecto en Postman con los siguientes enlaces: http://localhost:3000/users, http://localhost:3000/cards, para probar el id de usuario, entra en el enlace de users y selecciona cualquier id y ponlo después de users como se muestra en el ejemplo: http://localhost:3000/users/8340d0ec33270a25f2413b69
