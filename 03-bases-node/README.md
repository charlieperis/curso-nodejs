Esta es mi primera app


## Con el archivo app.js ejecutar en consola lo siguiente:
node app --base=5 
Esto genera un archivo .txt la tabla del 5 (ó cualquier número que se reemplace) hasta el 10, y lo guarda en al carpeta "tablas"


## Con el archivo app1.js ejecutar en consola lo siguiente:
node app1 listar --limite=20 --base 5 (ó) node app1 listar -l 20 -b 5  
node app1 crear --limite=20 --base 5 (ó) node app1 crear -l 20 -b 5

Esto genera la lista (si se una el comando listar, o crea un archivo .txt con la tabla en la carpeta tablas) de la tabla del 5 (ó cualquier número que se reemplace) hasta el 20 ó elimite que se reemplace por ese número.


## IMPORTANTE
Para ejecutar estas apps es importante instalar nodemon, yargs y colors de npm por cli