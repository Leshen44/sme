<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
});

Auth::routes();

Route::resource('tecnicos', App\Http\Controllers\TecnicoController::class);
Route::resource('maquinas', App\Http\Controllers\MaquinaController::class);
Route::resource('reparaciones', App\Http\Controllers\ReparacioneController::class);
//Route::resource('eventos', App\Http\Controllers\EventoController::class);

//las rutas que aparecen en el video
Route::get('/evento', [App\Http\Controllers\EventoController::class, 'index']);
Route::get('/evento/mostrar', [App\Http\Controllers\EventoController::class, 'show']);
Route::post('/evento/agregar', [App\Http\Controllers\EventoController::class, 'store']);//nosirve
Route::post('/evento/editar/{id}', [App\Http\Controllers\EventoController::class, 'edit']);
Route::post('/evento/actualizar/{evento}', [App\Http\Controllers\EventoController::class, 'update']);
Route::post('/evento/borrar/{id}', [App\Http\Controllers\EventoController::class, 'destroy']);


Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
