<?php

namespace App\Http\Controllers\APIAuth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Http\Controllers\ApiController;
use App\User;

class LoginController extends ApiController
{
    public function login(Request $request)
    {
    	$request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);


        if(!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return $this->errorResponse('ไม่สามารถเข้าสู่ระบบได้ โปรดตรวจสอบอีเมลืหรือรหัสผ่านของคุณอีกครั้ง', 401);
        }

        if (User::where(['email' => $request->email , 'verified' => User::VERIFIED_USER])->count() == 0) {
            return $this->errorResponse('ไม่สามารถเข้าสู่ระบบได้ คุณยังไม่ได้ทำการยืนยันทางอีเมล์ กรุณาไปที่อีเมล์ของคุณเพื่อยืนยัน', 401);
        }

        
        $user = $request->user();
        $tokenResult = $user->createToken('Laravel Personal Access Client');
        $token = $tokenResult->token;
        $token->save();

        $date_login = Carbon::now();
        $date_expires = Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString();
        $day = Carbon::now()->addSeconds($date_login->diffInSeconds($date_expires));
        return response()->json([
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString(),
            'expiresIn' => $date_login->diffInSeconds($date_expires),
            'day' => $day->diffInDays()
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return $this->showMessage('Successfully logged out' , 200);
    }

}
