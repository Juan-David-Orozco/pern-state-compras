# Documentación - instalación y ejecución proyecto

Proyecto fullstack que corresponde a un aplicacion de carro de compras.
Esta constituido por la parte FrontEnd (React) y BackEnd (Node).
Se implementa la base de datos PostgreSQL

## Acciones Previas

Se debe realizar la recuperacion de la base de datos mediante el archivo
de respaldo (dump) que se adjunta al proyecto *(respaldo.sql)*. De esta manera, abrimos un terminal
como administrador, nos ubicamos en la raiz de PostgreSQL y ejecutamos el comando 

`psql -U postgres -W -d comprasDB < resplado.sql`

**El archivo de respaldo debe estar ubicado en la carpeta raiz de PostgreSQL!**

## Instalacion

Partimos de la instalacion de las dependencias de cada servidor. Nos ubicamos
en el directorio correspondiente, abrimos la terminal y ejecutamos `npm install`

**Nota: Como son dos servidores se deben instalar las dependencias del frontend y el backend!**

## Ejecucion

Abrimos dos terminales y ejecutamos ambos servidores. Ejecutamos los siguientes comandos
`npm run dev` y `npm start` en los directorios backend y frontend correspondientemente.

Los servidores se acceden desde el navegador a traves de las siguientes URL:

FrontEnd - *http://localhost:3000* |
BackEnd - *http://localhost:9000*

**Nota: Deben estar activos ambos servidores para el correcto funcionamiento de la aplicacion!**

