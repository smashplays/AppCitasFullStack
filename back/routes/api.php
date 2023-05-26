<?php

use App\Http\Controllers\DateController;
use App\Http\Controllers\DayController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\HourController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ServiceController;
use App\Mail\CitaPedidaAdminMailable;
use Illuminate\Support\Facades\Route;
use App\Mail\CitaPedidaClienteMailable;
use App\Mail\ConfirmacionCitaCanceladaMailable;
use App\Mail\SolicitudCancelarCitaMailable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. Thes
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('/users')->group(function () {
    Route::get('', [LoginController::class, 'getUsers']);
    Route::middleware('login')->get('/logout', [LoginController::class, 'logout']);
    Route::middleware('login')->get('/me', [LoginController::class, 'whoAmI']);
    Route::middleware('validate.id')->get('/{id}', [LoginController::class, 'getById']);
    Route::middleware('validate.id')->patch('/{id}', [LoginController::class, 'updateUser']);
    Route::middleware('validate.id')->delete('/{id}', [LoginController::class, 'deleteUser']);
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/register', [LoginController::class, 'crearUser']);
});


Route::prefix('/employees')->group(function () {
    Route::get('', [EmployeeController::class, 'getAll']);
    Route::middleware('validate.id')->get('/{id}', [EmployeeController::class, 'getById']);
    Route::post('', [EmployeeController::class, 'post']);
    Route::middleware('validate.id')->delete('/{id}', [EmployeeController::class, 'delete']);
    Route::middleware('validate.id')->patch('/{id}', [EmployeeController::class, 'update']);
});

Route::prefix('/services')->group(function () {
    Route::get('', [ServiceController::class, 'getAll']);
    Route::middleware('validate.id')->get('/{id}', [ServiceController::class, 'getById']);
    Route::post('', [ServiceController::class, 'post']);
    Route::middleware('validate.id')->delete('/{id}', [ServiceController::class, 'delete']);
    Route::middleware('validate.id')->patch('/{id}', [ServiceController::class, 'update']);
});

Route::prefix('/hours')->group(function () {
    Route::get('', [HourController::class, 'getAll']);
    Route::get('/day/{day}', [HourController::class, 'getDayHours']);
    Route::middleware('validate.id')->get('/{id}', [HourController::class, 'getById']);
    Route::post('', [HourController::class, 'post']);
    Route::middleware('validate.id')->delete('/{id}', [HourController::class, 'delete']);
    Route::middleware('validate.id')->patch('/{id}', [HourController::class, 'update']);
});

Route::prefix('/days')->group(function () {
    Route::get('', [DayController::class, 'getAll']);
    Route::get('/employee/{employee}', [DayController::class, 'getEmployeeDays']);
    Route::middleware('validate.id')->get('/{id}', [DayController::class, 'getById']);
    Route::post('', [DayController::class, 'post']);
    Route::middleware('validate.id')->delete('/{id}', [DayController::class, 'delete']);
    Route::middleware('validate.id')->patch('/{id}', [DayController::class, 'update']);
});

Route::prefix('/dates')->group(function () {
    Route::get('', [DateController::class, 'getAll']);
    Route::get('/user/{user}', [DateController::class, 'getUserDates']);
    Route::middleware('validate.id')->get('/{id}', [DateController::class, 'getById']);
    Route::post('', [DateController::class, 'post']);
    Route::middleware('validate.id')->delete('/{id}', [DateController::class, 'delete']);
    Route::middleware('validate.id')->patch('/{id}', [DateController::class, 'update']);
});

Route::group(['middleware' => ['cors']], function () {
    Route::post('cita-pedida-cliente', function (Request $request) {
        $user = $request->input('user');
        $service = $request->input('service');
        $employee = $request->input('employee');
        $day = $request->input('day');
        $hour = $request->input('hour');
        $email = $request->input('email');

        $correo = new CitaPedidaClienteMailable($user, $service, $employee, $day, $hour, $email);

        Mail::to($email)->send($correo);

        return "Mensaje enviado correctamente";
    });

    Route::post('cita-pedida-admin', function (Request $request) {
        $user = $request->input('user');
        $service = $request->input('service');
        $employee = $request->input('employee');
        $day = $request->input('day');
        $hour = $request->input('hour');
        $email = $request->input('email');

        $correo = new CitaPedidaAdminMailable($user, $service, $employee, $day, $hour, $email);

        Mail::to('jesusterres1999@gmail.com')->send($correo);

        return "Mensaje enviado correctamente";
    });

    Route::post('solicitud-eliminar-cita', function (Request $request) {
        $user = $request->input('user');
        $date = $request->input('date');
        $email = $request->input('email');

        $correo = new SolicitudCancelarCitaMailable($user, $date, $email);

        Mail::to('jesusterres1999@gmail.com')->send($correo);

        return "Mensaje enviado correctamente";
    });

    Route::post('confirmacion-cita-eliminada', function (Request $request) {
        $user = $request->input('user');
        $date = $request->input('date');
        $email = $request->input('email');

        $correo = new ConfirmacionCitaCanceladaMailable($user, $date, $email);

        Mail::to($email)->send($correo);

        return "Mensaje enviado correctamente";
    });
});
