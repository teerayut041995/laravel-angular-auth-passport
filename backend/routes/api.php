<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', 'APIAuth\LoginController@login');
Route::get('logout', 'APIAuth\LoginController@logout')->middleware('auth:api');
Route::post('register', 'APIAuth\RegisterController@register');

Route::post('email/verify' , 'APIAuth\RegisterController@verify');
Route::post('email/verify/resend' , 'APIAuth\RegisterController@resend')->name('resend');

Route::post('sendPasswordResetLink', 'APIAuth\ForgotPasswordController@sendEmail');
Route::get('response/password/reset/{token}' , 'APIAuth\ForgotPasswordController@show')->name('reset-password');

Route::post('resetPassword', 'APIAuth\ResetPasswordController@process');


Route::get('me' , 'HomeController@me');