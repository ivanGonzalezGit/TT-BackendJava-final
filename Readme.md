#TT-BackendJava-final

Instrucciones para correr la aplicación en local

1- Clonar repositorio

2- Backend:
    Correr la aplicación con el botón play o con mvn spring-boot:run (si mvn está instalado globalmente, sino instalarlo y agregar la carpeta /bin a la variable de entorno del sistema)

3- Frontend:
    3.1 Abrir el repositorio en el editor de código
    3.2 Abrir una terminal e ingresar a la carpeta './frontend'
    3.3 Correr el comando <npm install> para instalar las bibliotecas y dependencias listadas en el package.json
    3.4 Correr el comando <npm run dev> para iniciar la aplicación React
    3.5 Abrir un navegador a ingresar a la dirección localhost:5173, se debería ver la aplicación corriendo

Importante: no está hasheada la contraseña de administrador en el backend ni se encuentra el archivo .env por que está pensado para descargar en local, por lo que se debe mejorar la seguridad para la próxima versión.