<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Cita del cliente cancelada</title>
</head>
<body>
    <img src="{{ asset('image/logo.png') }}" width="200px" alt="Logo" style="display: block; margin: 0 auto;">

    <p>¡Hola {{$user}}!</p>

    <p>La cita nº {{$date}} que habías pedido en Tienda de Informática Inventada ha sido cancelada correctamente.</p>

    <p>Puedes volver a pedir cita entrando en la página web <a href="http://pedir-cita.empresainventada.com" target="_blank">http://pedir-cita.empresainventada.com</a></p>

    <footer style="text-align: center;">
        Tienda de Informática Inventada. Todos los derechos reservados.
    </footer>
</body>
</html>
