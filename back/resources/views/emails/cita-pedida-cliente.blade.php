<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Cita pedida por cliente</title>
</head>
<body>
    <img src="{{ asset('image/logo.png') }}" width="200px" alt="Logo" style="display: block; margin: 0 auto;">

    <p>¡Hola {{$user}}!</p>

    <p>Has pedido cita con el empleado {{$employee}} para el servicio {{$service}} para el día {{$day}} a las {{$hour}} en Tienda de Informática Inventada.</p>

    <p>¡Apúntate la fecha!</p>

    <footer style="text-align: center;">
        Tienda de Informática Inventada. Todos los derechos reservados.
    </footer>
</body>
</html>
