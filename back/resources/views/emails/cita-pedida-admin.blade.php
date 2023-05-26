<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Correo cita cliente para admin</title>
</head>
<body>
    <img src="{{ asset('image/logo.png') }}" width="200px" alt="Logo" style="display: block; margin: 0 auto;">

    <p>¡Hola admin!</p>

    <p>{{$user}} ha pedido cita con el empleado {{$employee}} para el servicio {{$service}} para el día {{$day}} a las {{$hour}} en Tienda de Informática Inventada.</p>

    <p>En caso de querer ponerte en contacto con el cliente puedes usar su correo {{$email}}</p>

    <footer style="text-align: center;">
        Tienda de Informática Inventada 2023. Todos los derechos reservados.
    </footer>
</body>
</html>
