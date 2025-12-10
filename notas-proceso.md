-- Notas del Proceso de Desarrollo

En este desarrollo experimenté varios retos:

1. Validar la secuencia lógica de estados: Al principio no entendía muy bien como realizarlo, ya luego declaré una constante que contiene una clave y valor, donde almaceno los consecutivos o el flujo del valor al que puede cambiar el estado_pipeline. Luego con la funcion validarTransicion, recibo el estado, saco el valor siguiente y lo comparo con nuevoEstado, de esa forma se valida la secuencia lógica.

2. Realizar modularidad: Se separaron las validaciones en una carpeta aparte para respetar la modularidad de los componentes y la claridad del código.

3. Respuestas modificadas: Al principio al actualizar el estado, regresaba un mensaje de éxito y toda la información del asociado, lo modifiqué para que solo envie el mensaje de éxito y del asociado solo el nombre, estado y ultima_actualización, para no exponer datos sensibles.

4. Se manejaron variables de entorno para no exponer la URL o el Puerto, para no exponer datos sensibles.

5. Por último, me gustó la prueba, gracias.

