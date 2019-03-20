<?php

namespace App\Http\Controllers\APIAuth;

use App\User;
use App\Http\Requests\RegisterRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Date;
use App\Http\Controllers\ApiController;
use App\Mail\VerifiedEmail;

class RegisterController extends ApiController
{
    public function register(RegisterRequest $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'verification_token' =>  User::generateVerificationCode(),
        ]);
        retry(5, function () use ($user) {
            Mail::to($user)->send(new VerifiedEmail($user));
        }, 1000);
        return $this->showOne('your singup successfully!', $user , 200);
    }

    public function verify(Request $request)
    {

        $request->validate([
            'token' => 'required|string',
        ]);
        $user = User::where('verification_token' , $request->token)->firstOrFail();
        $user->email_verified_at = Date::now();
        $user->verified = User::VERIFIED_USER;
        $user->verification_token = null;
        $user->save();
        return $this->showMessage('the account has verified successfully' , 200);
    }

    public function resend(Request $request)
    {
        $rules = [
            'email' => 'required|string|email|max:255',
        ];
        $this->validate($request , $rules);
        $user = User::where('email' , $request->email)->firstOrFail();
        if ($user->isVerified()) {
            return $this->errorResponse('This user is alerady verified' , 409);
        }
        retry(5, function () use ($user) {
            Mail::to($user)->send(new VerifiedEmail($user));
        }, 1000);
        return $this->showMessage('The verification email has been resend');
    }
}
