<?php

namespace App\Http\Controllers\APIAuth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;
use App\Mail\ResetPasswordMail;
use App\Http\Controllers\ApiController;
use App\User;
use Carbon\Carbon;
use DB;

class ForgotPasswordController extends ApiController
{
    public function sendEmail(Request $request) {
        if(!$this->validateEmail($request->email)){
            return $this->errorResponse('ไม่พบอีเมลนี้ในระบบของเรา' , Response::HTTP_NOT_FOUND);
        }
        $this->send($request->email);
        return $this->showMessage('Reset Email send Successfully. please check your email.' , Response::HTTP_OK);
    }

    public function send($email){
        $token = $this->createToken($email);
        $user = User::where('email' , $email)->first();
        $data = [
        	'name' => $user->name,
        	'email' => $user->email,
        	'token' => $token,
        ];
        Mail::to($email)->send(new ResetPasswordMail($data));
    }

    public function createToken($email) {
        $oldToken = DB::table('password_resets')->where('email' , $email)->first();
        if($oldToken){
            return $oldToken->token;
        }
        $token = str_random(60);
        $this->saveToken($token,$email);
        return $token;
    }

    public function saveToken($token , $email) {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    public function validateEmail($email){
        return !!User::where('email' , $email)->first();
    }

    public function show($token)
    {
    	return $token;
    }
}
