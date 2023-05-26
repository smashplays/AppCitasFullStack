<?php

use App\Mail\CitaPedidaAdminMailable;
use Illuminate\Support\Facades\Route;
use App\Mail\CitaPedidaClienteMailable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

// Route::group(['middleware' => ['cors']], function () {
//     Route::post('cita-pedida-cliente', function (Request $request) {
//         $user = $request->input('user');
//         $service = $request->input('service');
//         $employee = $request->input('employee');
//         $day = $request->input('day');
//         $hour = $request->input('hour');
//         $email = $request->input('email');

//         $correo = new CitaPedidaClienteMailable($user, $service, $employee, $day, $hour, $email);

//         Mail::to($email)->send($correo);

//         return "Mensaje enviado correctamente";
//     });

//     Route::post('cita-pedida-admin', function (Request $request) {
//         $user = $request->input('user');
//         $service = $request->input('service');
//         $employee = $request->input('employee');
//         $day = $request->input('day');
//         $hour = $request->input('hour');
//         $email = $request->input('email');

//         $correo = new CitaPedidaAdminMailable($user, $service, $employee, $day, $hour, $email);

//         Mail::to('info@jpdinformatica.com')->send($correo);

//         return "Mensaje enviado correctamente";
//     });
// });
