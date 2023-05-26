# App Citas Full Stack

Esta es una aplicación para que los clientes puedan pedir cita para que un empleado del negocio les realice un servicio, en este caso el ejemplo lo haremos con una tienda de informática.

## Instalación

Una vez clonado el repositorio o descargados los archivos haremos unas instalaciones necesarias, tanto en el Backend como en el Frontend.

### Backend

Entraremos en la carpeta back.

```bash
  cd back
```

Instalaremos las dependencias (necesario tener [PHP](https://www.php.net/downloads) y [Composer](https://getcomposer.org/) instalados).

```bash
  composer install
```

Ahora vamos a crearnos una cuenta en [MailTrap](https://mailtrap.io/) en caso de no tenerla y nos iremos a la parte de Email Testing, en Inboxes y entraremos en el que nos dan de forma gratuita para hacer pruebas, una vez dentro en SMT Settings iremos a la parte de Integrations y seleccionaremos Laravel 7+.

![plot](./front/Capturas%20Readme/mailtrap.png)

Ahora abriremos el archivo **.env.example** y lo duplicaremos, ese duplicado lo renombraremos como **.env** y añadiremos algunos datos, como por ejemplo el nombre de la base de datos que será **citas**, y también las credenciales que nos ha proporcionado MailTrap.

![plot](./front/Capturas%20Readme/env1.png)
![plot](./front/Capturas%20Readme/env2.png)

Ahora vamos a ejecutar unos cuantos comandos, entre varias cosas para crear la base de datos, generar una key de encriptación y poder hacer funcionar el sistema de login (que es Passport).

```bash
    php artisan migrate
    php artisan key:generate
    php artisan passport:install
```

Y vamos a ejecutar el siguiente comando para tener un usuario por defecto (revisar el archivo UserSeeder en database/seeders para ver las contraseñas sin cifrar).

```bash
    php artisan db:seed --class=UserSeeder
```

Para terminar con el backend lanzaremos el siguiente comando para ejecutar Laravel (importante estar ejecutando un servidor de base de datos para que funcione).

```bash
    php artisan serve
```

### Frontend

Ahora volveremos a la carpeta raíz del proyecto.

```bash
    cd ..
```

Iremos a la carpeta front e instalaremos las dependencias (requiere tener [npm](https://nodejs.org/es) instalado).

```bash
  cd front
  npm install
```

Una vez finalizada la instalación, ejecutaremos el siguiente comando para abrir la aplicación en nuestro navegador por defecto (requiere tener instalado [Angular CLI](https://angular.io/cli) de manera global).

```bash
  ng serve --open
```

## Capturas y explicación

Lo primero que veremos al ejecutar será la pantalla de login, debajo del botón también la opción de registrarse como cliente.

![App Screenshot](./front/Capturas%20Readme/login.png)
![App Screenshot](./front/Capturas%20Readme/register.png)

Vamos a empezar accediendo con el usuario administrador que creamos con el seeder, luego más tarde registraremos un usuario para pedir cita.

Nada más entrar entraremos en la configuración del usuario, podemos editar nuestro propio perfil, pero nadie puede borrar ni editar el nuestro.

![App Screenshot](./front/Capturas%20Readme/config.png)

Vamos a empezar entrando en la parte de empleados, donde podremos verlos, crearlos, editarlos y eliminarlos.

![App Screenshot](./front/Capturas%20Readme/empleados.png)
![App Screenshot](./front/Capturas%20Readme/crear-empleado.png)
![App Screenshot](./front/Capturas%20Readme/editar-empleado.png)
![App Screenshot](./front/Capturas%20Readme/eliminar-empleado.png)

Ahora vamos a hacer lo mismo pero con los servicios.

![App Screenshot](./front/Capturas%20Readme/servicios.png)
![App Screenshot](./front/Capturas%20Readme/crear-servicio.png)
![App Screenshot](./front/Capturas%20Readme/editar-servicio.png)
![App Screenshot](./front/Capturas%20Readme/eliminar-servicio.png)

Ahora veremos las fechas, las cuales van asociadas a un empleado concreto, para luego relacionar también las horas con el empleado.

![App Screenshot](./front/Capturas%20Readme/fechas.png)
![App Screenshot](./front/Capturas%20Readme/crear-fecha.png)
![App Screenshot](./front/Capturas%20Readme/editar-fecha.png)
![App Screenshot](./front/Capturas%20Readme/eliminar-fecha.png)

Y para terminar con el administrador vamos a crear una hora asociada a una fecha (y por ende a un empleado).

![App Screenshot](./front/Capturas%20Readme/horas.png)
![App Screenshot](./front/Capturas%20Readme/crear-hora.png)
![App Screenshot](./front/Capturas%20Readme/editar-hora.png)
![App Screenshot](./front/Capturas%20Readme/eliminar-hora.png)

Ahora vamos a registrarnos con un usuario y pedir cita, durante el proceso de pedir citas irán apareciendo las distintas opciones, cuando un empleado no tenga fecha o esa fecha no tenga horas aparecerá un mensaje de error sugiriendo que selecciones otra cosa.

![App Screenshot](./front/Capturas%20Readme/date-servicio.png)
![App Screenshot](./front/Capturas%20Readme/date-empleado.png)
![App Screenshot](./front/Capturas%20Readme/date-fecha.png)
![App Screenshot](./front/Capturas%20Readme/date-error.png)
![App Screenshot](./front/Capturas%20Readme/date-hora.png)
![App Screenshot](./front/Capturas%20Readme/date-pedir-cita.png)

Una vez pedida la cita, tanto el cliente como el admin recibiran correos electrónicos de confirmación.

![App Screenshot](./front/Capturas%20Readme/correo-cliente.png)
![App Screenshot](./front/Capturas%20Readme/correo-admin.png)

Luego como usuario puedes mandar una solicitud al admin para que cancele tu cita (esto lo hacemos para que el admin vuelva a colocar la fecha y hora que fueron pedidas por el cliente).

![App Screenshot](./front/Capturas%20Readme/pedir-cancelacion.png)
![App Screenshot](./front/Capturas%20Readme/correo-cancelacion-admin.png)

Y desde el administrador puedes eliminar esa cita y al usuario le llegará un correo de aviso de que su cita se canceló correctamente.

![App Screenshot](./front/Capturas%20Readme/cancelando.png)
![App Screenshot](./front/Capturas%20Readme/correo-cancelacion-user.png)
