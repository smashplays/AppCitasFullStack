<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        '/cita-pedida-cliente',
        '/cita-pedida-admin',
        '/solicitud-eliminar-cita',
        '/confirmacion-cita-eliminada'
    ];
}
